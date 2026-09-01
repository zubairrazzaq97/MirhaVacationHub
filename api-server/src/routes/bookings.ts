import { Router, Request, Response } from "express";
import { db, bookingsTable, propertiesTable } from "@workspace/db";
import { eq, and, desc } from "drizzle-orm";
import {
  ListBookingsQueryParams,
  CreateBookingBody,
  UpdateBookingBody,
  GetBookingParams,
  UpdateBookingParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const query = ListBookingsQueryParams.parse(req.query);
  const filters: ReturnType<typeof eq>[] = [];
  if (query.status) filters.push(eq(bookingsTable.status, query.status));
  if (query.propertyId !== undefined)
    filters.push(eq(bookingsTable.propertyId, query.propertyId));

  const bookings = await db
    .select()
    .from(bookingsTable)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(desc(bookingsTable.createdAt));

  const withNames = await Promise.all(bookings.map(enrichBooking));
  res.json(withNames);
});

router.get("/stats", async (_req: Request, res: Response): Promise<void> => {
  const all = await db.select().from(bookingsTable);
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  res.json({
    total: all.length,
    pending: all.filter((b) => b.status === "pending").length,
    confirmed: all.filter((b) => b.status === "confirmed").length,
    cancelled: all.filter((b) => b.status === "cancelled").length,
    completed: all.filter((b) => b.status === "completed").length,
    totalRevenue: all
      .filter((b) => b.status !== "cancelled")
      .reduce((s, b) => s + b.totalPrice, 0),
    thisMonth: all.filter((b) => b.createdAt >= thisMonthStart).length,
  });
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = GetBookingParams.parse({ id: Number(req.params.id) });
  const [booking] = await db
    .select()
    .from(bookingsTable)
    .where(eq(bookingsTable.id, id));
  if (!booking) {
    res.status(404).json({ error: "Booking not found" });
    return;
  }
  res.json(await enrichBooking(booking));
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const body = CreateBookingBody.parse(req.body);

  const [property] = await db
    .select()
    .from(propertiesTable)
    .where(eq(propertiesTable.id, body.propertyId));
  if (!property) {
    res.status(404).json({ error: "Property not found" });
    return;
  }

  const checkIn = new Date(body.checkIn);
  const checkOut = new Date(body.checkOut);
  const nights = Math.max(
    1,
    Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  );
  const totalPrice = nights * property.pricePerNight;

  const [created] = await db
    .insert(bookingsTable)
    .values({ ...body, totalPrice, status: "pending" })
    .returning();
  res.status(201).json(await enrichBooking(created));
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = UpdateBookingParams.parse({ id: Number(req.params.id) });
  const body = UpdateBookingBody.parse(req.body);
  const [updated] = await db
    .update(bookingsTable)
    .set(body)
    .where(eq(bookingsTable.id, id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Booking not found" });
    return;
  }
  res.json(await enrichBooking(updated));
});

async function enrichBooking(b: typeof bookingsTable.$inferSelect) {
  const [property] = await db
    .select({ name: propertiesTable.name })
    .from(propertiesTable)
    .where(eq(propertiesTable.id, b.propertyId));
  return {
    ...b,
    propertyName: property?.name ?? null,
    createdAt: b.createdAt.toISOString(),
  };
}

export default router;
