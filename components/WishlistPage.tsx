
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface WishlistPageProps {
  items: Product[];
  wishlistIds: string[];
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  onExplore: () => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ 
  items, 
  wishlistIds, 
  onAddToCart, 
  onViewDetails, 
  onToggleWishlist,
  onExplore
}) => {
  return (
    <div className="container mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="mb-16">
        <span className="text-burgundy-light font-bold tracking-[0.4em] uppercase text-xs">Your Curated Selection</span>
        <h1 className="text-6xl font-serif text-burgundy italic mb-4">The Wishlist</h1>
        <p className="text-burgundy/60 max-w-2xl text-lg">Your personal sanctuary of botanical favorites, waiting to join your daily ritual.</p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map((product, idx) => (
            <div 
              key={product.id} 
              className="animate-in fade-in slide-in-from-bottom-10 fill-mode-both"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart} 
                onViewDetails={onViewDetails}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[40px] border border-dashed border-burgundy/10">
          <div className="w-24 h-24 bg-blonde rounded-full flex items-center justify-center mb-8 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-burgundy/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-burgundy mb-4 italic">Your wishlist is currently a clean slate.</h2>
          <p className="text-burgundy/60 max-w-md mb-12">
            Explore our artisanal collections and save the items that speak to your soul.
          </p>
          <button 
            onClick={onExplore}
            className="bg-burgundy text-blonde px-12 py-5 rounded-full font-bold hover:bg-burgundy-dark transition-all shadow-2xl uppercase tracking-widest text-xs"
          >
            Discover Collections
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
