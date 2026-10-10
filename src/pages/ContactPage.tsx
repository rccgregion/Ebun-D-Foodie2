import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Video, Send, CheckCircle2, Sparkles, Navigation } from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';
import { analytics } from '../services/analytics';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('Product Delivery / Fast Order');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = 'EBF-MSG-' + Math.floor(10000 + Math.random() * 90000);
    setRefId(id);
    setSubmitted(true);
    analytics.track('CONFIRM_BOOKING', `Contact Form submitted (${purpose}) by ${name} - ${phone}`);
  };

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Ebun D Foodie! 🍲\n\nI am contacting you from your website:\n` +
      `• Name: ${name || 'Customer'}\n` +
      `• Phone: ${phone || 'Not provided'}\n` +
      (email ? `• Email: ${email}\n` : '') +
      `• Purpose: ${purpose}\n` +
      (date ? `• Date: ${date}\n` : '') +
      (address ? `• Location/Address: ${address}\n` : '') +
      (message ? `• Details: ${message}\n` : '') +
      `\nPlease get back to me. Thank you!`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CONTACT & LOCATION</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
          We’d Love to Cook for You
        </h1>
        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-light leading-relaxed">
          Reach out for doorstep deliveries in Lokoja, catering bookings, surprise food trays, or custom cake consultations.
        </p>
      </div>

      {/* Main Grid: Info Cards (Left) & Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Left Column: Direct Contacts & Channels */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Location Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#181311] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">Our Kitchen Hub</h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                  {BUSINESS_INFO.location}
                </p>
                <span className="inline-block mt-2 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md">
                  Pickup & Dispatch Center
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 text-xs text-stone-500 dark:text-stone-400 space-y-1">
              <strong className="text-stone-700 dark:text-stone-300 block">Delivery Zones:</strong>
              <p>• Lokoja Town, 200 Housing Unit, Ganaja & Felele</p>
              <p>• Federal University Lokoja (Adankolo & Permanent Site)</p>
              <p>• Federal Polytechnic Idah & interstate waybill shipments</p>
            </div>
          </div>

          {/* Direct Phone & WhatsApp */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#181311] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">Phone & WhatsApp</h3>
                <div className="space-y-1 mt-1 text-sm">
                  <a href={`tel:${BUSINESS_INFO.phones[0]}`} className="block font-bold text-stone-800 dark:text-stone-200 hover:text-amber-500 transition-colors">
                    {BUSINESS_INFO.phones[0]}
                  </a>
                  <a href={`tel:${BUSINESS_INFO.phones[1]}`} className="block font-bold text-stone-800 dark:text-stone-200 hover:text-amber-500 transition-colors">
                    {BUSINESS_INFO.phones[1]}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm shadow-md transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Chef Ebun on WhatsApp</span>
            </a>
          </div>

          {/* Social & Hours */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#181311] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="text-xs sm:text-sm">
                <strong className="text-stone-900 dark:text-stone-100 block">Working Hours</strong>
                <span className="text-stone-500 dark:text-stone-400">{BUSINESS_INFO.openingHours}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-stone-500 dark:text-stone-400">Follow on TikTok:</span>
              <a
                href={BUSINESS_INFO.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <Video className="w-4 h-4" />
                <span>{BUSINESS_INFO.tiktokHandle}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Contact & Booking Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#181311] border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                  Thank you, {name}. Your inquiry (Reference: <strong>{refId}</strong>) has been logged.
                </p>
                <div className="p-4 bg-amber-500/10 rounded-2xl max-w-sm mx-auto text-xs text-stone-700 dark:text-stone-300">
                  Want an instant reply? Send your inquiry straight to Chef Ebun on WhatsApp!
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-3 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                    Send Us an Inquiry or Event Booking
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                    Fill in your details below and we will respond promptly with availability and quotes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ebunoluwa"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="08158820544"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Inquiry Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                      Inquiry Type *
                    </label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="Product Delivery / Fast Order">Product Delivery / Fast Order</option>
                      <option value="Party Smallchops Platter">Party Smallchops Platter (16k / 50k)</option>
                      <option value="2.5L Pot of Stew or Egusi">2.5L Pot of Stew or Egusi (30k)</option>
                      <option value="VIP Surprise Food Tray">VIP Surprise Food Tray (150k)</option>
                      <option value="Customized Celebration Cake">Customized Celebration Cake (35k)</option>
                      <option value="Event Catering (50+ Guests)">Event Catering (50+ Guests)</option>
                      <option value="General Question / Feedback">General Question / Feedback</option>
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                      Event / Delivery Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Delivery Location in Lokoja */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                      Location / Delivery Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rock Garden 200 Housing Unit"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                      Notes, Dietary Preferences, or Cake Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us what you need, guest count, spice levels, or specific cake inscriptions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold rounded-xl shadow-lg transition-all text-sm cursor-pointer"
                  >
                    Submit Booking / Message
                  </button>

                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="w-full sm:w-auto py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
