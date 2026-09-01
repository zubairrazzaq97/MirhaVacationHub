import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useGetAdminMe, useAdminLogout } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutDashboard, Home, Calendar, MessageSquare, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AdminLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const { data: adminMe, isLoading, isError } = useGetAdminMe();
  const logout = useAdminLogout();

  // If not logged in, redirect to login
  if (isError || (adminMe && !adminMe.loggedIn)) {
    setLocation("/admin/login");
    return null;
  }

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        toast({ title: "Logged out" });
        setLocation("/admin/login");
      }
    });
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Properties", href: "/admin/properties", icon: Home },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  ];

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><Skeleton className="w-64 h-64" /></div>;
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-border">
          <Link href="/admin" className="font-serif text-2xl font-bold text-primary">
            MIRHA <span className="text-sm font-sans font-normal uppercase tracking-widest text-muted-foreground ml-2">Admin</span>
          </Link>
        </div>
        <div className="p-4 flex-grow space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href || (item.href !== "/admin" && location.startsWith(item.href));
            return (
              <Link key={item.name} href={item.href}>
                <div className={`flex items-center px-4 py-3 rounded-none uppercase tracking-wider text-xs font-semibold cursor-pointer transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                }`}>
                  <Icon className="w-4 h-4 mr-3" />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start rounded-none text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-3" />
            <span className="uppercase tracking-wider text-xs font-semibold">Log Out</span>
          </Button>
          <div className="mt-4 pt-4 border-t border-border flex items-center text-xs text-muted-foreground">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-primary font-serif font-bold mr-3">
              {adminMe?.username?.charAt(0).toUpperCase()}
            </div>
            Logged in as {adminMe?.username}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-h-screen overflow-y-auto">
        <header className="h-20 bg-card border-b border-border flex items-center px-8 shadow-sm">
          <h2 className="text-xl font-serif text-foreground capitalize">{location.split("/").pop() || "Dashboard"}</h2>
          <div className="ml-auto">
            <Link href="/" target="_blank">
              <Button variant="outline" className="rounded-none uppercase tracking-wider text-xs">View Live Site</Button>
            </Link>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
