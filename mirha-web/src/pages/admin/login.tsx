import { useState } from "react";
import { useLocation } from "wouter";
import { useAdminLogin, useGetAdminMe } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { data: adminMe, isLoading } = useGetAdminMe();
  const loginMutation = useAdminLogin();

  // If already logged in, redirect to admin
  if (!isLoading && adminMe?.loggedIn) {
    setLocation("/admin");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      data: { username, password }
    }, {
      onSuccess: () => {
        toast({ title: "Login successful" });
        setLocation("/admin");
      },
      onError: () => {
        toast({ title: "Login failed", description: "Invalid username or password", variant: "destructive" });
      }
    });
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Skeleton className="w-96 h-96" /></div>;
  }

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex w-1/2 bg-secondary items-center justify-center relative overflow-hidden">
        <img src="/images/interior-1.png" alt="Luxury Interior" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay" />
        <div className="relative z-10 text-center px-12">
          <h1 className="text-5xl font-serif text-white mb-6">MIRHA</h1>
          <p className="text-xl text-primary font-light tracking-widest uppercase">Admin Portal</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-card border border-border p-10 shadow-2xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-serif text-foreground mb-2">Welcome Back</h2>
            <p className="text-muted-foreground font-light text-sm uppercase tracking-widest">Sign in to manage your portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">Username</Label>
              <Input 
                id="username" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="rounded-none h-12 bg-background focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="rounded-none h-12 bg-background focus-visible:ring-primary"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-none uppercase tracking-widest font-medium mt-8"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Authenticating..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground font-light">
              Restricted access area. Authorized personnel only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
