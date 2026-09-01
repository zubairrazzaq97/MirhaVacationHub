import { useState } from "react";
import { useListProperties, useCreateProperty, useUpdateProperty, useDeleteProperty, getListPropertiesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function AdminProperties() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: properties, isLoading } = useListProperties();
  
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const deleteProperty = useDeleteProperty();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);

  const defaultFormState = {
    name: "",
    type: "apartment",
    description: "",
    pricePerNight: 1000,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    size: 1000,
    location: "Dubai",
    neighborhood: "",
    images: "",
    amenities: "WiFi, Air Conditioning",
    featured: false,
    available: true
  };

  const [formData, setFormData] = useState(defaultFormState);

  const openNewDialog = () => {
    setEditingProperty(null);
    setFormData(defaultFormState);
    setIsDialogOpen(true);
  };

  const openEditDialog = (property: any) => {
    setEditingProperty(property);
    setFormData({
      ...property,
      images: property.images.join("\n"),
      amenities: property.amenities.join(", ")
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      deleteProperty.mutate({ id }, {
        onSuccess: () => {
          toast({ title: "Property deleted" });
          queryClient.invalidateQueries({ queryKey: getListPropertiesQueryKey() });
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      pricePerNight: Number(formData.pricePerNight),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      maxGuests: Number(formData.maxGuests),
      size: formData.size ? Number(formData.size) : null,
      images: formData.images.split("\n").filter(url => url.trim() !== ""),
      amenities: formData.amenities.split(",").map(a => a.trim()).filter(a => a !== "")
    };

    if (editingProperty) {
      updateProperty.mutate({ id: editingProperty.id, data: payload }, {
        onSuccess: () => {
          toast({ title: "Property updated" });
          queryClient.invalidateQueries({ queryKey: getListPropertiesQueryKey() });
          setIsDialogOpen(false);
        }
      });
    } else {
      createProperty.mutate({ data: payload }, {
        onSuccess: () => {
          toast({ title: "Property created" });
          queryClient.invalidateQueries({ queryKey: getListPropertiesQueryKey() });
          setIsDialogOpen(false);
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif">Properties</h1>
        <Button onClick={openNewDialog} className="rounded-none uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Add Property
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-none border-border">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">{editingProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={formData.type} onValueChange={v => setFormData({...formData, type: v})}>
                  <SelectTrigger className="rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="room">Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="rounded-none min-h-[100px]" />
              </div>
              
              <div className="space-y-2">
                <Label>Price per night (AED)</Label>
                <Input type="number" required value={formData.pricePerNight} onChange={e => setFormData({...formData, pricePerNight: e.target.value as any})} className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label>Neighborhood</Label>
                <Input value={formData.neighborhood || ""} onChange={e => setFormData({...formData, neighborhood: e.target.value})} className="rounded-none" />
              </div>

              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Input type="number" required value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value as any})} className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <Input type="number" required value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value as any})} className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label>Max Guests</Label>
                <Input type="number" required value={formData.maxGuests} onChange={e => setFormData({...formData, maxGuests: e.target.value as any})} className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label>Size (sqft)</Label>
                <Input type="number" value={formData.size || ""} onChange={e => setFormData({...formData, size: e.target.value as any})} className="rounded-none" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Images (one URL per line)</Label>
                <Textarea value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} className="rounded-none min-h-[100px] text-xs" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Amenities (comma separated)</Label>
                <Input value={formData.amenities} onChange={e => setFormData({...formData, amenities: e.target.value})} className="rounded-none" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="featured" checked={formData.featured} onCheckedChange={c => setFormData({...formData, featured: c})} />
                <Label htmlFor="featured">Featured Property</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="available" checked={formData.available} onCheckedChange={c => setFormData({...formData, available: c})} />
                <Label htmlFor="available">Available for booking</Label>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-none">Cancel</Button>
              <Button type="submit" disabled={createProperty.isPending || updateProperty.isPending} className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                {editingProperty ? "Save Changes" : "Create Property"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="bg-card border border-border shadow-sm">
        {isLoading ? (
          <div className="p-8"><Skeleton className="h-96 w-full" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price/Night</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties?.map(property => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{property.name}</span>
                      <span className="text-xs text-muted-foreground uppercase">{property.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{property.neighborhood || property.location}</TableCell>
                  <TableCell>AED {property.pricePerNight}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {property.available ? 
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 w-fit text-[10px] rounded-none">Available</Badge> : 
                        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 w-fit text-[10px] rounded-none">Offline</Badge>
                      }
                      {property.featured && <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 w-fit text-[10px] rounded-none">Featured</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(property)} className="text-muted-foreground hover:text-primary">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(property.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {properties?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No properties found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
