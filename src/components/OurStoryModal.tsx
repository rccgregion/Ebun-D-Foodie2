import React from 'react';
import { X, Sparkles, Heart, CheckCircle, MapPin, Phone } from 'lucide-react';
import { LotusLogo } from './LotusLogo';
import { BUSINESS_INFO, CHEF_STORY } from '../data/restaurantData';

interface OurStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
}

export const OurStoryModal: React.FC<OurStoryModalProps> = ({
  isOpen,
  onClose,
  onOpenReservation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 my-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#181311] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-white flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <LotusLogo size={36} />
            <div>
              <h3 className="font-serif text-xl font-bold text-amber-300">
                The Ebun D Foodie Story
              </h3>
              <p className="text-xs text-stone-300">
                Handcrafted Flavors & Catering in Lokoja, Kogi State
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="relative rounded-2xl overflow-hidden aspect-21/9 bg-stone-900">
            <img
              src="/images/chef_kitchen_1661.jpg"
              alt="Ebun D Foodie kitchen craftsmanship"
              className="w-full h-full object-cover filter brightness-[0.7]"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <div>
                <p className="font-script text-3xl sm:text-4xl text-amber-300 font-bold">
                  Food Made With Love and Purpose
                </p>
                <p className="text-xs sm:text-sm text-stone-200 max-w-md mx-auto mt-1">
                  Bringing warmth, flavor, and culinary excellence to every table in Kogi State
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-light">
            <p>
              {CHEF_STORY.lead}
            </p>
            {CHEF_STORY.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Three Core Commitments */}
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-[#1E1715] border border-stone-200 dark:border-stone-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Our Culinary Standards</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-white dark:bg-[#251D1A] rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
                <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">100% Fresh Daily</span>
                <h5 className="font-semibold text-stone-900 dark:text-stone-100">Hygiene First</h5>
                <p className="text-stone-500 dark:text-stone-400 text-[11px]">
                  All pastries, smallchops, and stews are made from fresh market produce and premium local cuts.
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-[#251D1A] rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
                <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">Authentic Recipe</span>
                <h5 className="font-semibold text-stone-900 dark:text-stone-100">Smokey Firewood Magic</h5>
                <p className="text-stone-500 dark:text-stone-400 text-[11px]">
                  True Nigerian party jollof with that irresistible firewood aroma that sets celebrations on fire.
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-[#251D1A] rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
                <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">Punctual Delivery</span>
                <h5 className="font-semibold text-stone-900 dark:text-stone-100">Rock Garden Hub</h5>
                <p className="text-stone-500 dark:text-stone-400 text-[11px]">
                  Fast dispatch to 200 Housing Unit, Lokoja town, campuses, offices, and waybill transit.
                </p>
              </div>
            </div>
          </div>

          {/* Location & Contact Bar */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-stone-700 dark:text-stone-200">
              <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{BUSINESS_INFO.location}</span>
            </div>
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-semibold">
              <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{BUSINESS_INFO.phones[0]} / {BUSINESS_INFO.phones[1]}</span>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200 dark:border-stone-800">
            <span className="text-xs text-stone-500 dark:text-stone-400">
              TikTok: @ebundfoodie1 • WhatsApp Orders Available
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenReservation();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-bold px-6 py-2.5 rounded-full shadow-md hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>Book Event / Food Tray</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
