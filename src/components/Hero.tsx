import React from 'react';
import { ArrowRight, Sparkles, UtensilsCrossed, Flame, ChefHat, Heart, Award, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onExploreMenu }) => {
  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-stone-950 dark:bg-[#120E0D] text-stone-100">
      {/* Subtle warm ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-800/50 text-amber-300 text-xs sm:text-xs tracking-[0.18em] font-semibold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>FRESH HOMEMADE FLAVORS • LOKOJA, KOGI STATE</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-100 leading-[1.08]">
                Good Food, <br className="hidden sm:inline" />
                <span className="text-amber-400 italic font-normal">Memorable</span> Taste
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-stone-300 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                From firewood smokey party jollof and sizzling smallchops platters to 2.5L pots of rich stews, milky chinchin, and surprise luxury food trays.
              </p>
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-amber-300/90 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-900/30">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{BUSINESS_INFO.location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-sm sm:text-base"
              >
                <span>Order Products & Snacks</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-2 bg-stone-900/90 hover:bg-stone-800 text-stone-100 font-semibold px-7 py-3.5 rounded-full border border-stone-700/80 hover:border-amber-400/60 transition-all text-sm sm:text-base cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Book Event Catering / Food Tray</span>
                <UtensilsCrossed className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* 4 Pillars Under Buttons */}
            <div className="pt-6 sm:pt-10 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-11 h-11 rounded-full bg-amber-950/40 border border-amber-900/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-stone-300 tracking-wide">
                  Smokey Party<br />Jollof & Soups
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 group">
                <div className="w-11 h-11 rounded-full bg-amber-950/40 border border-amber-900/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <ChefHat className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-stone-300 tracking-wide">
                  Crispy Hot<br />Smallchops
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 group">
                <div className="w-11 h-11 rounded-full bg-amber-950/40 border border-amber-900/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-stone-300 tracking-wide">
                  2.5L Bulk Pots<br />& Meatpies
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 group">
                <div className="w-11 h-11 rounded-full bg-amber-950/40 border border-amber-900/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-stone-300 tracking-wide">
                  Surprise VIP<br />Food Trays
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Imagery Showcase with Handwritten Script overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md sm:max-w-xl lg:max-w-none">
              
              {/* Main Dish Imagery Composition */}
              <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl bg-gradient-to-b from-stone-900 to-stone-950 group">
                <img
                  src="/images/smokey_party_jollof_plate_4k.jpg"
                  alt="Authentic Nigerian Smokey Party Jollof Rice by Ebun D Foodie"
                  className="w-full h-[400px] sm:h-[480px] lg:h-[540px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter brightness-[0.95]"
                  loading="eager"
                />

                {/* Gradient vignette for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

                {/* Handwritten script overlay: "Good Food Brings People Together" */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-right max-w-[200px] sm:max-w-[220px]">
                  <p className="font-script text-3xl sm:text-4xl text-amber-300 font-bold leading-tight drop-shadow-md transform -rotate-3">
                    Taste the Joy in Every Bite!
                  </p>
                  <div className="h-0.5 w-16 bg-amber-400/80 ml-auto mt-1 rounded-full" />
                </div>

                {/* Floating Chef Recommendation badge at bottom left */}
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-stone-950/90 backdrop-blur-md border border-amber-500/30 rounded-2xl p-4 shadow-xl flex items-center gap-4">
                  <img
                    src="/images/smallchops_beef_platter_16k.jpg"
                    alt="Smallchops beef platter"
                    className="w-14 h-14 rounded-xl object-cover border border-amber-500/40 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Top Event Pick</span>
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">₦16,000</span>
                    </div>
                    <p className="text-sm font-medium text-stone-100">Smallchops Beef Platter</p>
                    <p className="text-xs text-stone-400">Golden Samosas, Spring Rolls, Puff Puff & Beef</p>
                  </div>
                </div>

              </div>

              {/* Secondary floating thumbnail: Luxury Food Tray */}
              <div className="absolute -top-6 -left-6 hidden sm:flex items-center gap-3 bg-stone-900/90 backdrop-blur-md p-2.5 pr-4 rounded-2xl border border-amber-500/30 shadow-xl">
                <img
                  src="/images/luxury_food_tray_150k.jpg"
                  alt="Celebration Food Tray"
                  className="w-12 h-12 rounded-xl object-cover border border-amber-500/40"
                />
                <div>
                  <div className="text-[11px] font-semibold text-amber-400">SURPRISE TRAY</div>
                  <div className="text-xs font-bold text-white">VIP Celebration Tray</div>
                  <div className="text-[10px] text-amber-300">₦150,000 Package</div>
                </div>
              </div>

              {/* Decorative side accent ring */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border-2 border-dashed border-amber-500/30 -z-10 animate-spin-slow pointer-events-none hidden sm:block" />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
