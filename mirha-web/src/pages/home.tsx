import { Link } from "wouter";
import { useListFeaturedProperties, useGetPropertyStats } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: featuredProperties, isLoading: isPropertiesLoading } = useListFeaturedProperties();
  const { data: stats } = useGetPropertyStats();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="Dubai Skyline" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg">
            Experience Dubai in Absolute Luxury
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-10 font-sans font-light">
            Premium holiday apartments, penthouses, and villas curated for the discerning traveler.
          </p>
          <Link href="/properties">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-none font-medium uppercase tracking-widest">
              Explore Properties
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Curated Residences</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          {isPropertiesLoading ? (
            <div className="text-center text-muted-foreground">Loading exceptional properties...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties?.slice(0, 3).map((property) => (
                <Link href={`/properties/${property.id}`} key={property.id} className="group block">
                  <div className="bg-card border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={property.images?.[0] || "/images/interior-1.png"} 
                        alt={property.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                        {property.type}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl mb-2 text-foreground">{property.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{property.description}</p>
                      <div className="flex justify-between items-center border-t border-border pt-4">
                        <div className="font-semibold text-lg text-foreground">
                          AED {property.pricePerNight} <span className="text-xs text-muted-foreground font-normal">/ night</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {property.bedrooms} Bed &bull; {property.bathrooms} Bath
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link href="/properties">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none uppercase tracking-widest px-8 py-6">
                View All Residences
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Uncompromising Quality. Seamless Service.</h2>
              <p className="text-muted-foreground mb-8 text-lg font-light leading-relaxed">
                Mirha Vacation Homes blends the comfort of a private residence with the amenities of a five-star hotel. Our dedicated concierge team ensures your stay in Dubai is flawless from arrival to departure.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/20 text-primary shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-1">Prime Locations</h4>
                    <p className="text-muted-foreground text-sm">Situated in Dubai's most prestigious neighborhoods including Downtown, Marina, and Palm Jumeirah.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/20 text-primary shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-1">24/7 Concierge</h4>
                    <p className="text-muted-foreground text-sm">Our team is on hand day and night to assist with bookings, reservations, and special requests.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-[3/4]">
              <img src="/images/concierge.png" alt="Concierge" className="w-full h-full object-cover shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 bg-primary p-8 shadow-xl hidden md:block">
                <div className="text-primary-foreground font-serif text-5xl mb-2">{stats?.total || 45}+</div>
                <div className="text-primary-foreground/90 uppercase tracking-widest text-xs font-semibold">Luxury Properties</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
