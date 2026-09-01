import { useGetAdminDashboard } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";

export default function AdminDashboard() {
  const { data: dashboard, isLoading } = useGetAdminDashboard();

  if (isLoading || !dashboard) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-none" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-96 rounded-none" />
          <Skeleton className="h-96 rounded-none" />
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'confirmed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'new': return 'bg-primary/10 text-primary border-primary/20';
      case 'read': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      case 'replied': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-none border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif">AED {dashboard.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Pending Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif text-yellow-500">{dashboard.pendingBookings}</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">New Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif text-primary">{dashboard.newInquiries}</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Active Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif">{dashboard.availableProperties} <span className="text-lg text-muted-foreground font-sans">/ {dashboard.totalProperties}</span></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="rounded-none border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {dashboard.recentBookings.length === 0 ? (
              <div className="text-muted-foreground text-center py-8">No recent bookings</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboard.recentBookings.map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.guestName}</TableCell>
                      <TableCell>{booking.propertyName}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {format(parseISO(booking.checkIn), 'MMM d')} - {format(parseISO(booking.checkOut), 'MMM d')}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`uppercase rounded-none text-[10px] ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-none border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {dashboard.recentInquiries.length === 0 ? (
              <div className="text-muted-foreground text-center py-8">No recent inquiries</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboard.recentInquiries.map(inquiry => (
                    <TableRow key={inquiry.id}>
                      <TableCell className="font-medium">{inquiry.name}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{inquiry.subject}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`uppercase rounded-none text-[10px] ${getStatusColor(inquiry.status)}`}>
                          {inquiry.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
