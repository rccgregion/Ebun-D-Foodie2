import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, Phone, Sparkles } from 'lucide-react';
import { LotusLogo } from './LotusLogo';
import { analytics } from '../services/analytics';
import { BUSINESS_INFO } from '../data/restaurantData';

interface CateringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CateringModal: React.FC<CateringModalProps> = ({ isOpen, onClose }) => {
  const [eventType, setEventType] = useState('Birthday Party & Smallchops Spread');
  const [guests, setGuests] = useState(50);
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  // Approximate package rate per person in Naira
  const perPlateEstimate = eventType.includes('Wedding') ? 4500 : eventType.includes('Corporate') ? 4000 : 3000;
  const estimatedBudget = guests * perPlateEstimate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    analytics.track('CONFIRM_BOOKING', `Catering inquiry: ${guests} guests for ${eventType} by ${clientName} (₦${estimatedBudget})`);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hello Ebun D Foodie! 🍲 I would like a quote for Event Catering:\n` +
      `• Host Name: ${clientName}\n` +
      `• Phone: ${phone}\n` +
      `• Event Type: ${eventType}\n` +
      `• Estimated Guests: ${guests} people\n` +
      `• Target Date: ${date || 'To be determined'}\n` +
      `• Venue/Location: ${venue || 'Lokoja, Kogi State'}\n` +
      `• Estimated Budget: ~₦${estimatedBudget.toLocaleString()}\n\n` +
      `Please let me know your custom menu options and availability. Thank you!`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 my-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#181311] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-white flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <LotusLogo size={36} />
            <div>
              <h3 className="font-serif text-xl font-bold text-amber-300">
                Ebun D Foodie Event Catering
              </h3>
              <p className="text-xs text-stone-300">
                Smallchops Platters • Firewood Jollof • 2.5L Stew Pots • Celebration Trays
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setConfirmed(false);
              onClose();
            }}
            className="p-1.5 text-stone-300 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
              Catering Inquiry Received!
            </h4>
            <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
              Thank you, {clientName}. Chef Ebun will contact you at {phone} to discuss your customized menu and schedule tasting sets.
            </p>
            <div className="p-4 bg-amber-500/10 rounded-xl text-xs text-stone-700 dark:text-stone-300 max-w-sm mx-auto">
              Estimated preliminary package: <strong>₦{estimatedBudget.toLocaleString()}</strong> for {guests} guests.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleWhatsAppSend}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Brief to Chef via WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setConfirmed(false);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold rounded-xl text-sm"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Occasion Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-sm"
                >
                  <option value="Birthday Party & Smallchops Spread">Birthday Party & Smallchops Spread</option>
                  <option value="Wedding & Engagement Feast">Wedding & Engagement Feast</option>
                  <option value="Corporate Lunch & Office Catering">Corporate Lunch & Office Catering</option>
                  <option value="Student / Hostel Reunion Feast">Student / Hostel Reunion Feast</option>
                  <option value="Family Weekend Celebration">Family Weekend Celebration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Estimated Number of Guests ({guests} People)
                </label>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer mt-2"
                />
                <div className="flex justify-between text-[11px] text-stone-400">
                  <span>20</span>
                  <span className="font-bold text-amber-500">{guests} Guests</span>
                  <span>500+</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Host / Planner Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mrs. Ebunoluwa"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="08158820544"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                Venue Location (Lokoja & Environs)
              </label>
              <input
                type="text"
                placeholder="e.g. Rock Garden 200 Housing Unit, or Event Hall in Lokoja"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-sm"
              />
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 dark:text-stone-400 block">
                  Estimated Base Package ({guests} guests @ ~₦{perPlateEstimate.toLocaleString()}/person)
                </span>
                <span className="font-serif text-xl font-bold text-amber-600 dark:text-amber-400">
                  ₦{estimatedBudget.toLocaleString()}
                </span>
              </div>
              <span className="text-[11px] text-stone-400">Includes packaging, sauces & dispatch</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold rounded-xl shadow-lg transition-all text-sm cursor-pointer"
            >
              Request Custom Catering Proposal
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
