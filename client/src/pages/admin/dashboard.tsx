import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  LogOut, 
  FileText, 
  MessageSquare, 
  Phone, 
  Plus, 
  Trash2, 
  Save,
  ArrowLeft,
  Mail
} from "lucide-react";
import type { TestimonialRecord, ContactInfoRecord, SiteSection } from "@shared/schema";

function getSessionId() {
  return localStorage.getItem("adminSessionId") || "";
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const sessionId = getSessionId();
    if (!sessionId) {
      setLocation("/admin");
    }
  }, [setLocation]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
      headers: { "x-session-id": getSessionId() },
    });
    localStorage.removeItem("adminSessionId");
    localStorage.removeItem("adminUser");
    setLocation("/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-to-site">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Site
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} data-testid="button-admin-logout">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4" data-testid="admin-tabs">
            <TabsTrigger value="content" data-testid="tab-content">
              <FileText className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="testimonials" data-testid="tab-testimonials">
              <MessageSquare className="h-4 w-4 mr-2" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="contact" data-testid="tab-contact">
              <Phone className="h-4 w-4 mr-2" />
              Contact Info
            </TabsTrigger>
            <TabsTrigger value="submissions" data-testid="tab-submissions">
              <Mail className="h-4 w-4 mr-2" />
              Submissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <ContentManager />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>

          <TabsContent value="contact">
            <ContactInfoManager />
          </TabsContent>

          <TabsContent value="submissions">
            <SubmissionsViewer />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function ContentManager() {
  const { toast } = useToast();
  const [sections, setSections] = useState<Record<string, SiteSection>>({});

  const { data: contentData, isLoading } = useQuery({
    queryKey: ["/api/content"],
  });

  useEffect(() => {
    if (contentData && Array.isArray(contentData)) {
      const mapped: Record<string, SiteSection> = {};
      contentData.forEach((section: SiteSection) => {
        mapped[section.key] = section;
      });
      setSections(mapped);
    }
  }, [contentData]);

  const updateMutation = useMutation({
    mutationFn: async ({ key, data }: { key: string; data: Partial<SiteSection> }) => {
      const response = await fetch(`/api/admin/content/${key}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "x-session-id": getSessionId()
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      toast({ title: "Content updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update content", variant: "destructive" });
    },
  });

  const contentSections = [
    { key: "hero", label: "Hero Section", fields: ["title", "subtitle", "content", "ctaLabel", "ctaUrl"] },
    { key: "about", label: "About Section", fields: ["title", "subtitle", "content"] },
    { key: "team", label: "Team Section", fields: ["title", "content"] },
  ];

  if (isLoading) {
    return <div className="text-center py-8">Loading content...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Website Content</CardTitle>
          <CardDescription>Edit the text content displayed on your website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {contentSections.map((section) => (
            <div key={section.key} className="space-y-4 pb-6 border-b last:border-0">
              <h3 className="font-semibold text-lg">{section.label}</h3>
              <div className="grid gap-4">
                {section.fields.includes("title") && (
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={sections[section.key]?.title || ""}
                      onChange={(e) => setSections({
                        ...sections,
                        [section.key]: { ...sections[section.key], key: section.key, title: e.target.value }
                      })}
                      placeholder={`${section.label} title`}
                      data-testid={`input-${section.key}-title`}
                    />
                  </div>
                )}
                {section.fields.includes("subtitle") && (
                  <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Input
                      value={sections[section.key]?.subtitle || ""}
                      onChange={(e) => setSections({
                        ...sections,
                        [section.key]: { ...sections[section.key], key: section.key, subtitle: e.target.value }
                      })}
                      placeholder={`${section.label} subtitle`}
                      data-testid={`input-${section.key}-subtitle`}
                    />
                  </div>
                )}
                {section.fields.includes("content") && (
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea
                      value={sections[section.key]?.content || ""}
                      onChange={(e) => setSections({
                        ...sections,
                        [section.key]: { ...sections[section.key], key: section.key, content: e.target.value }
                      })}
                      placeholder={`${section.label} content`}
                      rows={4}
                      data-testid={`input-${section.key}-content`}
                    />
                  </div>
                )}
                {section.fields.includes("ctaLabel") && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Button Text</Label>
                      <Input
                        value={sections[section.key]?.ctaLabel || ""}
                        onChange={(e) => setSections({
                          ...sections,
                          [section.key]: { ...sections[section.key], key: section.key, ctaLabel: e.target.value }
                        })}
                        placeholder="Button text"
                        data-testid={`input-${section.key}-cta-label`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Button Link</Label>
                      <Input
                        value={sections[section.key]?.ctaUrl || ""}
                        onChange={(e) => setSections({
                          ...sections,
                          [section.key]: { ...sections[section.key], key: section.key, ctaUrl: e.target.value }
                        })}
                        placeholder="Button URL"
                        data-testid={`input-${section.key}-cta-url`}
                      />
                    </div>
                  </div>
                )}
                <Button
                  onClick={() => updateMutation.mutate({ 
                    key: section.key, 
                    data: sections[section.key] || { key: section.key }
                  })}
                  disabled={updateMutation.isPending}
                  data-testid={`button-save-${section.key}`}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save {section.label}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function TestimonialsManager() {
  const { toast } = useToast();
  const [newTestimonial, setNewTestimonial] = useState({
    quote: "",
    name: "",
    role: "",
    company: "",
    isFeatured: true,
    displayOrder: 0,
  });

  const { data: testimonials, isLoading } = useQuery<TestimonialRecord[]>({
    queryKey: ["/api/testimonials"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof newTestimonial) => {
      const response = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-session-id": getSessionId()
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      setNewTestimonial({ quote: "", name: "", role: "", company: "", isFeatured: true, displayOrder: 0 });
      toast({ title: "Testimonial added successfully" });
    },
    onError: () => {
      toast({ title: "Failed to add testimonial", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
        headers: { "x-session-id": getSessionId() },
      });
      if (!response.ok) throw new Error("Failed to delete");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({ title: "Testimonial deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete testimonial", variant: "destructive" });
    },
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading testimonials...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Testimonial</CardTitle>
          <CardDescription>Add customer testimonials to display on the website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Quote</Label>
            <Textarea
              value={newTestimonial.quote}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
              placeholder="Customer testimonial quote"
              rows={3}
              data-testid="input-new-testimonial-quote"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={newTestimonial.name}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                placeholder="Customer name"
                data-testid="input-new-testimonial-name"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input
                value={newTestimonial.role}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                placeholder="Job title"
                data-testid="input-new-testimonial-role"
              />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                value={newTestimonial.company}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                placeholder="Company name"
                data-testid="input-new-testimonial-company"
              />
            </div>
          </div>
          <Button
            onClick={() => createMutation.mutate(newTestimonial)}
            disabled={createMutation.isPending || !newTestimonial.quote || !newTestimonial.name}
            data-testid="button-add-testimonial"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Testimonials</CardTitle>
          <CardDescription>Manage customer testimonials</CardDescription>
        </CardHeader>
        <CardContent>
          {testimonials && testimonials.length > 0 ? (
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">"{testimonial.quote}"</p>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteMutation.mutate(testimonial.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-testimonial-${testimonial.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No testimonials yet. Add your first one above.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ContactInfoManager() {
  const { toast } = useToast();
  const [contactData, setContactData] = useState<Partial<ContactInfoRecord>>({
    headline: "",
    description: "",
    phone: "",
    email: "",
    supportEmail: "",
    address: "",
  });

  const { data: existingInfo, isLoading } = useQuery<ContactInfoRecord>({
    queryKey: ["/api/contact-info"],
  });

  useEffect(() => {
    if (existingInfo && existingInfo.id) {
      setContactData(existingInfo);
    }
  }, [existingInfo]);

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<ContactInfoRecord>) => {
      const response = await fetch("/api/admin/contact-info", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "x-session-id": getSessionId()
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact-info"] });
      toast({ title: "Contact info updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update contact info", variant: "destructive" });
    },
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading contact info...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Update the contact details displayed on your website</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Headline</Label>
            <Input
              value={contactData.headline || ""}
              onChange={(e) => setContactData({ ...contactData, headline: e.target.value })}
              placeholder="Contact section headline"
              data-testid="input-contact-headline"
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={contactData.phone || ""}
              onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
              placeholder="Phone number"
              data-testid="input-contact-phone"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={contactData.description || ""}
            onChange={(e) => setContactData({ ...contactData, description: e.target.value })}
            placeholder="Contact section description"
            rows={3}
            data-testid="input-contact-description"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>General Email</Label>
            <Input
              value={contactData.email || ""}
              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
              placeholder="info@example.com"
              data-testid="input-contact-email"
            />
          </div>
          <div className="space-y-2">
            <Label>Support Email</Label>
            <Input
              value={contactData.supportEmail || ""}
              onChange={(e) => setContactData({ ...contactData, supportEmail: e.target.value })}
              placeholder="support@example.com"
              data-testid="input-contact-support-email"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Address</Label>
          <Textarea
            value={contactData.address || ""}
            onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
            placeholder="Full business address"
            rows={2}
            data-testid="input-contact-address"
          />
        </div>
        <Button
          onClick={() => updateMutation.mutate(contactData)}
          disabled={updateMutation.isPending}
          data-testid="button-save-contact-info"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Contact Info
        </Button>
      </CardContent>
    </Card>
  );
}

function SubmissionsViewer() {
  const { data: submissions, isLoading } = useQuery({
    queryKey: ["/api/contact"],
    queryFn: async () => {
      const response = await fetch("/api/contact", {
        headers: { "x-session-id": getSessionId() },
      });
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    },
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading submissions...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form Submissions</CardTitle>
        <CardDescription>View messages from your website visitors</CardDescription>
      </CardHeader>
      <CardContent>
        {submissions && submissions.length > 0 ? (
          <div className="space-y-4">
            {submissions.map((submission: any) => (
              <div key={submission.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-medium">{submission.name}</h4>
                  <span className="text-xs text-muted-foreground">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{submission.email}</p>
                {submission.company && (
                  <p className="text-sm text-muted-foreground">{submission.company}</p>
                )}
                {submission.serviceInterest && (
                  <p className="text-sm"><span className="font-medium">Service:</span> {submission.serviceInterest}</p>
                )}
                <p className="text-sm mt-2">{submission.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No contact submissions yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
