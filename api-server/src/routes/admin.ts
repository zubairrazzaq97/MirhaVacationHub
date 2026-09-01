import { Router, Request, Response } from "express";
import { db, bookingsTable, propertiesTable, inquiriesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { AdminLoginBody } from "@workspace/api-zod";

const router = Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "mirha2024";

interface AdminSession {
  username: string;
  loggedIn: boolean;
}

function getAdminSession(req: Request): AdminSession | undefined {
  return (req.session as unknown as Record<string, AdminSession | undefined>)["admin"];
}

function setAdminSession(req: Request, data: AdminSession): void {
  (req.session as unknown as Record<string, AdminSession>)["admin"] = data;
}

router.post("/login", (req: Request, res: Response): void => {
  const body = AdminLoginBody.parse(req.body);
  if (body.username === ADMIN_USERNAME && body.password === ADMIN_PASSWORD) {
    setAdminSession(req, { username: body.username, loggedIn: true });
    res.json({ username: body.username, loggedIn: true });
    return;
  }
  res.status(401).json({ error: "Invalid credentials" });
});

router.post("/logout", (req: Request, res: Response): void => {
  req.session.destroy(() => {});
  res.json({ ok: true });
});

router.get("/me", (req: Request, res: Response): void => {
  const admin = getAdminSession(req);
  if (!admin?.loggedIn) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  res.json(admin);
});

router.get("/dashboard", async (req: Request, res: Response): Promise<void> => {
  const admin = getAdminSession(req);
  if (!admin?.loggedIn) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const [allPropertiesAll, allBookingsAll, allInquiriesAll, recentBookingsRaw, recentInquiriesRaw] =
    await Promise.all([
      db.select().from(propertiesTable),
      db.select().from(bookingsTable),
      db.select().from(inquiriesTable),
      db.select().from(bookingsTable).orderBy(desc(bookingsTable.createdAt)).limit(5),
      db.select().from(inquiriesTable).orderBy(desc(inquiriesTable.createdAt)).limit(5),
    ]);

  const totalRevenue = allBookingsAll
    .filter((b) => b.status !== "cancelled")
    .reduce((s, b) => s + b.totalPrice, 0);

  const recentBookings = await Promise.all(
    recentBookingsRaw.map(async (b) => {
      const [p] = await db
        .select({ name: propertiesTable.name })
        .from(propertiesTable)
        .where(eq(propertiesTable.id, b.propertyId));
      return { ...b, propertyName: p?.name ?? null, createdAt: b.createdAt.toISOString() };
    })
  );

  const recentInquiries = recentInquiriesRaw.map((i) => ({
    ...i,
    propertyName: null as string | null,
    createdAt: i.createdAt.toISOString(),
  }));

  res.json({
    totalProperties: allPropertiesAll.length,
    availableProperties: allPropertiesAll.filter((p) => p.available).length,
    totalBookings: allBookingsAll.length,
    pendingBookings: allBookingsAll.filter((b) => b.status === "pending").length,
    totalInquiries: allInquiriesAll.length,
    newInquiries: allInquiriesAll.filter((i) => i.status === "new").length,
    totalRevenue,
    recentBookings,
    recentInquiries,
  });
});

export default router;
