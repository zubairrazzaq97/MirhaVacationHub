import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="font-serif text-2xl font-bold text-primary">MIRHA</span>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Premium luxury vacation rentals in Dubai. Experience the unparalleled opulence, meticulous service, and prime locations tailored for discerning travelers.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/properties" className="text-sm text-muted-foreground hover:text-white transition-colors">Properties</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="text-sm text-muted-foreground">Downtown Dubai, UAE</li>
              <li className="text-sm text-muted-foreground">+971 50 123 4567</li>
              <li className="text-sm text-muted-foreground">concierge@mirhavacations.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-muted/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Mirha Vacation Homes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
