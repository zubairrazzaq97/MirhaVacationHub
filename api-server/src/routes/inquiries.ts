import { Router, Request, Response } from "express";
import { db, inquiriesTable, propertiesTable } from "@workspace/db";
import { eq, and, desc } from "drizzle-orm";
import {
  ListInquiriesQueryParams,
  CreateInquiryBody,
  UpdateInquiryBody,
  GetInquiryParams,
  UpdateInquiryParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const query = ListInquiriesQueryParams.parse(req.query);
  const filters: ReturnType<typeof eq>[] = [];
  if (query.status) filters.push(eq(inquiriesTable.status, query.status));

  const inquiries = await db
    .select()
    .from(inquiriesTable)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(desc(inquiriesTable.createdAt));

  const enriched = await Promise.all(inquiries.map(enrichInquiry));
  res.json(enriched);
});

router.get("/stats", async (_req: Request, res: Response): Promise<void> => {
  const all = await db.select().from(inquiriesTable);
  res.json({
    total: all.length,
    new: all.filter((i) => i.status === "new").length,
    read: all.filter((i) => i.status === "read").length,
    replied: all.filter((i) => i.status === "replied").length,
  });
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = GetInquiryParams.parse({ id: Number(req.params.id) });
  const [inquiry] = await db
    .select()
    .from(inquiriesTable)
    .where(eq(inquiriesTable.id, id));
  if (!inquiry) {
    res.status(404).json({ error: "Inquiry not found" });
    return;
  }
  res.json(await enrichInquiry(inquiry));
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const body = CreateInquiryBody.parse(req.body);
  const [created] = await db
    .insert(inquiriesTable)
    .values({ ...body, status: "new" })
    .returning();
  res.status(201).json(await enrichInquiry(created));
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = UpdateInquiryParams.parse({ id: Number(req.params.id) });
  const body = UpdateInquiryBody.parse(req.body);
  const updateData: Record<string, unknown> = { ...body };
  if (body.adminReply) updateData["status"] = "replied";

  const [updated] = await db
    .update(inquiriesTable)
    .set(updateData as Partial<typeof inquiriesTable.$inferInsert>)
    .where(eq(inquiriesTable.id, id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Inquiry not found" });
    return;
  }
  res.json(await enrichInquiry(updated));
});

async function enrichInquiry(i: typeof inquiriesTable.$inferSelect) {
  let propertyName: string | null = null;
  if (i.propertyId) {
    const [p] = await db
      .select({ name: propertiesTable.name })
      .from(propertiesTable)
      .where(eq(propertiesTable.id, i.propertyId));
    propertyName = p?.name ?? null;
  }
  return {
    ...i,
    propertyName,
    createdAt: i.createdAt.toISOString(),
  };
}

export default router;
