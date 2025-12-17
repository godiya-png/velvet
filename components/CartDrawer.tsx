
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-burgundy-dark/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-blonde-light shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-burgundy/10 flex justify-between items-center bg-burgundy text-blonde">
          <h2 className="text-xl font-serif font-bold">Shopping Bag ({items.length})</h2>
          <button onClick={onClose} className="hover:text-blonde-dark">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-burgundy/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-burgundy/60 italic">Your bag is currently empty.</p>
              <button onClick={onClose} className="bg-burgundy text-blonde px-6 py-2 rounded">Start Shopping</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex space-x-4 border-b border-burgundy/5 pb-6">
                <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded shadow" />
                <div className="flex-1">
                  <h3 className="font-bold text-burgundy">{item.name}</h3>
                  <p className="text-xs text-burgundy/60 mb-2">{item.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-burgundy/10 rounded overflow-hidden">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-3 py-1 bg-white hover:bg-blonde transition-colors">-</button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-3 py-1 bg-white hover:bg-blonde transition-colors">+</button>
                    </div>
                    <span className="font-bold">${item.price * item.quantity}</span>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-[10px] uppercase text-red-700 mt-2 hover:underline">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-burgundy/10 bg-white space-y-4">
            <div className="flex justify-between text-lg font-bold text-burgundy">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-burgundy/60">Shipping and taxes calculated at checkout.</p>
            <button 
              onClick={onCheckout}
              className="w-full bg-burgundy text-blonde py-4 font-bold rounded shadow-lg hover:bg-burgundy-dark transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
