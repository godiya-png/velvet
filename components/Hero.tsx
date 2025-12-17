
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        setScrollOffset(window.pageYOffset);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate the shift for the shimmer effect
  const shimmerTranslateX = scrollOffset * 0.2;
  const shimmerTranslateY = scrollOffset * 0.1;

  return (
    <div className="relative h-[600px] flex items-center bg-burgundy overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 opacity-50 z-0">
        <img 
          src="https://images.unsplash.com/photo-1570172235301-49622aa16a39?q=80&w=2000&auto=format&fit=crop" 
          alt="Premium Skincare Product" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Subtle Shimmer Overlay - Reactive to Scroll */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1] opacity-60"
        style={{
          background: `linear-gradient(135deg, 
            transparent 0%, 
            rgba(229, 192, 123, 0) 30%, 
            rgba(250, 245, 225, 0.15) 50%, 
            rgba(229, 192, 123, 0) 70%, 
            transparent 100%)`,
          backgroundSize: '200% 200%',
          transform: `translate3d(${-shimmerTranslateX}px, ${-shimmerTranslateY}px, 0) scale(1.5)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-6 text-center md:text-left">
        <div className="max-w-2xl bg-burgundy/40 backdrop-blur-md p-8 rounded-2xl border border-blonde/10 shadow-2xl">
          <h2 className="text-blonde-dark text-lg uppercase tracking-[0.3em] font-medium mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">Summer Collection 2024</h2>
          <h1 className="text-5xl md:text-7xl font-serif text-blonde leading-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">Elegance in Every <span className="italic">Drop.</span></h1>
          <p className="text-blonde/80 text-lg mb-10 leading-relaxed max-w-lg animate-in fade-in slide-in-from-bottom-6 duration-700">
            Discover our curated collection of luxury skincare and lipcare. Crafted with organic botanicals for a radiance that lasts from day to night.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start animate-in fade-in slide-in-from-bottom-8 duration-700">
            <button className="bg-blonde text-burgundy px-10 py-4 font-bold rounded shadow-lg hover:bg-blonde-dark transition-all transform hover:-translate-y-1">
              Shop Skincare
            </button>
            <button className="border-2 border-blonde text-blonde px-10 py-4 font-bold rounded hover:bg-blonde hover:text-burgundy transition-all transform hover:-translate-y-1">
              Lipcare Essentials
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Text Layer - Reactive to scroll */}
      <div className="absolute right-0 bottom-0 hidden lg:block p-12 z-[2]">
         <div 
          className="text-blonde/20 text-[120px] font-serif select-none pointer-events-none -rotate-12 translate-y-1/2 translate-x-1/4"
          style={{
            transform: `translate3d(${25 - (scrollOffset * 0.05)}%, ${50 - (scrollOffset * 0.05)}%, 0) rotate(-12deg)`
          }}
         >
           RADIANCE
         </div>
      </div>
    </div>
  );
};

export default Hero;
