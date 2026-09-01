import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useGetProperty, useCreateBooking, getGetPropertyQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { differenceInDays, parseISO } from "date-fns";

export default function BookProperty() {
  const { propertyId: id } = useParams();
  const propertyId = parseInt(id || "0", 10);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: property, isLoading } = useGetProperty(propertyId, {
    query: { enabled: !!propertyId, queryKey: getGetPropertyQueryKey(propertyId) }
  });

  const createBooking = useCreateBooking();

  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    specialRequests: ""
  });
  const [success, setSuccess] = useState(false);

  const calculateTotal = () => {
    if (!property || !formData.checkIn || !formData.checkOut) return 0;
    const start = parseISO(formData.checkIn);
    const end = parseISO(formData.checkOut);
    const days = differenceInDays(end, start);
    if (days <= 0) return 0;
    return days * property.pricePerNight;
  };

  const nights = formData.checkIn && formData.checkOut ? Math.max(0, differenceInDays(parseISO(formData.checkOut), parseISO(formData.checkIn))) : 0;
  const total = calculateTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nights <= 0) {
      toast({ title: "Invalid dates", description: "Check-out must be after check-in", variant: "destructive" });
      return;
    }

    createBooking.mutate({
      data: {
        propertyId,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        guestPhone: formData.guestPhone,
        checkIn: new Date(formData.checkIn).toISOString(),
        checkOut: new Date(formData.checkOut).toISOString(),
        guests: parseInt(formData.guests),
        specialRequests: formData.specialRequests || null
      }
    }, {
      onSuccess: () => {
        setSuccess(true);
        window.scrollTo(0,0);
      },
      onError: (err) => {
        toast({ title: "Booking failed", description: "There was an error processing your request. Please try again.", variant: "destructive" });
      }
    });
  };

  if (isLoading || !property) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-8" />
          <h1 className="text-4xl font-serif text-foreground mb-4">Request Received</h1>
          <p className="text-lg text-muted-foreground mb-8 font-light leading-relaxed">
            Thank you for choosing Mirha Vacation Homes. We have received your booking request for <span className="font-semibold text-foreground">{property.name}</span>. Our concierge team will contact you shortly to confirm your reservation and arrange payment.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href={`/properties/${propertyId}`}>
              <Button variant="outline" className="rounded-none uppercase tracking-widest px-8">Back to Property</Button>
            </Link>
            <Link href="/">
              <Button className="rounded-none uppercase tracking-widest px-8">Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href={`/properties/${property.id}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider mb-8">
          <ChevronLeft className="w-4 h-4 mr-1" /> Return to Property
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-8">Complete your request</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-card border border-border p-6 shadow-sm">
                <h2 className="text-xl font-serif mb-6 border-b border-border pb-4">Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">Full Name</Label>
                    <Input id="name" required value={formData.guestName} onChange={e => setFormData({...formData, guestName: e.target.value})} className="rounded-none h-12 focus-visible:ring-primary" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">Email Address</Label>
                    <Input id="email" type="email" required value={formData.guestEmail} onChange={e => setFormData({...formData, guestEmail: e.target.value})} className="rounded-none h-12 focus-visible:ring-primary" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone" className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">Phone Number</Label>
                    <Input id="phone" type="tel" required value={formData.guestPhone} onChange={e => setFormData({...formData, guestPhone: e.target.value})} className="rounded-none h-12 focus-visible:ring-primary" placeholder="+971 50 123 4567" />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border p-6 shadow-sm">
                <h2 className="text-xl font-serif mb-6 border-b border-border pb-4">Stay Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn" className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">Check In</Label>
                    <Input id="checkIn" type="date" required value={formData.checkIn} onChange={e => setFormData({...formData, checkIn: e.target.value})} className="rounded-none h-12 focus-visible:ring-primary" min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOut" className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">Check Out</Label>
                    <Input id="checkOut" type="date" required value={formData.checkOut} onChange={e => setFormData({...formData, checkOut: e.target.value})} className="rounded-none h-12 focus-visible:ring-primary" min={formData.checkIn || new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="guests" className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">Number of Guests (Max {property.maxGuests})</Label>
                    <Input id="guests" type="number" min="1" max={property.maxGuests} required value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} className="rounded-none h-12 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="requests" className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">Special Requests (Optional)</Label>
                    <Textarea id="requests" value={formData.specialRequests} onChange={e => setFormData({...formData, specialRequests: e.target.value})} className="rounded-none focus-visible:ring-primary min-h-[100px]" placeholder="Airport transfer, baby cot, early check-in..." />
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={createBooking.isPending} className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-none uppercase tracking-widest font-medium">
                {createBooking.isPending ? "Processing..." : "Submit Reservation Request"}
              </Button>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-card border border-border overflow-hidden shadow-xl">
              <div className="aspect-[4/3] w-full">
                <img src={property.images?.[0] || "/images/interior-1.png"} alt={property.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">{property.type}</div>
                <h3 className="text-xl font-serif text-foreground mb-6">{property.name}</h3>
                
                <div className="space-y-4 text-sm border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price per night</span>
                    <span className="font-medium text-foreground">AED {property.pricePerNight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nights</span>
                    <span className="font-medium text-foreground">{nights}</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between items-center">
                    <span className="font-semibold uppercase tracking-wider text-sm text-foreground">Total Estimate</span>
                    <span className="text-2xl font-serif text-primary">AED {total}</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground text-center mt-6 italic">
                  Taxes and additional fees may apply. You will receive a secure payment link after confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
