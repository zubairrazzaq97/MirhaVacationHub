import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-serif text-2xl font-bold text-primary">
              MIRHA
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-medium">Home</Link>
            <Link href="/properties" className="text-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-medium">Properties</Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-medium">About</Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-medium">Contact</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/admin/login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium uppercase tracking-wider text-xs">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
