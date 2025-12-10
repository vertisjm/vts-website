import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  serviceInterest: text("service_interest"),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Site Sections - for editable content blocks
export const siteSections = pgTable("site_sections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  title: text("title"),
  subtitle: text("subtitle"),
  content: text("content"),
  ctaLabel: text("cta_label"),
  ctaUrl: text("cta_url"),
  metadata: jsonb("metadata"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSiteSectionSchema = createInsertSchema(siteSections).omit({
  id: true,
  updatedAt: true,
});

export type InsertSiteSection = z.infer<typeof insertSiteSectionSchema>;
export type SiteSection = typeof siteSections.$inferSelect;

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  quote: text("quote").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  isFeatured: boolean("is_featured").default(true),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type TestimonialRecord = typeof testimonials.$inferSelect;

// Contact Info
export const contactInfo = pgTable("contact_info", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  headline: text("headline"),
  description: text("description"),
  phone: text("phone"),
  email: text("email"),
  supportEmail: text("support_email"),
  address: text("address"),
  officeHours: jsonb("office_hours"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertContactInfoSchema = createInsertSchema(contactInfo).omit({
  id: true,
  updatedAt: true,
});

export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
export type ContactInfoRecord = typeof contactInfo.$inferSelect;

// Legacy interfaces for backward compatibility
export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  icon: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  url: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
}
