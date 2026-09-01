import { useListBookings, useUpdateBooking, getListBookingsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO } from "date-fns";

export default function AdminBookings() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: bookings, isLoading } = useListBookings();
  const updateBooking = useUpdateBooking();

  const handleStatusChange = (id: number, status: string) => {
    updateBooking.mutate({ id, data: { status } }, {
      onSuccess: () => {
        toast({ title: "Booking status updated" });
        queryClient.invalidateQueries({ queryKey: getListBookingsQueryKey() });
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'confirmed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif">Bookings</h1>
      </div>

      <div className="bg-card border border-border shadow-sm">
        {isLoading ? (
          <div className="p-8"><Skeleton className="h-96 w-full" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.map(booking => (
                <TableRow key={booking.id}>
                  <TableCell className="text-xs text-muted-foreground">#{booking.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{booking.guestName}</span>
                      <span className="text-xs text-muted-foreground">{booking.guestEmail}</span>
                      <span className="text-xs text-muted-foreground">{booking.guestPhone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{booking.propertyName}</TableCell>
                  <TableCell className="text-sm">
                    {format(parseISO(booking.checkIn), 'MMM d, yyyy')} <br/>
                    <span className="text-muted-foreground text-xs">to</span> <br/>
                    {format(parseISO(booking.checkOut), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="font-medium">AED {booking.totalPrice}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`uppercase rounded-none text-[10px] ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select value={booking.status} onValueChange={(v) => handleStatusChange(booking.id, v)}>
                      <SelectTrigger className="w-[130px] h-8 text-xs rounded-none ml-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
              {bookings?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No bookings found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
