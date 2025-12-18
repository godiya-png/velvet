
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { User, CartItem, Product, AppView } from './types';
import { PRODUCTS } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import AuthModal from './components/AuthModal';
import CartDrawer from './components/CartDrawer';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ShippingPage from './components/ShippingPage';
import FAQPage from './components/FAQPage';
import CheckoutPage from './components/CheckoutPage';
import NewArrivalsCarousel from './components/NewArrivalsCarousel';
import NewsletterSuccessPage from './components/NewsletterSuccessPage';
import WishlistPage from './components/WishlistPage';
import AccountPage from './components/AccountPage';

const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [skincareFilter, setSkincareFilter] = useState<'All' | 'Skincare' | 'Serums' | 'Masks'>('All');

  // Data State
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('vv_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vv_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vv_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Intersection Observer for scroll animations
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [currentView]); // Re-observe when view changes

  // Persistence
  useEffect(() => {
    if (user) localStorage.setItem('vv_user', JSON.stringify(user));
    else localStorage.removeItem('vv_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vv_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vv_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Handlers
  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('vv_user');
    handleViewChange('home');
  };

  const handleViewChange = (view: AppView) => {
    setCurrentView(view);
    setSelectedProduct(null);
    setSearchQuery('');
    setSkincareFilter('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setCurrentView('search');
    } else if (currentView === 'search') {
      setCurrentView('home');
    }
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
      if (prev.includes(product.id)) {
        return prev.filter(id => id !== product.id);
      }
      return [...prev, product.id];
    });
  };

  const handleCheckoutComplete = () => {
    setCart([]);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    if (email) {
      setSubscribedEmail(email);
      handleViewChange('newsletter-success');
    }
  };

  // Memos for filtering
  const skincareProducts = useMemo(() => {
    const base = PRODUCTS.filter(p => ['Skincare', 'Serums', 'Masks'].includes(p.category));
    if (skincareFilter === 'All') return base;
    return base.filter(p => p.category === skincareFilter);
  }, [skincareFilter]);

  const lipcareProducts = useMemo(() => PRODUCTS.filter(p => p.category === 'Lipcare'), []);
  const wishlistedProducts = useMemo(() => PRODUCTS.filter(p => wishlistIds.includes(p.id)), [wishlistIds]);
  
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const newArrivals = useMemo(() => [...PRODUCTS].slice(-4).reverse(), []);

  const skincareFilterOptions: ('All' | 'Skincare' | 'Serums' | 'Masks')[] = ['All', 'Skincare', 'Serums', 'Masks'];

  return (
    <div className="min-h-screen flex flex-col bg-blonde-light">
      <Navbar 
        user={user} 
        cartItems={cart} 
        wishlistCount={wishlistIds.length}
        currentView={currentView}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onViewChange={handleViewChange}
        onOpenCart={() => setIsCartOpen(true)}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-1000">
            <Hero />
            
            {/* Essentials Section */}
            <section className="container mx-auto px-6 py-28 reveal-on-scroll">
              <div className="text-center mb-20 space-y-4">
                <span className="text-burgundy-light font-bold tracking-[0.5em] uppercase text-xs">The Essence of Velvet</span>
                <h2 className="text-5xl md:text-6xl font-serif text-burgundy italic">Everyday Essentials</h2>
                <div className="w-24 h-px bg-burgundy/10 mx-auto mt-6"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
                {PRODUCTS.slice(0, 3).map((product, idx) => (
                  <div 
                    key={product.id} 
                    className="reveal-on-scroll" 
                    style={{ transitionDelay: `${idx * 200}ms` }}
                  >
                    <ProductCard 
                      product={product} 
                      onAddToCart={(p) => addToCart(p, 1)} 
                      onViewDetails={handleViewProduct} 
                      isWishlisted={wishlistIds.includes(product.id)}
                      onToggleWishlist={toggleWishlist}
                    />
                  </div>
                ))}
              </div>
            </section>

            <div className="reveal-on-scroll">
              <NewArrivalsCarousel 
                products={newArrivals} 
                onAddToCart={(p) => addToCart(p, 1)} 
                onViewDetails={handleViewProduct} 
              />
            </div>

            {/* Newsletter / Club Section */}
            <section className="bg-burgundy py-32 text-blonde relative overflow-hidden reveal-on-scroll">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blonde/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blonde/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              
              <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
                <span className="text-blonde-dark font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Private Invitation</span>
                <h3 className="text-5xl md:text-6xl font-serif italic mb-8">Join the Botanical Collective</h3>
                <p className="text-blonde/60 mb-12 leading-relaxed text-xl max-w-2xl mx-auto">
                  Subscribe for complimentary access to small-batch seasonal drops and our "Radiance" digital journal.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubscribe}>
                  <input 
                    required
                    type="email" 
                    name="email"
                    placeholder="E.g. isabella@velvet.com" 
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-5 focus:outline-none focus:ring-2 focus:ring-blonde-dark/50 transition-all text-blonde placeholder-blonde/20"
                  />
                  <button type="submit" className="bg-blonde text-burgundy px-12 py-5 rounded-full font-bold hover:bg-blonde-dark transition-all shadow-2xl uppercase tracking-widest text-xs">
                    Join Now
                  </button>
                </form>
              </div>
            </section>
          </div>
        )}

        {currentView === 'skincare' && (
          <section className="container mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
             <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
                <div>
                   <span className="text-burgundy-light font-bold tracking-[0.4em] uppercase text-xs">Collection</span>
                   <h1 className="text-6xl font-serif text-burgundy italic mb-4">Botanical Skincare</h1>
                   <p className="text-burgundy/60 max-w-2xl text-lg">Harnessing the restorative power of nature for a ritual that transforms the skin and calms the soul.</p>
                </div>
                {/* Filter Dropdown/Pills */}
                <div className="flex flex-wrap gap-3">
                  {skincareFilterOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => setSkincareFilter(option)}
                      className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                        skincareFilter === option 
                          ? 'bg-burgundy text-blonde border-burgundy shadow-lg' 
                          : 'bg-white text-burgundy/40 border-burgundy/10 hover:border-burgundy/30 hover:text-burgundy'
                      }`}
                    >
                      {option === 'Skincare' ? 'Essentials' : option}
                    </button>
                  ))}
                </div>
             </div>
             
             {skincareProducts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                 {skincareProducts.map((product, idx) => (
                   <div 
                     key={`${product.id}-${skincareFilter}`} 
                     className="animate-in fade-in slide-in-from-bottom-10 fill-mode-both"
                     style={{ animationDelay: `${idx * 150}ms`, animationDuration: '800ms' }}
                   >
                     <ProductCard 
                       product={product} 
                       onAddToCart={(p) => addToCart(p, 1)} 
                       onViewDetails={handleViewProduct} 
                       isWishlisted={wishlistIds.includes(product.id)}
                       onToggleWishlist={toggleWishlist}
                     />
                   </div>
                 ))}
               </div>
             ) : (
               <div className="py-32 text-center animate-in fade-in">
                  <p className="text-burgundy/40 italic text-lg">No products found in this sub-category.</p>
               </div>
             )}
          </section>
        )}

        {currentView === 'lipcare' && (
          <section className="container mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
             <div className="mb-16">
                <span className="text-burgundy-light font-bold tracking-[0.4em] uppercase text-xs">Collection</span>
                <h1 className="text-6xl font-serif text-burgundy italic mb-4">Luxury Lipcare</h1>
                <p className="text-burgundy/60 max-w-2xl text-lg">From restorative overnight masks to sheer botanical tints, every sweep is a moment of pure hydration.</p>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
               {lipcareProducts.map((product, idx) => (
                 <div 
                  key={product.id}
                  className="animate-in fade-in slide-in-from-bottom-10 fill-mode-both"
                  style={{ animationDelay: `${idx * 150}ms`, animationDuration: '800ms' }}
                 >
                   <ProductCard 
                    product={product} 
                    onAddToCart={(p) => addToCart(p, 1)} 
                    onViewDetails={handleViewProduct} 
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={toggleWishlist}
                   />
                 </div>
               ))}
             </div>
          </section>
        )}

        {currentView === 'wishlist' && (
          <WishlistPage 
            items={wishlistedProducts}
            wishlistIds={wishlistIds}
            onAddToCart={(p) => addToCart(p, 1)}
            onViewDetails={handleViewProduct}
            onToggleWishlist={toggleWishlist}
            onExplore={() => handleViewChange('skincare')}
          />
        )}

        {currentView === 'account' && (
          <AccountPage 
            user={user} 
            onLogout={handleLogout} 
            onViewChange={handleViewChange} 
          />
        )}

        {currentView === 'search' && (
          <section className="container mx-auto px-6 py-24 animate-in fade-in duration-500 min-h-[70vh]">
             <div className="mb-16">
                <h1 className="text-4xl font-serif text-burgundy mb-2">Search Results</h1>
                <p className="text-burgundy/60">
                  {searchResults.length > 0 
                    ? `Found ${searchResults.length} matches for "${searchQuery}"`
                    : `No matches for "${searchQuery}"`}
                </p>
             </div>

             {searchResults.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                 {searchResults.map(product => (
                   <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={(p) => addToCart(p, 1)} 
                    onViewDetails={handleViewProduct} 
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={toggleWishlist}
                   />
                 ))}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center py-24 text-center">
                 <div className="w-24 h-24 bg-blonde rounded-full flex items-center justify-center mb-8 shadow-inner">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-burgundy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                 </div>
                 <h2 className="text-3xl font-serif text-burgundy mb-4 italic">Alas, no matches found.</h2>
                 <p className="text-burgundy/60 max-w-md mb-12">
                   We couldn't find any botanical essentials matching your query. May we suggest exploring our signature collections instead?
                 </p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
                    <button 
                      onClick={() => handleViewChange('skincare')}
                      className="group p-8 bg-white border border-burgundy/5 rounded-3xl hover:border-burgundy/20 hover:shadow-2xl transition-all text-left"
                    >
                      <h3 className="font-serif text-2xl text-burgundy mb-2 group-hover:italic transition-all">Skincare</h3>
                      <p className="text-sm text-burgundy/50 mb-6 leading-relaxed">Discover cleansers, serums, and masks for a radiant, balanced complexion.</p>
                      <span className="text-xs font-bold uppercase tracking-widest text-burgundy-light group-hover:translate-x-1 transition-transform inline-block">Explore Collection →</span>
                    </button>
                    
                    <button 
                      onClick={() => handleViewChange('lipcare')}
                      className="group p-8 bg-white border border-burgundy/5 rounded-3xl hover:border-burgundy/20 hover:shadow-2xl transition-all text-left"
                    >
                      <h3 className="font-serif text-2xl text-burgundy mb-2 group-hover:italic transition-all">Lipcare</h3>
                      <p className="text-sm text-burgundy/50 mb-6 leading-relaxed">Hydrating tints and restorative masks crafted for perfection.</p>
                      <span className="text-xs font-bold uppercase tracking-widest text-burgundy-light group-hover:translate-x-1 transition-transform inline-block">Explore Collection →</span>
                    </button>
                 </div>
               </div>
             )}
          </section>
        )}

        {currentView === 'newsletter-success' && (
          <NewsletterSuccessPage 
            email={subscribedEmail} 
            onContinue={() => handleViewChange('home')} 
          />
        )}

        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'shipping' && <ShippingPage />}
        {currentView === 'faq' && <FAQPage />}
        {currentView === 'checkout' && <CheckoutPage cartItems={cart} onComplete={handleCheckoutComplete} />}

        {currentView === 'product' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onAddToCart={addToCart} 
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={toggleWishlist}
          />
        )}
      </main>

      <footer className="bg-burgundy-dark text-blonde/40 py-20 px-6 border-t border-blonde/10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-1">
             <div className="text-blonde text-3xl font-serif font-bold mb-6 italic">Velvet & Vine</div>
             <p className="text-sm leading-relaxed max-w-xs mb-8">
               Elevating your daily self-care rituals with the finest botanical ingredients and elegant, scientifically-proven formulations.
             </p>
             <p className="text-[10px] uppercase tracking-widest text-blonde/20">© 2024 Velvet & Vine Atelier. All rights reserved.</p>
          </div>
          <div>
            <h4 className="text-blonde uppercase tracking-widest text-xs font-bold mb-8">Collections</h4>
            <ul className="space-y-5 text-sm">
              <li><button onClick={() => handleViewChange('skincare')} className="hover:text-blonde transition-colors">Skincare Essentials</button></li>
              <li><button onClick={() => handleViewChange('lipcare')} className="hover:text-blonde transition-colors">Lipcare Treatments</button></li>
              <li><button onClick={() => handleViewChange('about')} className="hover:text-blonde transition-colors">The Philosophy</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-blonde uppercase tracking-widest text-xs font-bold mb-8">Boutique Concierge</h4>
            <ul className="space-y-5 text-sm">
              <li><button onClick={() => handleViewChange('shipping')} className="hover:text-blonde transition-colors text-left">Shipping & Returns</button></li>
              <li><button onClick={() => handleViewChange('faq')} className="hover:text-blonde transition-colors text-left">The Inquiry Bureau</button></li>
              <li><button onClick={() => handleViewChange('contact')} className="hover:text-blonde transition-colors text-left">Connect with Us</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-blonde uppercase tracking-widest text-xs font-bold mb-8">Social Gallery</h4>
            <div className="flex space-x-6">
               <a href="#" className="w-12 h-12 border border-blonde/10 rounded-full flex items-center justify-center hover:bg-blonde hover:text-burgundy transition-all transform hover:-translate-y-1">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
               </a>
               <a href="#" className="w-12 h-12 border border-blonde/10 rounded-full flex items-center justify-center hover:bg-blonde hover:text-burgundy transition-all transform hover:-translate-y-1">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
               </a>
               <a href="#" className="w-12 h-12 border border-blonde/10 rounded-full flex items-center justify-center hover:bg-blonde hover:text-burgundy transition-all transform hover:-translate-y-1">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
               </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} onLogin={handleLogin} />}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onCheckout={() => { setIsCartOpen(false); handleViewChange('checkout'); }}
      />
    </div>
  );
};

export default App;
