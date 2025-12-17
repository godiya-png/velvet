
import React, { useState } from 'react';

const FAQ_DATA = [
  {
    category: 'Products',
    items: [
      { q: "Are Velvet & Vine products tested on animals?", a: "Never. We are proudly Leaping Bunny certified. Our commitment to botanical beauty means respecting all living creatures." },
      { q: "What is the shelf life of your botanical formulas?", a: "Since we use natural preservatives, our products are best used within 12 months of opening. Each bottle features a Period After Opening (PAO) symbol." },
      { q: "Are your products safe for sensitive skin?", a: "Yes, our 'Velvet Rose' range is specifically formulated for delicate complexions. However, we always recommend a patch test before full application." }
    ]
  },
  {
    category: 'Sustainability',
    items: [
      { q: "Is your packaging recyclable?", a: "95% of our packaging is glass and infinitely recyclable. We avoid plastic wherever possible and use soy-based inks for all printing." },
      { q: "Do you offer refills?", a: "We are currently piloting a refill program for our Silk Peony Moisturizer in select markets. Stay tuned for a wider rollout in late 2024." }
    ]
  },
  {
    category: 'Orders & Account',
    items: [
      { q: "Can I change my order after it's placed?", a: "We process orders swiftly to ensure fast delivery. You have a 30-minute window to contact our concierge for any modifications." },
      { q: "Do you offer gift wrapping?", a: "Every order arrives in our signature burgundy gift box. You can add a personalized handwritten note at checkout." }
    ]
  }
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="bg-blonde-dark/10 py-24 border-b border-burgundy/5">
        <h1 className="text-6xl md:text-8xl font-serif text-burgundy text-center">Inquiry Bureau</h1>
        <p className="text-center text-burgundy/60 mt-4 uppercase tracking-[0.2em] text-sm">Frequently Asked Questions</p>
      </div>

      <div className="container mx-auto px-6 py-20 max-w-3xl">
        <div className="space-y-16">
          {FAQ_DATA.map((section, sIdx) => (
            <div key={section.category} className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-burgundy-light border-b border-burgundy/10 pb-4">{section.category}</h2>
              <div className="space-y-2">
                {section.items.map((item, iIdx) => {
                  const id = `${sIdx}-${iIdx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div key={id} className="border-b border-burgundy/5 last:border-0">
                      <button 
                        onClick={() => toggle(id)}
                        className="w-full py-6 flex justify-between items-center text-left hover:text-burgundy-light transition-colors group"
                      >
                        <span className="text-xl font-serif text-burgundy group-hover:italic">{item.q}</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                        <p className="text-burgundy/60 leading-relaxed italic pr-12">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-burgundy rounded-3xl text-center text-blonde space-y-6">
          <h3 className="text-3xl font-serif">Still have questions?</h3>
          <p className="text-blonde/70">Our concierge collective is standing by to assist with your journey.</p>
          <button className="bg-blonde text-burgundy px-10 py-3 rounded-xl font-bold hover:bg-blonde-dark transition-all">
            Contact Concierge
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
