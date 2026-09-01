import { Router, Request, Response } from "express";
import { db, propertiesTable } from "@workspace/db";
import { eq, ilike, and, gte, lte, or } from "drizzle-orm";
import {
  ListPropertiesQueryParams,
  CreatePropertyBody,
  UpdatePropertyBody,
  GetPropertyParams,
  UpdatePropertyParams,
  DeletePropertyParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const query = ListPropertiesQueryParams.parse(req.query);
  const filters: ReturnType<typeof eq>[] = [];

  if (query.type) filters.push(eq(propertiesTable.type, query.type));
  if (query.bedrooms !== undefined) filters.push(eq(propertiesTable.bedrooms, query.bedrooms));
  if (query.minPrice !== undefined) filters.push(gte(propertiesTable.pricePerNight, query.minPrice));
  if (query.maxPrice !== undefined) filters.push(lte(propertiesTable.pricePerNight, query.maxPrice));
  if (query.featured !== undefined) filters.push(eq(propertiesTable.featured, query.featured));
  if (query.search) {
    const like = or(
      ilike(propertiesTable.name, `%${query.search}%`),
      ilike(propertiesTable.location, `%${query.search}%`),
      ilike(propertiesTable.description, `%${query.search}%`)
    );
    if (like) filters.push(like as ReturnType<typeof eq>);
  }

  const properties = await db
    .select()
    .from(propertiesTable)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(propertiesTable.createdAt);

  res.json(properties.map(mapProperty));
});

router.get("/featured", async (_req: Request, res: Response): Promise<void> => {
  const properties = await db
    .select()
    .from(propertiesTable)
    .where(and(eq(propertiesTable.featured, true), eq(propertiesTable.available, true)))
    .limit(6);
  res.json(properties.map(mapProperty));
});

router.get("/stats", async (_req: Request, res: Response): Promise<void> => {
  const all = await db.select().from(propertiesTable);
  const total = all.length;
  const available = all.filter((p) => p.available).length;
  const featured = all.filter((p) => p.featured).length;
  const avgPricePerNight =
    total > 0 ? all.reduce((s, p) => s + p.pricePerNight, 0) / total : 0;
  const typeMap: Record<string, number> = {};
  for (const p of all) {
    typeMap[p.type] = (typeMap[p.type] ?? 0) + 1;
  }
  const byType = Object.entries(typeMap).map(([type, count]) => ({ type, count }));
  res.json({ total, available, featured, avgPricePerNight, byType });
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = GetPropertyParams.parse({ id: Number(req.params.id) });
  const [property] = await db
    .select()
    .from(propertiesTable)
    .where(eq(propertiesTable.id, id));
  if (!property) {
    res.status(404).json({ error: "Property not found" });
    return;
  }
  res.json(mapProperty(property));
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const body = CreatePropertyBody.parse(req.body);
  const [created] = await db
    .insert(propertiesTable)
    .values({
      ...body,
      images: body.images ?? [],
      amenities: body.amenities ?? [],
      featured: body.featured ?? false,
      available: body.available ?? true,
    })
    .returning();
  res.status(201).json(mapProperty(created));
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = UpdatePropertyParams.parse({ id: Number(req.params.id) });
  const body = UpdatePropertyBody.parse(req.body);
  const [updated] = await db
    .update(propertiesTable)
    .set(body)
    .where(eq(propertiesTable.id, id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Property not found" });
    return;
  }
  res.json(mapProperty(updated));
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = DeletePropertyParams.parse({ id: Number(req.params.id) });
  await db.delete(propertiesTable).where(eq(propertiesTable.id, id));
  res.status(204).send();
});

function mapProperty(p: typeof propertiesTable.$inferSelect) {
  return {
    ...p,
    createdAt: p.createdAt.toISOString(),
  };
}

export default router;
