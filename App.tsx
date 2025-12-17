
import React, { useState, useEffect, useMemo } from 'react';
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
import NewArrivalsCarousel from './components/NewArrivalsCarousel';

const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Data State
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('vv_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('vv_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persistence
  useEffect(() => {
    if (user) localStorage.setItem('vv_user', JSON.stringify(user));
    else localStorage.removeItem('vv_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vv_cart', JSON.stringify(cart));
  }, [cart]);

  // Handlers
  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleViewChange = (view: AppView) => {
    setCurrentView(view);
    setSelectedProduct(null);
    setSearchQuery(''); // Clear search when navigating normally
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

  // Memos for filtering
  const skincareProducts = useMemo(() => PRODUCTS.filter(p => p.category === 'Skincare' || p.category === 'Serums' || p.category === 'Masks'), []);
  const lipcareProducts = useMemo(() => PRODUCTS.filter(p => p.category === 'Lipcare'), []);
  
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // New arrivals (last 4 products in catalog)
  const newArrivals = useMemo(() => [...PRODUCTS].slice(-4).reverse(), []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={user} 
        cartItems={cart} 
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
          <>
            <Hero />
            <section className="container mx-auto px-6 py-20">
              <h2 className="text-4xl font-serif text-burgundy mb-12 text-center">The Essentials</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {PRODUCTS.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={(p) => addToCart(p, 1)} onViewDetails={handleViewProduct} />
                ))}
              </div>
            </section>

            <NewArrivalsCarousel 
              products={newArrivals} 
              onAddToCart={(p) => addToCart(p, 1)} 
              onViewDetails={handleViewProduct} 
            />

            <section className="container mx-auto px-6 py-20">
              <div className="text-center">
                 <button onClick={() => handleViewChange('skincare')} className="text-burgundy font-bold uppercase tracking-widest border-b-2 border-burgundy pb-1 hover:text-burgundy-light hover:border-burgundy-light transition-all">
                   Shop All Collections
                 </button>
              </div>
            </section>
          </>
        )}

        {currentView === 'skincare' && (
          <section className="container mx-auto px-6 py-20 animate-in fade-in duration-500">
             <div className="mb-12">
                <h1 className="text-5xl font-serif text-burgundy mb-4">Skincare Collection</h1>
                <p className="text-burgundy/60 max-w-2xl">From powerful serums to soothing cleansers, discover the formulas that will transform your skin's health.</p>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {skincareProducts.map(product => (
                 <ProductCard key={product.id} product={product} onAddToCart={(p) => addToCart(p, 1)} onViewDetails={handleViewProduct} />
               ))}
             </div>
          </section>
        )}

        {currentView === 'lipcare' && (
          <section className="container mx-auto px-6 py-20 animate-in fade-in duration-500">
             <div className="mb-12">
                <h1 className="text-5xl font-serif text-burgundy mb-4">Lipcare Essentials</h1>
                <p className="text-burgundy/60 max-w-2xl">Exfoliate, hydrate, and tint with our curated range of luxury lip treatments.</p>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {lipcareProducts.map(product => (
                 <ProductCard key={product.id} product={product} onAddToCart={(p) => addToCart(p, 1)} onViewDetails={handleViewProduct} />
               ))}
             </div>
          </section>
        )}

        {currentView === 'search' && (
          <section className="container mx-auto px-6 py-20 animate-in fade-in duration-500 min-h-[70vh]">
             <div className="mb-12">
                <h1 className="text-4xl font-serif text-burgundy mb-2">Search Results</h1>
                <p className="text-burgundy/60">
                  {searchResults.length > 0 
                    ? `We found ${searchResults.length} essentials matching "${searchQuery}"`
                    : `No matches found for "${searchQuery}"`}
                </p>
             </div>

             {searchResults.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {searchResults.map(product => (
                   <ProductCard key={product.id} product={product} onAddToCart={(p) => addToCart(p, 1)} onViewDetails={handleViewProduct} />
                 ))}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center py-24 text-center">
                 <div className="w-24 h-24 bg-blonde rounded-full flex items-center justify-center mb-8">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-burgundy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                 </div>
                 <h2 className="text-3xl font-serif text-burgundy mb-4 italic">Alas, no matches.</h2>
                 <p className="text-burgundy/60 max-w-md mb-12">
                   We couldn't find any botanical essentials matching your query. May we suggest exploring our signature collections instead?
                 </p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
                    <button 
                      onClick={() => handleViewChange('skincare')}
                      className="group p-8 bg-white border border-burgundy/5 rounded-2xl hover:border-burgundy/20 hover:shadow-xl transition-all text-left"
                    >
                      <h3 className="font-serif text-xl text-burgundy mb-2 group-hover:italic">Skincare</h3>
                      <p className="text-sm text-burgundy/50 mb-4 leading-relaxed">Discover cleansers, serums, and masks for a radiant complexion.</p>
                      <span className="text-xs font-bold uppercase tracking-widest text-burgundy-light group-hover:translate-x-1 transition-transform inline-block">Explore →</span>
                    </button>
                    
                    <button 
                      onClick={() => handleViewChange('lipcare')}
                      className="group p-8 bg-white border border-burgundy/5 rounded-2xl hover:border-burgundy/20 hover:shadow-xl transition-all text-left"
                    >
                      <h3 className="font-serif text-xl text-burgundy mb-2 group-hover:italic">Lipcare</h3>
                      <p className="text-sm text-burgundy/50 mb-4 leading-relaxed">Hydrating tints and restorative masks for perfect lips.</p>
                      <span className="text-xs font-bold uppercase tracking-widest text-burgundy-light group-hover:translate-x-1 transition-transform inline-block">Explore →</span>
                    </button>
                 </div>

                 <div className="mt-16">
                    <button 
                      onClick={() => handleViewChange('home')}
                      className="text-burgundy/40 text-sm uppercase tracking-widest hover:text-burgundy transition-colors"
                    >
                      Return to Homepage
                    </button>
                 </div>
               </div>
             )}
          </section>
        )}

        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'shipping' && <ShippingPage />}
        {currentView === 'faq' && <FAQPage />}

        {currentView === 'product' && selectedProduct && (
          <ProductDetail product={selectedProduct} onAddToCart={addToCart} />
        )}
      </main>

      <footer className="bg-burgundy-dark text-blonde/40 py-12 px-6 border-t border-blonde/10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
             <div className="text-blonde text-2xl font-serif font-bold mb-4">Velvet & Vine</div>
             <p className="text-sm leading-relaxed max-w-xs">Elevating your daily self-care rituals with the finest botanical ingredients and elegant formulations.</p>
          </div>
          <div>
            <h4 className="text-blonde uppercase tracking-widest text-xs font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-left">
              <li><button onClick={() => handleViewChange('skincare')} className="hover:text-blonde transition-colors">Skincare</button></li>
              <li><button onClick={() => handleViewChange('lipcare')} className="hover:text-blonde transition-colors">Lipcare</button></li>
              <li><button onClick={() => handleViewChange('about')} className="hover:text-blonde transition-colors">Our Story</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-blonde uppercase tracking-widest text-xs font-bold mb-6">Customer Care</h4>
            <ul className="space-y-4 text-sm text-left">
              <li><button onClick={() => handleViewChange('shipping')} className="hover:text-blonde transition-colors text-left">Shipping & Returns</button></li>
              <li><button onClick={() => handleViewChange('faq')} className="hover:text-blonde transition-colors text-left">FAQ</button></li>
              <li><button onClick={() => handleViewChange('contact')} className="hover:text-blonde transition-colors text-left">Contact Us</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-blonde uppercase tracking-widest text-xs font-bold mb-6">Social</h4>
            <div className="flex space-x-4">
               <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Instagram"
                className="w-10 h-10 border border-blonde/20 rounded-full flex items-center justify-center hover:bg-blonde hover:text-burgundy transition-all cursor-pointer"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
               </a>
               <a 
                href="https://www.tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on TikTok"
                className="w-10 h-10 border border-blonde/20 rounded-full flex items-center justify-center hover:bg-blonde hover:text-burgundy transition-all cursor-pointer"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
               </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} onLogin={handleLogin} />}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default App;
