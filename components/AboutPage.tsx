
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative h-[400px] flex items-center justify-center bg-burgundy overflow-hidden">
        <img 
           src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=2000&auto=format&fit=crop" 
           alt="Skincare Collection" 
           className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <h1 className="relative z-10 text-6xl md:text-8xl font-serif text-blonde text-center">Our Philosophy</h1>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-20">
          <section className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif text-burgundy italic">Rooted in Luxury</h2>
              <p className="text-lg text-burgundy/70 leading-relaxed">
                Velvet & Vine was born from a simple realization: the modern skincare ritual has become unnecessarily complex and synthetic. We returned to the basics of hydration to find ingredients that have nourished skin for centuries.
              </p>
            </div>
            <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d521?q=80&w=800&auto=format&fit=crop" className="rounded-2xl shadow-xl aspect-square object-cover" alt="Skincare Product Shot" />
          </section>

          <section className="grid md:grid-cols-2 gap-16 items-center">
            <img src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800&auto=format&fit=crop" className="rounded-2xl shadow-xl aspect-square object-cover md:order-2" alt="Cream Texture" />
            <div className="space-y-6 md:order-1">
              <h2 className="text-4xl font-serif text-burgundy italic">The Science of Texture</h2>
              <p className="text-lg text-burgundy/70 leading-relaxed">
                While we respect tradition, we embrace innovation. Our laboratory ensures every product has the perfect weight, absorbency, and tactile experience, creating a ritual you look forward to every day.
              </p>
            </div>
          </section>

          <div className="bg-blonde p-12 rounded-3xl text-center space-y-8 border border-burgundy/5">
             <h3 className="text-3xl font-serif text-burgundy">The Velvet & Vine Promise</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                   <div className="text-burgundy font-bold mb-2">Clean Formulas</div>
                   <p className="text-sm text-burgundy/60">No parabens, sulfates, or artificial fragrances. Ever.</p>
                </div>
                <div>
                   <div className="text-burgundy font-bold mb-2">Sustainable Packaging</div>
                   <p className="text-sm text-burgundy/60">Recyclable glass and minimalist design for less waste.</p>
                </div>
                <div>
                   <div className="text-burgundy font-bold mb-2">Radiant Results</div>
                   <p className="text-sm text-burgundy/60">Visible improvements in skin texture and luminosity.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
