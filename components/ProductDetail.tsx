
import React, { useState, useEffect } from 'react';
import { Product, Review } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (p: Product, quantity: number) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Review State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  // Load mock reviews on mount or product change
  useEffect(() => {
    const mockReviews: Review[] = [
      {
        id: 'r1',
        userName: 'Sophia L.',
        rating: 5,
        comment: 'Absolutely love the texture! My skin has never felt more hydrated and glowing.',
        date: '2024-03-15'
      },
      {
        id: 'r2',
        userName: 'Michael R.',
        rating: 4,
        comment: 'Great product, though the scent is a bit stronger than I expected. Still very effective.',
        date: '2024-03-10'
      }
    ];
    setReviews(mockReviews);
    setQuantity(1);
    setCurrentImgIndex(0);
  }, [product.id]);

  const nextImg = () => {
    setCurrentImgIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImg = () => {
    setCurrentImgIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      userName: 'You',
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([review, ...reviews]);
    setNewComment('');
    setNewRating(5);
  };

  return (
    <div className="container mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        {/* Carousel */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-blonde">
            <img 
              src={product.images[currentImgIndex]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={prevImg}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextImg}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            <button 
              onClick={() => onToggleWishlist?.(product)}
              className={`absolute top-6 right-6 p-4 rounded-full shadow-2xl transition-all z-20 ${
                isWishlisted ? 'bg-burgundy text-blonde' : 'bg-white text-burgundy hover:bg-burgundy hover:text-blonde'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isWishlisted ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentImgIndex(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                  currentImgIndex === idx ? 'border-burgundy' : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} alt={`${product.name} view ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="text-burgundy-light font-bold tracking-[0.3em] uppercase text-sm">{product.category}</span>
            <h1 className="text-5xl font-serif text-burgundy mt-2 mb-4 leading-tight">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-burgundy">${product.price}</span>
              <div className="flex items-center text-blonde-dark">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-blonde-dark/30'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm font-medium text-burgundy/60">{product.rating} / 5</span>
              </div>
            </div>
            <p className="text-lg text-burgundy/80 leading-relaxed border-b border-burgundy/10 pb-8">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {product.ingredients && (
              <div>
                <h3 className="font-serif font-bold text-burgundy text-xl mb-3">Ingredients</h3>
                <ul className="text-sm text-burgundy/60 space-y-1">
                  {product.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                </ul>
              </div>
            )}
            {product.howToUse && (
              <div>
                <h3 className="font-serif font-bold text-burgundy text-xl mb-3">How to Use</h3>
                <p className="text-sm text-burgundy/60 leading-relaxed">{product.howToUse}</p>
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border-2 border-burgundy/10 rounded-xl overflow-hidden h-14 bg-white">
              <button 
                onClick={decrementQuantity}
                className="px-6 h-full hover:bg-blonde transition-colors text-burgundy text-xl font-bold border-r border-burgundy/10"
              >
                -
              </button>
              <span className="px-8 text-lg font-bold text-burgundy">{quantity}</span>
              <button 
                onClick={incrementQuantity}
                className="px-6 h-full hover:bg-blonde transition-colors text-burgundy text-xl font-bold border-l border-burgundy/10"
              >
                +
              </button>
            </div>
            <button 
              onClick={() => onAddToCart(product, quantity)}
              className="flex-1 bg-burgundy text-blonde py-4 px-8 font-bold rounded-xl shadow-xl hover:bg-burgundy-dark transition-all transform active:scale-[0.98] h-14"
            >
              Add to Shopping Bag
            </button>
          </div>
          <p className="mt-4 text-center sm:text-left text-xs text-burgundy/40 uppercase tracking-widest">Free Shipping on orders over $50</p>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="border-t border-burgundy/10 pt-16">
        <h2 className="text-4xl font-serif text-burgundy mb-12 text-center">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Review Summary & Form */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-blonde p-8 rounded-2xl border border-burgundy/5">
              <h3 className="text-2xl font-serif text-burgundy mb-4">Share Your Experience</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-burgundy/60">Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setNewRating(star)}
                        className="transition-transform active:scale-90"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-8 w-8 ${(hoverRating || newRating) >= star ? 'fill-blonde-dark text-blonde-dark' : 'text-blonde-dark/20'}`} 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-burgundy/60">Comment</label>
                  <textarea
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tell us what you think..."
                    className="w-full bg-white border border-burgundy/10 rounded-xl px-4 py-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-burgundy/10 text-burgundy text-sm"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-burgundy text-blonde py-3 rounded-xl font-bold hover:bg-burgundy-dark transition-colors shadow-lg"
                >
                  Post Review
                </button>
              </form>
            </div>
          </div>

          {/* Review List */}
          <div className="lg:col-span-2 space-y-8">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border-b border-burgundy/5 pb-8 animate-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-burgundy">{review.userName}</h4>
                      <p className="text-xs text-burgundy/40">{review.date}</p>
                    </div>
                    <div className="flex text-blonde-dark">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-blonde-dark/20'}`} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-burgundy/70 leading-relaxed italic">"{review.comment}"</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-burgundy/20">
                <p className="text-burgundy/40 italic">No reviews yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
