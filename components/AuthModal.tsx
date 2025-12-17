
import React, { useState } from 'react';
import { User } from '../types';

interface AuthModalProps {
  onLogin: (user: User) => void;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onLogin, onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      firstName: isLoginView ? (formData.email.split('@')[0] || 'Guest') : formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    };
    onLogin(newUser);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-burgundy-dark/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-blonde w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-burgundy p-8 text-center">
          <h2 className="text-3xl font-serif text-blonde mb-2">{isLoginView ? 'Welcome Back' : 'Join the Collective'}</h2>
          <p className="text-blonde/60 text-sm">Experience the luxury of botanical care.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {!isLoginView && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-burgundy-light">First Name</label>
                <input 
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  type="text" 
                  className="w-full bg-white border border-burgundy/10 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-burgundy/20"
                  placeholder="Jane"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-burgundy-light">Last Name</label>
                <input 
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  type="text" 
                  className="w-full bg-white border border-burgundy/10 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-burgundy/20"
                  placeholder="Doe"
                />
              </div>
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-burgundy-light">Email Address</label>
            <input 
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email" 
              className="w-full bg-white border border-burgundy/10 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-burgundy/20"
              placeholder="hello@example.com"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-burgundy-light">Password</label>
            <input 
              required
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type="password" 
              className="w-full bg-white border border-burgundy/10 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-burgundy/20"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full bg-burgundy text-blonde font-bold py-3 rounded hover:bg-burgundy-dark transition-all mt-4">
            {isLoginView ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center pt-4">
            <button 
              type="button"
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-sm text-burgundy hover:underline"
            >
              {isLoginView ? "Don't have an account? Create one" : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
        <button onClick={onClose} className="absolute top-4 right-4 text-blonde/40 hover:text-blonde">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
           </svg>
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
