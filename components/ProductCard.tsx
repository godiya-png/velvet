
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onViewDetails,
  isWishlisted = false,
  onToggleWishlist
}) => {
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full border border-burgundy/5">
      <div 
        className="relative aspect-square overflow-hidden bg-blonde cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3">
          <button 
            onClick={handleWishlistClick}
            className={`p-2 rounded-full transition-all shadow-sm ${
              isWishlisted 
                ? 'bg-burgundy text-blonde' 
                : 'bg-white/80 backdrop-blur hover:bg-burgundy hover:text-blonde'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isWishlisted ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div className="absolute inset-0 bg-burgundy/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
           <span className="bg-white text-burgundy px-4 py-2 rounded-full text-sm font-bold shadow-lg">View Details</span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-widest text-burgundy-light font-bold">{product.category}</span>
          <div className="flex items-center text-blonde-dark">
             <span className="text-xs font-bold mr-1">{product.rating}</span>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 fill-current" viewBox="0 0 20 20">
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
             </svg>
          </div>
        </div>
        <h3 className="text-lg font-serif font-bold text-burgundy mb-2 group-hover:text-burgundy-light transition-colors">{product.name}</h3>
        <p className="text-sm text-burgundy/60 line-clamp-2 mb-4 flex-1">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-burgundy">${product.price}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-blonde text-burgundy border border-burgundy/10 px-4 py-2 rounded font-bold hover:bg-burgundy hover:text-blonde transition-all transform active:scale-95"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
