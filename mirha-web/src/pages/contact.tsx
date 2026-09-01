import { useState } from "react";
import { useCreateInquiry } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const createInquiry = useCreateInquiry();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createInquiry.mutate({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject,
        message: formData.message
      }
    }, {
      onSuccess: () => {
        toast({ title: "Inquiry Sent", description: "Our concierge team will contact you shortly." });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-secondary text-secondary-foreground py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-white">Contact Our Concierge</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto font-light">We are at your disposal to assist with reservations, special requests, and bespoke arrangements.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-serif text-foreground mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-none bg-muted flex items-center justify-center text-primary shrink-0 mr-6">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold uppercase tracking-wider text-xs text-muted-foreground mb-1">Office Address</h3>
                  <p className="text-foreground">Boulevard Plaza Tower 1<br/>Downtown Dubai<br/>United Arab Emirates</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-none bg-muted flex items-center justify-center text-primary shrink-0 mr-6">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold uppercase tracking-wider text-xs text-muted-foreground mb-1">Phone & WhatsApp</h3>
                  <p className="text-foreground">+971 50 123 4567</p>
                  <Button variant="outline" className="mt-3 text-xs uppercase tracking-wider border-primary text-primary hover:bg-primary hover:text-primary-foreground h-8" onClick={() => window.open('https://wa.me/971501234567', '_blank')}>
                    <MessageSquare className="w-3 h-3 mr-2" /> WhatsApp Us
                  </Button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-none bg-muted flex items-center justify-center text-primary shrink-0 mr-6">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold uppercase tracking-wider text-xs text-muted-foreground mb-1">Email</h3>
                  <p className="text-foreground">concierge@mirhavacations.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12 w-full h-[300px] bg-muted border border-border">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14441.520977209774!2d55.26649179999999!3d25.1950201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-border p-8 shadow-xl">
            <h2 className="text-2xl font-serif text-foreground mb-6">Send an Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">Name</Label>
                <Input id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded-none h-12 focus-visible:ring-primary" placeholder="Your full name" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">Email</Label>
                  <Input id="email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="rounded-none h-12 focus-visible:ring-primary" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">Phone (Optional)</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="rounded-none h-12 focus-visible:ring-primary" placeholder="+971..." />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">Subject</Label>
                <Input id="subject" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="rounded-none h-12 focus-visible:ring-primary" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">Message</Label>
                <Textarea id="message" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="rounded-none focus-visible:ring-primary min-h-[150px]" placeholder="Please provide details about your inquiry..." />
              </div>
              <Button type="submit" disabled={createInquiry.isPending} className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-none uppercase tracking-widest font-medium">
                {createInquiry.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
