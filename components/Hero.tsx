
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollOffset(window.pageYOffset);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shimmerTranslateX = scrollOffset * 0.2;
  const shimmerTranslateY = scrollOffset * 0.1;

  return (
    <div className="relative h-[700px] flex items-center bg-burgundy overflow-hidden">
      {/* Background Image Layer with Slow Zoom */}
      <div className="absolute inset-0 opacity-60 z-0">
        <img 
          src="https://i.pinimg.com/1200x/a5/6c/3a/a56c3a0f4824ebb3a315ef723d02be53.jpg" 
          alt="Premium Skincare Botanical Background" 
          className="w-full h-full object-cover animate-slow-zoom"
        />
      </div>

      {/* Subtle Shimmer Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1] opacity-40"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            rgba(250, 245, 225, 0.15) 0%, 
            transparent 70%)`,
          transform: `translate3d(${-shimmerTranslateX * 0.5}px, ${-shimmerTranslateY * 0.5}px, 0) scale(1.2)`,
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl bg-burgundy/30 backdrop-blur-xl p-10 md:p-14 rounded-[40px] border border-blonde/10 shadow-2xl animate-in fade-in zoom-in duration-1000">
          <h2 className="text-blonde-dark text-sm md:text-lg uppercase tracking-[0.5em] font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-300">
            Est. 2024 • Atelier Collection
          </h2>
          <h1 className="text-6xl md:text-8xl font-serif text-blonde leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both delay-500">
            Elegance in Every <span className="italic">Drop.</span>
          </h1>
          <p className="text-blonde/70 text-lg md:text-xl mb-12 leading-relaxed max-w-lg animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both delay-700">
            Discover a sanctuary of botanical wisdom. Our curated rituals transform daily care into a moment of pure serenity.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 fill-mode-both delay-1000">
            <button className="bg-blonde text-burgundy px-12 py-5 font-bold rounded-full shadow-2xl hover:bg-blonde-dark transition-all transform hover:-translate-y-1 active:scale-95 text-sm uppercase tracking-widest">
              Shop Skincare
            </button>
            <button className="border-2 border-blonde/30 backdrop-blur text-blonde px-12 py-5 font-bold rounded-full hover:bg-blonde hover:text-burgundy transition-all transform hover:-translate-y-1 active:scale-95 text-sm uppercase tracking-widest">
              Lipcare Essentials
            </button>
          </div>
        </div>
      </div>

      {/* Floating Decorative Text */}
      <div className="absolute right-[-5%] bottom-[-5%] hidden lg:block z-[2]">
         <div 
          className="text-blonde/5 text-[180px] font-serif select-none pointer-events-none animate-float"
          style={{
            transform: `translate3d(${20 - (scrollOffset * 0.08)}%, ${scrollOffset * 0.05}%, 0) rotate(-15deg)`
          }}
         >
           BOTANICAL
         </div>
      </div>
    </div>
  );
};

export default Hero;
