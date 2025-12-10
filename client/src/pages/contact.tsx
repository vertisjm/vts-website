import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const serviceOptions = [
  { value: "managed-it", label: "Managed IT Services" },
  { value: "network-infrastructure", label: "Network Design & Infrastructure" },
  { value: "it-security", label: "IT Security Services" },
  { value: "cloud-services", label: "Cloud Services" },
  { value: "staff-augmentation", label: "IT Staff Augmentation" },
  { value: "other", label: "Other / General Inquiry" },
];

function HeroSection() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-6">Contact Us</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6" data-testid="text-contact-title">
            Let's Start a <span className="text-primary">Conversation</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed" data-testid="text-contact-description">
            Whether you need IT support, want to discuss a project, or simply have questions, we're here to help. Reach out and let's explore how we can support your business.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      serviceInterest: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll respond within 24 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <Card data-testid="card-success">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
          <p className="text-muted-foreground mb-6">
            Your message has been received. One of our team members will contact you within 24 hours.
          </p>
          <Button onClick={() => setSubmitted(false)} data-testid="button-send-another">
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="card-contact-form">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} data-testid="input-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="john@company.com" type="email" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Company Ltd." {...field} value={field.value || ""} data-testid="input-company" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Interest</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger data-testid="select-service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your project or inquiry..." 
                      className="min-h-[150px] resize-none"
                      {...field} 
                      data-testid="textarea-message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mutation.isError && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm" data-testid="text-form-error">
                {mutation.error instanceof Error 
                  ? mutation.error.message 
                  : "Something went wrong. Please check your information and try again."}
              </div>
            )}

            <Button 
              type="submit" 
              size="lg" 
              className="w-full gap-2"
              disabled={mutation.isPending}
              data-testid="button-submit"
            >
              {mutation.isPending ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function ContactInfoSection() {
  return (
    <div className="space-y-6">
      <Card data-testid="card-contact-info">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Office Address</p>
                <p className="text-sm text-muted-foreground">
                  1b Braemar Avenue<br />
                  Kingston 10, Jamaica
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Phone</p>
                <a href="tel:+18766348700" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-phone">
                  +1 (876) 634-8700
                </a>
                <br />
                <a href="tel:+18766348699" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-phone-alt">
                  +1 (876) 634-8699
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Email</p>
                <a href="mailto:info@vertisjm.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-email">
                  info@vertisjm.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Office Hours</p>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday: 8:00 AM - 5:00 PM<br />
                  Weekend: Emergency Support Only
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card data-testid="card-map">
        <CardContent className="p-0 overflow-hidden">
          <div className="aspect-[4/3] bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.4876!2d-76.7844!3d18.0108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDAwJzM5LjAiTiA3NsKwNDcnMDQuNCJX!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vertis Technology Office Location"
              className="rounded-b-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <HeroSection />
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <ContactFormSection />
            </div>
            <div className="lg:col-span-2">
              <ContactInfoSection />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
