
import React from 'react';

const ShippingPage: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-burgundy py-24 text-center">
        <h1 className="text-6xl md:text-8xl font-serif text-blonde italic">Shipping & Returns</h1>
      </div>

      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="space-y-16">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif text-burgundy">Shipping Philosophy</h2>
            <p className="text-lg text-burgundy/70 leading-relaxed">
              At Velvet & Vine, we believe the luxury experience begins the moment you place your order. Each package is prepared with meticulous care, wrapped in sustainable silk-touch paper, and shipped from our New York atelier.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-12">
            <section className="bg-blonde p-8 rounded-2xl space-y-4">
              <h3 className="font-bold text-burgundy uppercase tracking-widest text-sm">Domestic Delivery</h3>
              <ul className="space-y-3 text-burgundy/60 text-sm">
                <li className="flex justify-between border-b border-burgundy/10 pb-2">
                  <span>Standard (3-5 Days)</span>
                  <span className="font-bold">$8.00</span>
                </li>
                <li className="flex justify-between border-b border-burgundy/10 pb-2">
                  <span>Express (1-2 Days)</span>
                  <span className="font-bold">$22.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Orders over $50</span>
                  <span className="font-bold text-green-700">Complimentary</span>
                </li>
              </ul>
            </section>

            <section className="bg-blonde p-8 rounded-2xl space-y-4">
              <h3 className="font-bold text-burgundy uppercase tracking-widest text-sm">International</h3>
              <ul className="space-y-3 text-burgundy/60 text-sm">
                <li className="flex justify-between border-b border-burgundy/10 pb-2">
                  <span>Canada & Europe</span>
                  <span className="font-bold">$35.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Rest of World</span>
                  <span className="font-bold">$50.00</span>
                </li>
              </ul>
              <p className="text-[10px] uppercase text-burgundy/40 italic">Customs and duties may apply upon arrival.</p>
            </section>
          </div>

          <section className="space-y-6 border-t border-burgundy/10 pt-16">
            <h2 className="text-3xl font-serif text-burgundy">Our Return Promise</h2>
            <p className="text-burgundy/70 leading-relaxed">
              We want you to be completely enamored with your Velvet & Vine selection. If a product does not meet your expectations, we offer complimentary returns within 30 days of purchase, provided the item is in its original packaging and at least 50% of the content remains.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-burgundy font-bold text-xl mb-2">01</div>
                <div className="text-sm font-medium">Initiate Return via Concierge</div>
              </div>
              <div className="text-center">
                <div className="text-burgundy font-bold text-xl mb-2">02</div>
                <div className="text-sm font-medium">Receive Pre-paid Label</div>
              </div>
              <div className="text-center">
                <div className="text-burgundy font-bold text-xl mb-2">03</div>
                <div className="text-sm font-medium">Refund Processed in 5 Days</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
