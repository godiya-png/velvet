
import React, { useState } from 'react';
import { User, CartItem, AppView } from '../types';

interface NavbarProps {
  user: User | null;
  cartItems: CartItem[];
  currentView: AppView;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onViewChange: (view: AppView) => void;
  onOpenCart: () => void;
  onLogout: () => void;
  onOpenAuth: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  cartItems, 
  currentView, 
  searchQuery,
  onSearchChange,
  onViewChange, 
  onOpenCart, 
  onLogout, 
  onOpenAuth 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleMobileNavClick = (view: AppView) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', view: 'home' as AppView },
    { label: 'Skincare', view: 'skincare' as AppView },
    { label: 'Lipcare', view: 'lipcare' as AppView },
    { label: 'About', view: 'about' as AppView },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-burgundy text-blonde px-4 sm:px-6 py-4 shadow-xl flex items-center justify-between gap-4">
        {/* Hamburger Menu Icon - Only Mobile */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden p-2 -ml-2 hover:text-blonde-dark transition-colors"
          aria-label="Open navigation menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer flex-shrink-0" onClick={() => onViewChange('home')}>
          <div className="w-10 h-10 bg-blonde-dark rounded-full flex items-center justify-center text-burgundy font-bold text-xl">V</div>
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight hidden lg:block">Velvet & Vine</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 text-xs sm:text-sm uppercase tracking-widest font-medium flex-shrink-0">
          {navLinks.map((link) => (
            <button 
              key={link.view}
              onClick={() => onViewChange(link.view)} 
              className={`transition-colors ${currentView === link.view ? 'text-blonde-dark underline underline-offset-8' : 'hover:text-blonde-dark'}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs sm:max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blonde/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInput}
            placeholder="Search essentials..."
            className="w-full bg-burgundy-dark/50 border border-blonde/10 rounded-full py-2 pl-10 pr-4 text-sm text-blonde placeholder-blonde/30 focus:outline-none focus:ring-1 focus:ring-blonde-dark/50 transition-all"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3 sm:space-x-6 flex-shrink-0">
          <div className="relative cursor-pointer group" onClick={onOpenCart}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-blonde-dark transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blonde-dark text-burgundy text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-burgundy">
                {totalItems}
              </span>
            )}
          </div>

          {user ? (
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Hi, {user.firstName}</span>
              <button 
                onClick={onLogout}
                className="text-[10px] sm:text-xs uppercase tracking-tighter bg-blonde text-burgundy px-2 sm:px-3 py-1 rounded hover:bg-blonde-dark transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="flex items-center space-x-1 group hover:text-blonde-dark transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-medium hidden sm:inline">Login</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-burgundy-dark/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer Content */}
          <div className="absolute left-0 top-0 bottom-0 w-4/5 max-w-xs bg-blonde shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-burgundy/10 flex justify-between items-center bg-burgundy text-blonde">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blonde-dark rounded-full flex items-center justify-center text-burgundy font-bold text-lg">V</div>
                <span className="font-serif font-bold tracking-tight">Velvet & Vine</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blonde-dark transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 py-8 px-6 space-y-6 flex flex-col">
              {navLinks.map((link) => (
                <button 
                  key={link.view}
                  onClick={() => handleMobileNavClick(link.view)}
                  className={`text-xl font-serif text-left pb-2 border-b border-burgundy/5 transition-colors ${currentView === link.view ? 'text-burgundy font-bold' : 'text-burgundy/60'}`}
                >
                  {link.label}
                </button>
              ))}
              
              <div className="mt-auto space-y-4">
                {!user ? (
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); onOpenAuth(); }}
                    className="w-full bg-burgundy text-blonde py-3 rounded font-bold"
                  >
                    Login / Register
                  </button>
                ) : (
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); onLogout(); }}
                    className="w-full border border-burgundy text-burgundy py-3 rounded font-bold"
                  >
                    Logout
                  </button>
                )}
                <p className="text-center text-[10px] uppercase tracking-widest text-burgundy/40">Luxury Skincare Collective</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
