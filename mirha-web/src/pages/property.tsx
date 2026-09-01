import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useGetProperty, getGetPropertyQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bed, Bath, Users, Maximize, MapPin, CheckCircle, ChevronLeft } from "lucide-react";
import { format } from "date-fns";

export default function Property() {
  const { id } = useParams();
  const propertyId = parseInt(id || "0", 10);
  const [, setLocation] = useLocation();

  const { data: property, isLoading, isError } = useGetProperty(propertyId, {
    query: { enabled: !!propertyId, queryKey: getGetPropertyQueryKey(propertyId) }
  });

  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 max-w-7xl mx-auto">
        <Skeleton className="h-10 w-32 mb-8" />
        <Skeleton className="h-[60vh] w-full mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-serif text-foreground mb-4">Property Not Found</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">We couldn't find the property you're looking for. It may have been removed or is no longer available.</p>
        <Link href="/properties">
          <Button className="rounded-none uppercase tracking-widest px-8">Return to Collection</Button>
        </Link>
      </div>
    );
  }

  const images = property.images?.length > 0 ? property.images : [
    "/images/interior-1.png",
    "/images/interior-2.png",
    "/images/kitchen.png",
    "/images/bathroom.png",
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Top Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/properties" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Properties
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[60vh]">
          <div className="md:col-span-3 h-full relative group overflow-hidden">
            <img 
              src={images[activeImage]} 
              alt={property.name} 
              className="w-full h-full object-cover"
            />
            {property.featured && (
              <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-2 text-xs uppercase tracking-wider font-semibold shadow-lg">
                Featured Residence
              </div>
            )}
          </div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            {images.slice(0, 4).map((img, idx) => (
              <div 
                key={idx} 
                className={`relative flex-1 cursor-pointer overflow-hidden ${activeImage === idx ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} alt={`Gallery view ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center text-sm text-primary uppercase tracking-wider font-semibold mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                {property.neighborhood || property.location}, Dubai
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight">{property.name}</h1>
              
              <div className="flex flex-wrap gap-8 py-6 border-y border-border">
                <div className="flex items-center text-muted-foreground">
                  <Bed className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">{property.bedrooms}</div>
                    <div className="text-xs uppercase tracking-wider">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Bath className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">{property.bathrooms}</div>
                    <div className="text-xs uppercase tracking-wider">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">{property.maxGuests}</div>
                    <div className="text-xs uppercase tracking-wider">Guests Max</div>
                  </div>
                </div>
                {property.size && (
                  <div className="flex items-center text-muted-foreground">
                    <Maximize className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">{property.size} sqft</div>
                      <div className="text-xs uppercase tracking-wider">Size</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-serif text-foreground mb-6">About this residence</h2>
              <div className="prose prose-slate max-w-none text-muted-foreground font-light leading-relaxed">
                <p className="whitespace-pre-line">{property.description}</p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-serif text-foreground mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                {property.amenities && property.amenities.length > 0 ? (
                  property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center text-foreground font-light">
                      <CheckCircle className="w-4 h-4 mr-3 text-primary shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center text-foreground font-light"><CheckCircle className="w-4 h-4 mr-3 text-primary" /> WiFi</div>
                    <div className="flex items-center text-foreground font-light"><CheckCircle className="w-4 h-4 mr-3 text-primary" /> Air Conditioning</div>
                    <div className="flex items-center text-foreground font-light"><CheckCircle className="w-4 h-4 mr-3 text-primary" /> Smart TV</div>
                    <div className="flex items-center text-foreground font-light"><CheckCircle className="w-4 h-4 mr-3 text-primary" /> Fully Equipped Kitchen</div>
                    <div className="flex items-center text-foreground font-light"><CheckCircle className="w-4 h-4 mr-3 text-primary" /> Free Parking</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-card border border-border p-8 shadow-xl">
              <div className="mb-6">
                <span className="text-3xl font-serif text-foreground">AED {property.pricePerNight}</span>
                <span className="text-sm text-muted-foreground font-light uppercase tracking-widest ml-2">/ night</span>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-sm text-muted-foreground pb-4 border-b border-border">
                  Experience true luxury in the heart of Dubai. Reserve your dates now.
                </p>
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Status</span>
                    <span className={`font-semibold uppercase tracking-wider text-xs ${property.available ? 'text-green-600' : 'text-destructive'}`}>
                      {property.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  {property.available && (
                     <Button 
                       onClick={() => setLocation(`/book/${property.id}`)}
                       className="w-full mt-4 h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-none uppercase tracking-widest font-medium"
                     >
                       Reserve Now
                     </Button>
                  )}
                  {!property.available && (
                    <Button disabled className="w-full mt-4 h-14 rounded-none uppercase tracking-widest">
                      Currently Booked
                    </Button>
                  )}
                </div>
              </div>

              <div className="text-xs text-center text-muted-foreground mt-6 font-light">
                You won't be charged yet.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
