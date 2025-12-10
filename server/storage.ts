import { 
  users, 
  contactSubmissions, 
  siteSections,
  testimonials,
  contactInfo,
  type User, 
  type InsertUser, 
  type ContactSubmission, 
  type InsertContact,
  type SiteSection,
  type InsertSiteSection,
  type TestimonialRecord,
  type InsertTestimonial,
  type ContactInfoRecord,
  type InsertContactInfo
} from "@shared/schema";
import { db } from "./db";
import { eq, asc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createAdminUser(user: InsertUser): Promise<User>;
  
  // Contact Submissions
  createContactSubmission(submission: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Site Sections
  getSiteSection(key: string): Promise<SiteSection | undefined>;
  getAllSiteSections(): Promise<SiteSection[]>;
  upsertSiteSection(section: InsertSiteSection): Promise<SiteSection>;
  
  // Testimonials
  getTestimonials(): Promise<TestimonialRecord[]>;
  getTestimonial(id: string): Promise<TestimonialRecord | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<TestimonialRecord>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<TestimonialRecord | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;
  
  // Contact Info
  getContactInfo(): Promise<ContactInfoRecord | undefined>;
  upsertContactInfo(info: InsertContactInfo): Promise<ContactInfoRecord>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createAdminUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({ ...insertUser, isAdmin: true })
      .returning();
    return user;
  }

  // Contact Submissions
  async createContactSubmission(insertSubmission: InsertContact): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }

  // Site Sections
  async getSiteSection(key: string): Promise<SiteSection | undefined> {
    const [section] = await db.select().from(siteSections).where(eq(siteSections.key, key));
    return section || undefined;
  }

  async getAllSiteSections(): Promise<SiteSection[]> {
    return await db.select().from(siteSections);
  }

  async upsertSiteSection(section: InsertSiteSection): Promise<SiteSection> {
    const existing = await this.getSiteSection(section.key);
    if (existing) {
      const [updated] = await db
        .update(siteSections)
        .set({ ...section, updatedAt: new Date() })
        .where(eq(siteSections.key, section.key))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(siteSections)
        .values(section)
        .returning();
      return created;
    }
  }

  // Testimonials
  async getTestimonials(): Promise<TestimonialRecord[]> {
    return await db.select().from(testimonials).orderBy(asc(testimonials.displayOrder));
  }

  async getTestimonial(id: string): Promise<TestimonialRecord | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial || undefined;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<TestimonialRecord> {
    const [created] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return created;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<TestimonialRecord | undefined> {
    const [updated] = await db
      .update(testimonials)
      .set(testimonial)
      .where(eq(testimonials.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id));
    return true;
  }

  // Contact Info
  async getContactInfo(): Promise<ContactInfoRecord | undefined> {
    const [info] = await db.select().from(contactInfo);
    return info || undefined;
  }

  async upsertContactInfo(info: InsertContactInfo): Promise<ContactInfoRecord> {
    const existing = await this.getContactInfo();
    if (existing) {
      const [updated] = await db
        .update(contactInfo)
        .set({ ...info, updatedAt: new Date() })
        .where(eq(contactInfo.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(contactInfo)
        .values(info)
        .returning();
      return created;
    }
  }
}

export const storage = new DatabaseStorage();
