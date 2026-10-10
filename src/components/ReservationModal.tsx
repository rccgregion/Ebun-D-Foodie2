import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, MapPin, Phone, MessageSquare } from 'lucide-react';
import { analytics } from '../services/analytics';
import { LotusLogo } from './LotusLogo';
import { BUSINESS_INFO } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: { date?: string; packageType?: string; guests?: number };
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  initialValues,
}) => {
  const [date, setDate] = useState<string>(() => initialValues?.date || new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState<string>('01:00 PM');
  const [packageType, setPackageType] = useState<string>(() => initialValues?.packageType || 'Smallchops Party Platter');
  const [occasion, setOccasion] = useState<string>('Birthday Celebration');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [venueOrAddress, setVenueOrAddress] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'Doorstep Delivery in Lokoja' | 'Self Pickup (Rock Garden 200 Housing)' | 'Interstate Transit'>('Doorstep Delivery in Lokoja');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const timeSlots = ['10:00 AM', '12:00 PM', '01:30 PM', '03:00 PM', '05:00 PM', '07:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingRef = 'EBF-BOOK-' + Math.floor(10000 + Math.random() * 90000);
    setConfirmedBookingId(bookingRef);

    analytics.track(
      'CONFIRM_BOOKING',
      `Booking Confirmed: ${packageType} on ${date} for ${customerName} (${phone})`
    );
  };

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Ebun D Foodie! 🍲\n\nI want to confirm my Booking Appointment (${confirmedBookingId}):\n` +
      `• Name: ${customerName}\n` +
      `• Phone: ${phone}\n` +
      `• Package: ${packageType}\n` +
      `• Occasion: ${occasion}\n` +
      `• Date & Time: ${date} at ${timeSlot}\n` +
      `• Delivery Option: ${deliveryOption}\n` +
      `• Address/Venue: ${venueOrAddress || 'Lokoja'}\n` +
      (specialRequests ? `• Special Requests: ${specialRequests}\n` : '') +
      `\nPlease confirm availability and payment details. Thank you!`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleResetAndClose = () => {
    setConfirmedBookingId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#181311] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-8">
        
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-white flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <LotusLogo size={36} />
            <div>
              <h3 className="font-serif text-xl font-bold text-amber-300">
                Book Catering / Food Tray Appointment
              </h3>
              <p className="text-xs text-stone-300">
                Ebun D Foodie • Rock Garden 200 Housing Unit, Lokoja
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed Ticket Screen */}
        {confirmedBookingId ? (
          <div className="p-8 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Booking Request Received
              </span>
              <h4 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
                We're Thrilled to Cook for You!
              </h4>
              <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                Your appointment request has been recorded. Click below to instantly forward your booking to Chef Ebun on WhatsApp for speedy confirmation!
              </p>
            </div>

            {/* Regal Ticket Card */}
            <div className="border-2 border-dashed border-amber-500/40 bg-amber-50/50 dark:bg-stone-900/60 p-6 rounded-2xl text-left space-y-4 max-w-lg mx-auto">
              <div className="flex justify-between items-center border-b border-amber-500/20 pb-3">
                <span className="text-xs text-stone-500">Booking Reference:</span>
                <span className="font-mono text-base font-bold text-amber-600 dark:text-amber-400">
                  {confirmedBookingId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-400 block">Customer Name:</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{customerName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Phone / WhatsApp:</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{phone}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Package Selected:</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">{packageType}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Occasion:</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{occasion}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Event Date & Time:</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{date} at {timeSlot}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Delivery Option:</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{deliveryOption}</span>
                </div>
              </div>

              {venueOrAddress && (
                <div className="text-xs border-t border-amber-500/20 pt-2">
                  <span className="text-stone-400 block">Delivery Address / Venue:</span>
                  <span className="font-medium text-stone-700 dark:text-stone-300">{venueOrAddress}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm Instantly via WhatsApp</span>
              </button>

              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold px-6 py-3 rounded-full hover:bg-stone-300 dark:hover:bg-stone-700 transition-all cursor-pointer"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Package Type */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Service / Package Requested *
                </label>
                <select
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                >
                  <option value="Smallchops Party Platter">Smallchops Party Platter (₦16,000)</option>
                  <option value="Mega Event Smallchops Platter (200 pcs)">Mega Event Smallchops Package (200 pcs - ₦50,000)</option>
                  <option value="VIP Surprise Celebration Food Tray">VIP Surprise Celebration Food Tray (₦150,000)</option>
                  <option value="2.5L Pot of Beef & Ponmo Stew">2.5L Pot of Beef & Ponmo Stew (₦30,000)</option>
                  <option value="2L Pot of Fish & Ponmo Egusi Soup">2L Pot of Fish & Ponmo Egusi Soup (₦30,000)</option>
                  <option value="Fresh Catfish Peppersoup Bowl">Fresh Catfish Peppersoup (₦10,000)</option>
                  <option value="Customized Celebration Rectangle Cake">Customized Celebration Rectangle Cake (₦35,000)</option>
                  <option value="Bulk Smokey Jollof Rice (Min 5 Packs)">Bulk Smokey Jollof Rice (₦3,000 per pack)</option>
                  <option value="Full Wedding & Event Catering Package">Full Wedding & Event Catering Package (Custom Quote)</option>
                </select>
              </div>

              {/* Occasion */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Occasion / Event *
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Surprise Gift for Loved One">Surprise Gift for Loved One</option>
                  <option value="Wedding & Reception">Wedding & Reception</option>
                  <option value="Office Lunch & Corporate Meeting">Office Lunch & Corporate Meeting</option>
                  <option value="Hostel & Student Hangout">Hostel & Student Hangout</option>
                  <option value="Family Weekend Cooking">Family Weekend Cooking</option>
                </select>
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Event / Delivery Date *
                </label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              {/* Delivery Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Preferred Time *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {timeSlots.map((ts) => (
                    <option key={ts} value={ts}>{ts}</option>
                  ))}
                </select>
              </div>

              {/* Delivery Option */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Fulfillment Method *
                </label>
                <select
                  value={deliveryOption}
                  onChange={(e) => setDeliveryOption(e.target.value as any)}
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="Doorstep Delivery in Lokoja">Doorstep Delivery in Lokoja</option>
                  <option value="Self Pickup (Rock Garden 200 Housing)">Self Pickup (Rock Garden 200 Housing)</option>
                  <option value="Interstate Transit">Interstate Transit / Waybill</option>
                </select>
              </div>

              {/* Customer Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fatima Bello"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 08158820544"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Address / Venue */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Delivery Address / Venue (Lokoja & Environs)
                </label>
                <input
                  type="text"
                  placeholder="e.g. House 14, 200 Housing Unit, or Ganaja Junction"
                  value={venueOrAddress}
                  onChange={(e) => setVenueOrAddress(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Special Requests */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Special Notes / Cake Message / Dietary Preference
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 'Happy 30th Birthday Segun!' on the cake, extra pepper on smallchops..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-base shadow-lg hover:shadow-amber-500/25 transition-all cursor-pointer"
              >
                Submit Booking Appointment
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
