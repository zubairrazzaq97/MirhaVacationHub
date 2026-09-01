import { pgTable, text, serial, timestamp, boolean, real, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const propertiesTable = pgTable("properties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull().default("apartment"),
  description: text("description").notNull(),
  pricePerNight: real("price_per_night").notNull(),
  bedrooms: integer("bedrooms").notNull().default(1),
  bathrooms: integer("bathrooms").notNull().default(1),
  maxGuests: integer("max_guests").notNull().default(2),
  size: real("size"),
  location: text("location").notNull(),
  neighborhood: text("neighborhood"),
  images: text("images").array().notNull().default([]),
  amenities: text("amenities").array().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  available: boolean("available").notNull().default(true),
  rating: real("rating"),
  reviewCount: integer("review_count"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPropertySchema = createInsertSchema(propertiesTable).omit({ id: true, createdAt: true });
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof propertiesTable.$inferSelect;
