import { useState } from "react";
import { useListInquiries, useUpdateInquiry, getListInquiriesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO } from "date-fns";

export default function AdminInquiries() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: inquiries, isLoading } = useListInquiries();
  const updateInquiry = useUpdateInquiry();

  const [activeInquiry, setActiveInquiry] = useState<any>(null);
  const [reply, setReply] = useState("");

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'new': return 'bg-primary/10 text-primary border-primary/20';
      case 'read': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      case 'replied': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const openInquiry = (inquiry: any) => {
    setActiveInquiry(inquiry);
    setReply(inquiry.adminReply || "");
    if (inquiry.status === 'new') {
      updateInquiry.mutate({ id: inquiry.id, data: { status: 'read' } }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getListInquiriesQueryKey() })
      });
    }
  };

  const handleReply = () => {
    if (!activeInquiry) return;
    updateInquiry.mutate({ id: activeInquiry.id, data: { status: 'replied', adminReply: reply } }, {
      onSuccess: () => {
        toast({ title: "Reply saved" });
        queryClient.invalidateQueries({ queryKey: getListInquiriesQueryKey() });
        setActiveInquiry(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif">Inquiries</h1>
      </div>

      <Dialog open={!!activeInquiry} onOpenChange={(open) => !open && setActiveInquiry(null)}>
        <DialogContent className="rounded-none border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{activeInquiry?.subject}</DialogTitle>
          </DialogHeader>
          {activeInquiry && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm bg-muted p-4 border border-border">
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider">From</span>
                  <span className="font-medium">{activeInquiry.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider">Email</span>
                  <span className="font-medium">{activeInquiry.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider">Phone</span>
                  <span className="font-medium">{activeInquiry.phone || "N/A"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider">Date</span>
                  <span className="font-medium">{format(parseISO(activeInquiry.createdAt), 'PP p')}</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">Message</h4>
                <div className="p-4 border border-border bg-card whitespace-pre-wrap text-sm">
                  {activeInquiry.message}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">Internal Notes / Reply Draft</h4>
                <Textarea 
                  value={reply} 
                  onChange={(e) => setReply(e.target.value)} 
                  className="rounded-none min-h-[100px] border-border focus-visible:ring-primary"
                  placeholder="Draft your reply or add internal notes here..."
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" className="rounded-none" onClick={() => setActiveInquiry(null)}>Close</Button>
                <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleReply} disabled={updateInquiry.isPending}>
                  Mark as Replied
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="bg-card border border-border shadow-sm">
        {isLoading ? (
          <div className="p-8"><Skeleton className="h-96 w-full" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries?.map(inquiry => (
                <TableRow key={inquiry.id} className={inquiry.status === 'new' ? 'bg-primary/5' : ''}>
                  <TableCell className="text-xs whitespace-nowrap">
                    {format(parseISO(inquiry.createdAt), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{inquiry.name}</span>
                      <span className="text-xs text-muted-foreground">{inquiry.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">{inquiry.subject}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`uppercase rounded-none text-[10px] ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => openInquiry(inquiry)} className="rounded-none text-xs uppercase tracking-wider">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {inquiries?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No inquiries found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
