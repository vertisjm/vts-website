import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertTestimonialSchema, insertSiteSectionSchema, insertContactInfoSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";

// Simple session storage (in production, use Redis or database sessions)
const sessions = new Map<string, { userId: string; username: string; isAdmin: boolean }>();

function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Middleware to check admin authentication
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.headers['x-session-id'] as string;
  const session = sessions.get(sessionId);
  
  if (!session || !session.isAdmin) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  
  (req as any).user = session;
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ============ AUTH ROUTES ============
  
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      
      const validPassword = await bcrypt.compare(password, user.password);
      
      if (!validPassword) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      
      if (!user.isAdmin) {
        return res.status(403).json({ success: false, message: "Not authorized as admin" });
      }
      
      const sessionId = generateSessionId();
      sessions.set(sessionId, { userId: user.id, username: user.username, isAdmin: user.isAdmin || false });
      
      res.json({ 
        success: true, 
        sessionId,
        user: { id: user.id, username: user.username }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Login failed" });
    }
  });
  
  app.post("/api/admin/logout", (req, res) => {
    const sessionId = req.headers['x-session-id'] as string;
    if (sessionId) {
      sessions.delete(sessionId);
    }
    res.json({ success: true });
  });
  
  app.get("/api/admin/me", requireAdmin, (req, res) => {
    const user = (req as any).user;
    res.json({ success: true, user: { username: user.username } });
  });
  
  // Create admin user route (for initial setup)
  app.post("/api/admin/setup", async (req, res) => {
    try {
      const { username, password, setupKey } = req.body;
      
      // Simple setup protection - check for setup key
      if (setupKey !== "vertis-admin-setup-2024") {
        return res.status(403).json({ success: false, message: "Invalid setup key" });
      }
      
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      await storage.createAdminUser({ username, password: hashedPassword });
      
      res.json({ success: true, message: "Admin user created" });
    } catch (error) {
      console.error("Setup error:", error);
      res.status(500).json({ success: false, message: "Setup failed" });
    }
  });
  
  // ============ PUBLIC CONTENT ROUTES ============
  
  app.get("/api/content/:key", async (req, res) => {
    try {
      const section = await storage.getSiteSection(req.params.key);
      if (!section) {
        return res.status(404).json({ success: false, message: "Section not found" });
      }
      res.json(section);
    } catch (error) {
      console.error("Get content error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch content" });
    }
  });
  
  app.get("/api/content", async (req, res) => {
    try {
      const sections = await storage.getAllSiteSections();
      res.json(sections);
    } catch (error) {
      console.error("Get all content error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch content" });
    }
  });
  
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonialsList = await storage.getTestimonials();
      res.json(testimonialsList);
    } catch (error) {
      console.error("Get testimonials error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch testimonials" });
    }
  });
  
  app.get("/api/contact-info", async (req, res) => {
    try {
      const info = await storage.getContactInfo();
      res.json(info || {});
    } catch (error) {
      console.error("Get contact info error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch contact info" });
    }
  });
  
  // ============ ADMIN CONTENT ROUTES ============
  
  app.put("/api/admin/content/:key", requireAdmin, async (req, res) => {
    try {
      const data = { ...req.body, key: req.params.key };
      const validated = insertSiteSectionSchema.parse(data);
      const section = await storage.upsertSiteSection(validated);
      res.json({ success: true, section });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: error.errors });
      }
      console.error("Update content error:", error);
      res.status(500).json({ success: false, message: "Failed to update content" });
    }
  });
  
  // ============ ADMIN TESTIMONIAL ROUTES ============
  
  app.post("/api/admin/testimonials", requireAdmin, async (req, res) => {
    try {
      const validated = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validated);
      res.status(201).json({ success: true, testimonial });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: error.errors });
      }
      console.error("Create testimonial error:", error);
      res.status(500).json({ success: false, message: "Failed to create testimonial" });
    }
  });
  
  app.put("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const testimonial = await storage.updateTestimonial(req.params.id, req.body);
      if (!testimonial) {
        return res.status(404).json({ success: false, message: "Testimonial not found" });
      }
      res.json({ success: true, testimonial });
    } catch (error) {
      console.error("Update testimonial error:", error);
      res.status(500).json({ success: false, message: "Failed to update testimonial" });
    }
  });
  
  app.delete("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteTestimonial(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete testimonial error:", error);
      res.status(500).json({ success: false, message: "Failed to delete testimonial" });
    }
  });
  
  // ============ ADMIN CONTACT INFO ROUTES ============
  
  app.put("/api/admin/contact-info", requireAdmin, async (req, res) => {
    try {
      const validated = insertContactInfoSchema.parse(req.body);
      const info = await storage.upsertContactInfo(validated);
      res.json({ success: true, info });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: error.errors });
      }
      console.error("Update contact info error:", error);
      res.status(500).json({ success: false, message: "Failed to update contact info" });
    }
  });
  
  // ============ CONTACT FORM ROUTES ============
  
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.status(201).json({ 
        success: true, 
        message: "Contact submission received successfully",
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Contact submission error:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  app.get("/api/contact", requireAdmin, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Get contact submissions error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching submissions" 
      });
    }
  });

  return httpServer;
}
