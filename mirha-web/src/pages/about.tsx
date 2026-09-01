export default function About() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/interior-2.png" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">The Art of Hospitality</h1>
          <p className="text-lg text-white/80 font-light leading-relaxed">
            Redefining short-term stays in Dubai with unparalleled luxury, meticulous design, and discrete, personalized service.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-foreground mb-4">Our Story</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="prose prose-lg prose-slate mx-auto font-light text-muted-foreground text-justify">
          <p>
            Founded in 2021, Mirha Vacation Homes emerged from a simple observation: the modern luxury traveler seeks the amenities of a five-star hotel, but craves the privacy, space, and character of a private residence.
          </p>
          <p>
            We set out to bridge this gap. Our portfolio is not simply a collection of properties; it is a meticulously curated gallery of Dubai's finest real estate. From minimalist penthouses overlooking the Marina to opulent villas on the Palm Jumeirah, every residence is selected against exacting standards.
          </p>
          <p>
            But beautiful spaces are only the canvas. Our true distinction lies in our service. Our concierge team operates with the quiet efficiency of a private club, anticipating needs and orchestrating seamless experiences—whether that means arranging a private chef, securing impossible reservations, or simply ensuring your preferred vintage is waiting upon arrival.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-muted/30 py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.827A2.516 2.516 0 0013.108 11.5l-2.073-2.073M11.42 15.17l-1.92-1.92-3.58 3.58a2.121 2.121 0 01-3 0 2.121 2.121 0 010-3l3.58-3.58-1.92-1.92M11.42 15.17l-4.5 4.5M13.108 11.5l2.073 2.073M13.108 11.5l-4.5-4.5m-4.5-4.5l-2.073-2.073" /></svg>
              </div>
              <h3 className="font-serif text-xl mb-3 text-foreground">Impeccable Design</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">Spaces crafted for both aesthetic impact and profound comfort, featuring premium furnishings and bespoke art.</p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <h3 className="font-serif text-xl mb-3 text-foreground">Unwavering Privacy</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">Discrete access, secure locations, and a staff trained in the art of invisible, anticipatory service.</p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>
              </div>
              <h3 className="font-serif text-xl mb-3 text-foreground">Prime Locations</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">Only the most coveted addresses in Dubai, placing you moments away from the city's finest dining, shopping, and culture.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
