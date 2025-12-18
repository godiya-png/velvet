
import React, { useEffect } from 'react';

interface NewsletterSuccessPageProps {
  email: string;
  onContinue: () => void;
}

const NewsletterSuccessPage: React.FC<NewsletterSuccessPageProps> = ({ email, onContinue }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full bg-white rounded-[40px] shadow-2xl border border-burgundy/5 overflow-hidden animate-in fade-in zoom-in duration-1000">
        <div className="relative h-64 overflow-hidden">
          <img 
            src="https://i.pinimg.com/1200x/a5/6c/3a/a56c3a0f4824ebb3a315ef723d02be53.jpg" 
            alt="Botanical Header" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-burgundy/20 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-blonde rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="p-10 md:p-16 text-center space-y-8">
          <div className="space-y-4">
            <span className="text-burgundy-light font-bold tracking-[0.5em] uppercase text-xs">Welcome to the Collective</span>
            <h1 className="text-5xl font-serif text-burgundy italic">You're In, Isabella.</h1>
            <p className="text-burgundy/60 text-lg leading-relaxed max-w-lg mx-auto">
              We've added <span className="text-burgundy font-medium">{email}</span> to our private registry. Expect a curated selection of botanical insights and first-access to our small-batch drops soon.
            </p>
          </div>

          <div className="bg-blonde/50 border border-dashed border-burgundy/20 p-8 rounded-3xl space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
            <p className="text-xs uppercase tracking-widest text-burgundy/40 font-bold">Your Welcome Gift</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="text-4xl font-serif text-burgundy italic">15% OFF</div>
              <div className="px-6 py-3 bg-white border border-burgundy/10 rounded-full font-mono text-burgundy font-bold tracking-widest text-xl shadow-inner">
                BOTANICAL15
              </div>
            </div>
            <p className="text-[10px] text-burgundy/30 uppercase">Apply at checkout on your first artisanal order</p>
          </div>

          <div className="pt-4">
            <button 
              onClick={onContinue}
              className="bg-burgundy text-blonde px-12 py-5 rounded-full font-bold hover:bg-burgundy-dark transition-all shadow-2xl uppercase tracking-widest text-xs transform hover:-translate-y-1 active:scale-95"
            >
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSuccessPage;
