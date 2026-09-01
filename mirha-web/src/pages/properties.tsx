import { useState } from "react";
import { Link } from "wouter";
import { useListProperties, getListPropertiesQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, MapPin, Bed, Bath, Star } from "lucide-react";

export default function Properties() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");

  const params = {
    ...(search ? { search } : {}),
    ...(type && type !== "all" ? { type } : {}),
    ...(bedrooms && bedrooms !== "all" ? { bedrooms: parseInt(bedrooms) } : {}),
  };

  const { data: properties, isLoading } = useListProperties(params);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-white">Our Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Discover our meticulously curated selection of premium residences, penthouses, and villas across Dubai's most prestigious locations.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-card shadow-xl p-4 border border-border flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name, neighborhood, or location..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-none border-border focus-visible:ring-primary h-12"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="rounded-none h-12 border-border focus:ring-primary">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
                <SelectItem value="room">Furnished Room</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="rounded-none h-12 border-border focus:ring-primary">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Beds</SelectItem>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : properties?.length === 0 ? (
          <div className="text-center py-24 bg-card border border-border mt-8">
            <h3 className="text-2xl font-serif text-foreground mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search criteria or filters.</p>
            <Button 
              onClick={() => { setSearch(""); setType(""); setBedrooms(""); }}
              variant="outline" 
              className="rounded-none uppercase tracking-wider"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {properties?.map((property) => (
              <Link href={`/properties/${property.id}`} key={property.id} className="group block">
                <div className="bg-card border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={property.images?.[0] || "/images/interior-1.png"} 
                      alt={property.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                      {property.type}
                    </div>
                    {property.featured && (
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                      <MapPin className="w-3 h-3 mr-1" />
                      {property.neighborhood || property.location}
                    </div>
                    <h3 className="font-serif text-xl mb-2 text-foreground">{property.name}</h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-grow">{property.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Bed className="w-4 h-4 mr-2 text-primary" />
                        {property.bedrooms} Beds
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Bath className="w-4 h-4 mr-2 text-primary" />
                        {property.bathrooms} Baths
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-border pt-4 mt-auto">
                      <div className="font-semibold text-xl text-foreground">
                        AED {property.pricePerNight} <span className="text-xs text-muted-foreground font-normal uppercase tracking-wider">/ night</span>
                      </div>
                      {property.rating ? (
                        <div className="flex items-center text-sm font-medium">
                          <Star className="w-4 h-4 mr-1 text-primary fill-primary" />
                          {property.rating} <span className="text-muted-foreground ml-1 font-normal">({property.reviewCount})</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
