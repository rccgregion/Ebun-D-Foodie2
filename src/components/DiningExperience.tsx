import React from 'react';
import { ArrowRight, Gift, Bike, Utensils, Sparkles, ChefHat } from 'lucide-react';

interface DiningExperienceProps {
  onOpenReservation: () => void;
  onOpenCatering: () => void;
}

export const DiningExperience: React.FC<DiningExperienceProps> = ({
  onOpenReservation,
  onOpenCatering,
}) => {
  return (
    <section id="catering" className="relative overflow-hidden bg-stone-950 text-stone-100">
      
      {/* Banner Showcase with Ambient Celebration Food Tray Background */}
      <div className="relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center">
        {/* Real celebration photography background */}
        <div className="absolute inset-0">
          <img
            src="/images/luxury_food_tray_150k.jpg"
            alt="VIP Celebration Food Tray by Ebun D Foodie"
            className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-[1.05]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/80" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>EVENTS, CELEBRATIONS & BULK COOKING</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                Good Food, <br />
                <span className="text-amber-400">Unforgettable Moments</span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-stone-300 max-w-xl font-light leading-relaxed">
                Whether you need a surprise VIP food tray for a loved one, 200 pieces of party smallchops, or 2.5L pots of rich stews for your family, Ebun D Foodie is your trusted partner.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenReservation}
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Book Catering / Food Tray</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenCatering}
                  className="inline-flex items-center gap-2 bg-stone-900/90 hover:bg-stone-800 text-stone-200 font-semibold px-6 py-3.5 rounded-full border border-stone-700 transition-all cursor-pointer"
                >
                  <span>Catering Calculator</span>
                </button>
              </div>
            </div>

            {/* Right Callout: Handwritten Script ("Same Food Happier People") */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="border border-amber-500/40 bg-stone-950/80 backdrop-blur-md px-6 py-5 rounded-3xl transform rotate-2 shadow-2xl">
                <p className="font-script text-3xl sm:text-4xl text-amber-300 font-bold leading-tight">
                  Fresh Flavors<br />
                  <span className="text-white">Happier Guests</span>
                </p>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-200">
                  <span>★ ★ ★ ★ ★</span>
                  <span className="text-[11px] text-stone-300">• 1,500+ Satisfied Foodies</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4 Service Pillars */}
      <div className="bg-stone-100 dark:bg-[#181311] py-10 sm:py-14 border-t border-b border-stone-200 dark:border-stone-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Surprise Trays */}
            <div
              onClick={onOpenReservation}
              className="flex flex-col items-center text-center group p-3 rounded-2xl hover:bg-white dark:hover:bg-stone-900/60 transition-all cursor-pointer"
            >
              <div className="w-13 h-13 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-1">
                Surprise Trays
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                Luxurious birthday & gift packages.
              </p>
            </div>

            {/* Fast Delivery */}
            <div className="flex flex-col items-center text-center group p-3 rounded-2xl hover:bg-white dark:hover:bg-stone-900/60 transition-all">
              <div className="w-13 h-13 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Bike className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-1">
                Lokoja Delivery
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                Prompt dispatch across metropolis.
              </p>
            </div>

            {/* Event Catering */}
            <div
              onClick={onOpenCatering}
              className="flex flex-col items-center text-center group p-3 rounded-2xl hover:bg-white dark:hover:bg-stone-900/60 transition-all cursor-pointer"
            >
              <div className="w-13 h-13 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-1 flex items-center gap-1">
                <span>Party Catering</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">50+</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                Weddings, birthdays & reunions.
              </p>
            </div>

            {/* Bulk Pots */}
            <div
              onClick={onOpenReservation}
              className="flex flex-col items-center text-center group p-3 rounded-2xl hover:bg-white dark:hover:bg-stone-900/60 transition-all cursor-pointer"
            >
              <div className="w-13 h-13 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ChefHat className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-1">
                2.5L Bulk Pots
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                Pots of soups & stews for freezers.
              </p>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};
