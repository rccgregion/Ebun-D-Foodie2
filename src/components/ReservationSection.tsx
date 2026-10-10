import React, { useState } from 'react';
import { Calendar, Package, ArrowRight, Sparkles } from 'lucide-react';
import { analytics } from '../services/analytics';

interface ReservationSectionProps {
  onOpenDetailedReservation: (initialValues?: { date?: string; packageType?: string }) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onOpenDetailedReservation,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [packageType, setPackageType] = useState<string>('Smallchops Party Platter');

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenDetailedReservation({
      date: selectedDate,
      packageType,
    });
    analytics.track('INITIATE_BOOKING', `Booking appointment initiated: ${packageType} for ${selectedDate}`);
  };

  return (
    <section id="reservations" className="py-14 sm:py-20 bg-stone-950 dark:bg-[#120E0D] text-stone-100 relative overflow-hidden">
      {/* Decorative pattern background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-stone-900 via-stone-900/90 to-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Title & Subtitle */}
            <div className="lg:col-span-6 space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BOOKINGS & APPOINTMENTS</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-4xl font-bold tracking-tight text-white">
                Book Catering & Event Services
              </h2>
              <p className="text-sm sm:text-base text-stone-300 font-light">
                Birthdays, surprise trays, bulk pots of stew, or wedding smallchops in Lokoja. Reserve your slot now!
              </p>
            </div>

            {/* Right Interactive Controls Form */}
            <div className="lg:col-span-6">
              <form onSubmit={handleQuickBook} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                
                {/* Date Input */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Calendar className="w-4 h-4 text-amber-400" />
                  </div>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 pl-10 pr-3 py-3 rounded-xl border border-stone-300 dark:border-stone-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer shadow-inner"
                    aria-label="Select Event Date"
                  />
                </div>

                {/* Package Selector */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Package className="w-4 h-4 text-amber-400" />
                  </div>
                  <select
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                    className="w-full bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 pl-10 pr-8 py-3 rounded-xl border border-stone-300 dark:border-stone-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer shadow-inner"
                    aria-label="Select Package Type"
                  >
                    <option value="Smallchops Party Platter">Smallchops Party Platter</option>
                    <option value="Mega Event Smallchops (200 pcs)">Mega Smallchops (200 pcs)</option>
                    <option value="2.5L Pot of Stew or Soup">2.5L Pot of Stew / Soup</option>
                    <option value="VIP Surprise Food Tray">VIP Surprise Food Tray</option>
                    <option value="Custom Celebration Cake">Custom Celebration Cake</option>
                    <option value="Full Event Catering">Full Event Catering</option>
                  </select>
                </div>

                {/* Book Now Button */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all text-sm whitespace-nowrap cursor-pointer active:scale-95"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
