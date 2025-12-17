
import React, { useRef } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface NewArrivalsCarouselProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

const NewArrivalsCarousel: React.FC<NewArrivalsCarouselProps> = ({ products, onAddToCart, onViewDetails }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-blonde py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <span className="text-burgundy-light font-bold tracking-[0.3em] uppercase text-xs">Recently Curated</span>
            <h2 className="text-4xl md:text-5xl font-serif text-burgundy italic">The New Collection</h2>
          </div>
          
          <div className="hidden md:flex space-x-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-burgundy/20 flex items-center justify-center hover:bg-burgundy hover:text-blonde transition-all"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-burgundy/20 flex items-center justify-center hover:bg-burgundy hover:text-blonde transition-all"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex space-x-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map(product => (
            <div key={product.id} className="min-w-[280px] sm:min-w-[340px] snap-start">
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart} 
                onViewDetails={onViewDetails} 
              />
            </div>
          ))}
        </div>
        
        {/* Mobile indicators */}
        <div className="md:hidden flex justify-center mt-6 space-x-2">
          {products.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-burgundy/20"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsCarousel;
