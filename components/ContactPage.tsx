
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a network delay for a "premium" feel
    setTimeout(() => {
      console.log('Inquiry submitted:', formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Hero Header */}
      <div className="relative h-[450px] flex items-center justify-center bg-burgundy overflow-hidden">
        <img 
           src="https://images.unsplash.com/photo-1617897903246-7392ce7ec77f?q=80&w=2000&auto=format&fit=crop" 
           alt="Luxury Spa Background" 
           className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="relative z-10 text-center px-6">
          <span className="text-blonde-dark font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Concierge Services</span>
          <h1 className="text-6xl md:text-8xl font-serif text-blonde italic">Connect With Us</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Column: Contact Info & Brand Story */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-serif text-burgundy italic mb-6">How May We Assist?</h2>
              <p className="text-lg text-burgundy/70 leading-relaxed max-w-md">
                Whether you seek a bespoke skincare regimen or have inquiries regarding our botanical sourcing, the Velvet & Vine collective is here to guide your journey.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex items-start space-x-5 group">
                <div className="w-12 h-12 bg-blonde rounded-full flex items-center justify-center flex-shrink-0 text-burgundy group-hover:bg-burgundy group-hover:text-blonde transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-burgundy uppercase tracking-widest text-[10px] mb-2">Global Ateliers</h3>
                  <p className="text-sm text-burgundy/60 leading-relaxed">
                    <span className="font-medium text-burgundy">New York</span><br />
                    123 Velvet Avenue, Suite 400, NY 10012<br />
                    <span className="font-medium text-burgundy mt-2 inline-block">Paris</span><br />
                    14 Rue de la Paix, 75002 Paris, France
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-5 group">
                <div className="w-12 h-12 bg-blonde rounded-full flex items-center justify-center flex-shrink-0 text-burgundy group-hover:bg-burgundy group-hover:text-blonde transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-burgundy uppercase tracking-widest text-[10px] mb-2">Direct Correspondence</h3>
                  <p className="text-sm text-burgundy/60 leading-relaxed">
                    General: concierge@velvetandvine.com<br />
                    Partnerships: atelier@velvetandvine.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-5 group">
                <div className="w-12 h-12 bg-blonde rounded-full flex items-center justify-center flex-shrink-0 text-burgundy group-hover:bg-burgundy group-hover:text-blonde transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-burgundy uppercase tracking-widest text-[10px] mb-2">Service Hours</h3>
                  <p className="text-sm text-burgundy/60 leading-relaxed">
                    Monday — Friday: 9am – 6pm EST<br />
                    Saturday: 10am – 4pm EST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="bg-white p-8 md:p-14 rounded-[40px] shadow-2xl border border-burgundy/5 relative overflow-hidden">
            {submitted ? (
              <div className="text-center py-16 space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 bg-blonde text-burgundy rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-serif text-burgundy italic">Message Received</h3>
                  <p className="text-burgundy/60 max-w-sm mx-auto leading-relaxed">
                    Thank you for your inquiry. A member of our concierge collective will reach out to you within one business day.
                  </p>
                </div>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-burgundy text-blonde px-12 py-4 rounded-full font-bold hover:bg-burgundy-dark transition-all shadow-lg hover:shadow-burgundy/20"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-burgundy/40 ml-1">Your Name</label>
                      <input 
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="E.g. Isabella V."
                        className="w-full bg-blonde/10 border-b border-burgundy/10 rounded-t-lg px-4 py-4 focus:outline-none focus:border-burgundy focus:ring-0 text-burgundy placeholder-burgundy/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-burgundy/40 ml-1">Email Address</label>
                      <input 
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="isabella@example.com"
                        className="w-full bg-blonde/10 border-b border-burgundy/10 rounded-t-lg px-4 py-4 focus:outline-none focus:border-burgundy focus:ring-0 text-burgundy placeholder-burgundy/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-burgundy/40 ml-1">Subject</label>
                    <input 
                      required
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How may we assist you today?"
                      className="w-full bg-blonde/10 border-b border-burgundy/10 rounded-t-lg px-4 py-4 focus:outline-none focus:border-burgundy focus:ring-0 text-burgundy placeholder-burgundy/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-burgundy/40 ml-1">Message</label>
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Share your thoughts with us..."
                      className="w-full bg-blonde/10 border-b border-burgundy/10 rounded-t-lg px-4 py-4 focus:outline-none focus:border-burgundy focus:ring-0 text-burgundy resize-none placeholder-burgundy/20 transition-all"
                    ></textarea>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 rounded-full font-bold shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center space-x-3 ${
                    isSubmitting ? 'bg-burgundy/50 text-blonde cursor-wait' : 'bg-burgundy text-blonde hover:bg-burgundy-dark hover:shadow-burgundy/20'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-blonde" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="tracking-widest uppercase text-xs">Sending Inquiry...</span>
                    </>
                  ) : (
                    <span className="tracking-widest uppercase text-xs">Submit Inquiry</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative Brand Banner */}
      <div className="bg-blonde-dark/10 py-12 border-y border-burgundy/5">
        <div className="container mx-auto px-6 overflow-hidden">
          <div className="flex space-x-20 whitespace-nowrap animate-marquee">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-burgundy/20 font-serif text-4xl italic tracking-widest">
                Velvet & Vine Collective
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
