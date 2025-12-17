
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onComplete: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, onComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 8;
  const total = subtotal + shipping;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsFinished(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 2000);
  };

  if (isFinished) {
    return (
      <div className="container mx-auto px-6 py-32 text-center animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-blonde text-burgundy rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-burgundy/5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-5xl font-serif text-burgundy italic mb-4">Order Confirmed</h1>
        <p className="text-burgundy/60 max-w-md mx-auto leading-relaxed">
          Thank you for choosing Velvet & Vine. Your botanical essentials are being prepared at our New York atelier. A confirmation email has been sent to your address.
        </p>
        <div className="mt-12 text-xs uppercase tracking-widest text-burgundy/30">Redirecting to home...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h1 className="text-5xl font-serif text-burgundy italic">Checkout</h1>
        <p className="text-burgundy/60 mt-2 uppercase tracking-[0.2em] text-xs font-bold">Secure Order Processing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Forms Side */}
        <div className="lg:col-span-7">
          <form onSubmit={handleCheckout} className="space-y-12">
            {/* Shipping Info */}
            <section className="space-y-6">
              <h2 className="text-2xl font-serif text-burgundy border-b border-burgundy/5 pb-4">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-burgundy/40">First Name</label>
                  <input required type="text" className="w-full bg-white border border-burgundy/10 rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-burgundy/20" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-burgundy/40">Last Name</label>
                  <input required type="text" className="w-full bg-white border border-burgundy/10 rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-burgundy/20" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-burgundy/40">Street Address</label>
                <input required type="text" className="w-full bg-white border border-burgundy/10 rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-burgundy/20" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-burgundy/40">City</label>
                  <input required type="text" className="w-full bg-white border border-burgundy/10 rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-burgundy/20" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-burgundy/40">Country</label>
                  <input required type="text" className="w-full bg-white border border-burgundy/10 rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-burgundy/20" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-burgundy/40">Postal Code</label>
                  <input required type="text" className="w-full bg-white border border-burgundy/10 rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-burgundy/20" />
                </div>
              </div>
            </section>

            {/* Payment Info */}
            <section className="space-y-6">
              <h2 className="text-2xl font-serif text-burgundy border-b border-burgundy/5 pb-4">Payment Method</h2>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-burgundy/40">Card Number</label>
                <div className="relative">
                  <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white border border-burgundy/10 rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-burgundy/20" />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
                    <div className="w-6 h-4 bg-gray-200 rounded"></div>
                    <div className="w-6 h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-burgundy/40">Expiry Date</label>
                  <input required type="text" placeholder="MM/YY" className="w-full bg-white border border-burgundy/10 rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-burgundy/20" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-burgundy/40">CVV</label>
                  <input required type="text" placeholder="123" className="w-full bg-white border border-burgundy/10 rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-burgundy/20" />
                </div>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full py-6 rounded-full font-bold shadow-2xl transition-all transform active:scale-[0.98] text-sm uppercase tracking-widest flex items-center justify-center space-x-3 ${
                isProcessing ? 'bg-burgundy/60 text-blonde cursor-wait' : 'bg-burgundy text-blonde hover:bg-burgundy-dark'
              }`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-blonde" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Complete Purchase — ${total.toFixed(2)}</span>
              )}
            </button>
          </form>
        </div>

        {/* Summary Side */}
        <div className="lg:col-span-5">
          <div className="bg-blonde p-8 md:p-10 rounded-3xl sticky top-32 border border-burgundy/5 space-y-8">
            <h2 className="text-2xl font-serif text-burgundy italic">Order Summary</h2>
            
            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-xl shadow-sm border border-burgundy/5" />
                      <span className="absolute -top-2 -right-2 bg-burgundy text-blonde text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{item.quantity}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-burgundy">{item.name}</h4>
                      <p className="text-[10px] text-burgundy/40 uppercase tracking-widest">{item.category}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-burgundy">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-burgundy/10">
              <div className="flex justify-between text-sm">
                <span className="text-burgundy/60">Subtotal</span>
                <span className="font-medium text-burgundy">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-burgundy/60">Boutique Shipping</span>
                <span className="font-medium text-burgundy">{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-xl font-serif pt-4 text-burgundy border-t border-burgundy/5">
                <span>Total</span>
                <span className="italic">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-white/50 p-4 rounded-xl border border-dashed border-burgundy/10 flex items-start space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-burgundy/30 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[10px] text-burgundy/50 leading-relaxed italic">
                Your payment is processed through a secure, encrypted connection. We do not store full credit card numbers on our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
