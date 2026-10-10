import React from 'react';
import { ArrowRight, Sparkles, MapPin, Heart } from 'lucide-react';
import { CHEF_STORY, BUSINESS_INFO } from '../data/restaurantData';

interface OurStoryProps {
  onOpenStoryModal: () => void;
}

export const OurStory: React.FC<OurStoryProps> = ({ onOpenStoryModal }) => {
  return (
    <section id="story" className="py-16 sm:py-24 bg-stone-50 dark:bg-[#120E0D] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-bold tracking-[0.22em] text-amber-600 dark:text-amber-500 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT EBUN D FOODIE</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
              Rooted in Flavor, <br />
              <span className="italic font-normal text-amber-600 dark:text-amber-400">Crafted with Heart</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              At Ebun D Foodie, food is our love language. Founded in Lokoja, Kogi State, we handcraft authentic Nigerian delicacies, festive party smallchops, and rich family stews using strictly fresh, quality ingredients.
            </p>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{BUSINESS_INFO.location}</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenStoryModal}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold px-7 py-3 rounded-full shadow-md hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Heritage stats */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {CHEF_STORY.stats.map((s, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <div className="font-serif text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400">{s.value}</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              
              {/* Main Chef Action Photo with handwritten script */}
              <div className="sm:col-span-7 relative rounded-2xl overflow-hidden shadow-xl min-h-[300px] sm:min-h-[380px] group bg-stone-900">
                <img
                  src="/images/chef_prep_1640.jpg"
                  alt="Chef preparation behind the scenes at Ebun D Foodie"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.88]"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                {/* Handwritten script overlay: "Handcrafted with Love" */}
                <div className="absolute bottom-6 right-6 text-right">
                  <p className="font-script text-3xl sm:text-4xl text-amber-300 font-bold leading-tight drop-shadow-lg transform -rotate-3">
                    Handmade Daily<br />
                    <span className="text-white">With Deep Passion</span>
                  </p>
                </div>
              </div>

              {/* 3 Textured Cards Stack on Right */}
              <div className="sm:col-span-5 flex flex-col gap-3.5">
                
                {/* 1. FRESH INGREDIENTS */}
                <div className="relative rounded-xl overflow-hidden shadow-md h-28 group bg-stone-900">
                  <img
                    src="/images/fresh_pastries_prep.jpg"
                    alt="Fresh pastry preparation at Ebun D Foodie"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 filter brightness-[0.7]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-3 text-center bg-stone-950/30">
                    <span className="text-xs sm:text-sm font-extrabold tracking-widest text-white uppercase drop-shadow">
                      FRESH BAKED PASTRIES
                    </span>
                  </div>
                </div>

                {/* 2. AUTHENTIC KITCHEN CRAFT */}
                <div className="relative rounded-xl overflow-hidden shadow-md h-28 group bg-stone-900">
                  <img
                    src="/images/chef_kitchen_1661.jpg"
                    alt="Kitchen craft at Ebun D Foodie"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 filter brightness-[0.7]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-3 text-center bg-stone-950/30">
                    <span className="text-xs sm:text-sm font-extrabold tracking-widest text-white uppercase drop-shadow">
                      AUTHENTIC HYGIENIC KITCHEN
                    </span>
                  </div>
                </div>

                {/* 3. CELEBRATION HOSPITALITY */}
                <div className="relative rounded-xl overflow-hidden shadow-md h-28 group bg-stone-900">
                  <img
                    src="/images/smallchops_beef_platter_16k_v2.jpg"
                    alt="Smallchops beef platter packaging"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 filter brightness-[0.7]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-3 text-center bg-stone-950/30">
                    <span className="text-xs sm:text-sm font-extrabold tracking-widest text-white uppercase drop-shadow">
                      EVENT DELIGHTS & TRAYS
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
