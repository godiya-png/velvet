
import React from 'react';
import { User } from '../types';

interface AccountPageProps {
  user: User | null;
  onLogout: () => void;
  onViewChange: (view: any) => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ user, onLogout, onViewChange }) => {
  if (!user) {
    return (
      <div className="container mx-auto px-6 py-32 text-center animate-in fade-in duration-700">
        <h2 className="text-4xl font-serif text-burgundy italic mb-6">Session Ended</h2>
        <p className="text-burgundy/60 mb-12">Please sign in to access your botanical registry.</p>
        <button 
          onClick={() => onViewChange('home')}
          className="bg-burgundy text-blonde px-12 py-4 rounded-full font-bold hover:bg-burgundy-dark transition-all shadow-lg"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 border-b border-burgundy/10 pb-12">
          <span className="text-burgundy-light font-bold tracking-[0.4em] uppercase text-xs">Atelier Member</span>
          <h1 className="text-6xl font-serif text-burgundy italic mb-4">Welcome, {user.firstName}</h1>
          <p className="text-burgundy/60 text-lg italic">Your personal sanctuary for skincare rituals and curated favorites.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Profile Details */}
          <div className="md:col-span-2 space-y-12">
            <section className="bg-white p-10 rounded-[32px] border border-burgundy/5 shadow-sm">
              <h2 className="text-2xl font-serif text-burgundy mb-8">Registry Information</h2>
              <div className="space-y-6">
                <div className="flex justify-between border-b border-burgundy/5 pb-4">
                  <span className="text-xs uppercase tracking-widest text-burgundy/40 font-bold">Full Name</span>
                  <span className="text-burgundy font-medium">{user.firstName} {user.lastName}</span>
                </div>
                <div className="flex justify-between border-b border-burgundy/5 pb-4">
                  <span className="text-xs uppercase tracking-widest text-burgundy/40 font-bold">Email Address</span>
                  <span className="text-burgundy font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between border-b border-burgundy/5 pb-4">
                  <span className="text-xs uppercase tracking-widest text-burgundy/40 font-bold">Membership</span>
                  <span className="text-burgundy font-medium italic">Botanical Collective Elite</span>
                </div>
              </div>
            </section>

            <section className="bg-blonde/30 p-10 rounded-[32px] border border-burgundy/5">
              <h2 className="text-2xl font-serif text-burgundy mb-4">Order History</h2>
              <p className="text-burgundy/40 italic">You haven't placed any artisanal orders yet. Your future rituals will appear here.</p>
            </section>
          </div>

          {/* Logout Section */}
          <div className="md:col-span-1">
            <div className="bg-burgundy text-blonde p-10 rounded-[32px] shadow-2xl sticky top-32 space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-serif italic">Logout Section</h3>
                <p className="text-blonde/60 text-sm leading-relaxed">
                  Safely end your current session. We'll keep your wishlist and preferences saved for your next visit to the atelier.
                </p>
              </div>
              
              <div className="pt-4">
                <button 
                  onClick={onLogout}
                  className="w-full bg-blonde text-burgundy py-4 rounded-full font-bold hover:bg-blonde-dark transition-all transform active:scale-95 shadow-lg uppercase tracking-widest text-xs"
                >
                  Secure Logout
                </button>
              </div>

              <div className="pt-6 border-t border-blonde/10 text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] text-blonde/30">
                  Velvet & Vine Boutique Privacy Protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
