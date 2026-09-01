import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Properties from "@/pages/properties";
import Property from "@/pages/property";
import BookProperty from "@/pages/book";
import About from "@/pages/about";
import Contact from "@/pages/contact";

import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProperties from "@/pages/admin/properties";
import AdminBookings from "@/pages/admin/bookings";
import AdminInquiries from "@/pages/admin/inquiries";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" match="prefix">
        <AdminLayout>
          <Switch>
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/admin/properties" component={AdminProperties} />
            <Route path="/admin/bookings" component={AdminBookings} />
            <Route path="/admin/inquiries" component={AdminInquiries} />
            <Route component={NotFound} />
          </Switch>
        </AdminLayout>
      </Route>

      {/* Public Routes */}
      <Route path="/">
        <AppLayout>
          <Home />
        </AppLayout>
      </Route>
      <Route path="/properties">
        <AppLayout>
          <Properties />
        </AppLayout>
      </Route>
      <Route path="/properties/:id">
        <AppLayout>
          <Property />
        </AppLayout>
      </Route>
      <Route path="/book/:propertyId">
        <AppLayout>
          <BookProperty />
        </AppLayout>
      </Route>
      <Route path="/about">
        <AppLayout>
          <About />
        </AppLayout>
      </Route>
      <Route path="/contact">
        <AppLayout>
          <Contact />
        </AppLayout>
      </Route>
      
      {/* 404 */}
      <Route>
        <AppLayout>
          <NotFound />
        </AppLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
