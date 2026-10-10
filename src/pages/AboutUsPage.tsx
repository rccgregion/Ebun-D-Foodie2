import React from 'react';
import { Sparkles, MapPin, Phone, Heart, ChefHat, Award, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CHEF_STORY, BUSINESS_INFO } from '../data/restaurantData';
import { LotusLogo } from '../components/LotusLogo';

interface AboutUsPageProps {
  onNavigateToProducts: () => void;
  onNavigateToContact: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onNavigateToProducts,
  onNavigateToContact,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ABOUT EBUN D FOODIE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
          Rooted in Flavor, <br />
          <span className="text-amber-600 dark:text-amber-400 italic font-normal">Crafted with Heart</span>
        </h1>
        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-light leading-relaxed">
          The story of handcrafted Nigerian meals, celebration catering, and authentic homemade goodness in Lokoja, Kogi State.
        </p>
      </div>

      {/* Main Story & Visual Collage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Story Text */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            {CHEF_STORY.subtitle}
          </h2>

          <div className="space-y-4 text-stone-600 dark:text-stone-300 leading-relaxed text-sm sm:text-base font-light">
            <p className="font-normal text-stone-800 dark:text-stone-200">
              {CHEF_STORY.lead}
            </p>
            {CHEF_STORY.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
            <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Operating from <strong>{BUSINESS_INFO.location}</strong></span>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onNavigateToProducts}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-full text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToContact}
              className="px-6 py-3 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 font-semibold rounded-full text-sm transition-all cursor-pointer"
            >
              <span>Get in Touch</span>
            </button>
          </div>
        </div>

        {/* Right Photo Mosaic (Real Photos from Google Drive) */}
        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-800 aspect-4/5 bg-stone-900">
                <img
                  src="/images/chef_prep_1640.jpg"
                  alt="Chef preparation at Ebun D Foodie"
                  className="w-full h-full object-cover filter brightness-[0.9] hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-800 aspect-square bg-stone-900">
                <img
                  src="/images/fresh_pastries_prep.jpg"
                  alt="Fresh pastry dough and meatpie prep"
                  className="w-full h-full object-cover filter brightness-[0.9] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="space-y-4 pt-8 sm:pt-12">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-800 aspect-square bg-stone-900">
                <img
                  src="/images/chef_kitchen_1661.jpg"
                  alt="Authentic kitchen at Ebun D Foodie"
                  className="w-full h-full object-cover filter brightness-[0.9] hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-800 aspect-4/5 bg-stone-900">
                <img
                  src="/images/smallchops_beef_platter_16k_v2.jpg"
                  alt="Finished smallchops platter packaging"
                  className="w-full h-full object-cover filter brightness-[0.9] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181311] border border-stone-200 dark:border-stone-800 shadow-sm text-center">
        {CHEF_STORY.stats.map((s, idx) => (
          <div key={idx} className="space-y-1 p-3">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-600 dark:text-amber-400">
              {s.value}
            </div>
            <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Who We Serve (Target Audience from Product Details docx) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold tracking-[0.2em] text-amber-600 dark:text-amber-500 uppercase">
            WHO WE SERVE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            Culinary Peace of Mind for Every Occasion
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#181311] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              💼
            </div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">Busy Professionals</h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              Stock your freezer with 2.5L pots of rich tomato stew, Egusi soup, and jollof rice for easy, wholesome meals after long workdays.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#181311] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              🎓
            </div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">Students & Young Adults</h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              Affordable snack packs, crunchy milky chinchin jars, meatpie boxes, and group smallchops platters for study nights and hostel hangouts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#181311] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              🎉
            </div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">Birthday Celebrants</h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              Custom rectangle cakes with personalized lettering and surprise 3-tier luxury VIP food trays with champagne, pastries, and treats.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#181311] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              👨‍👩‍👧‍👦
            </div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">Families & Households</h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              Sunday family dinners and weekend gatherings made easy with hearty home-style cooking and aromatic catfish peppersoup.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#181311] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              📋
            </div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">Party Planners & Organizers</h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              Reliable 200-piece finger food platters (samosas, spring rolls, puff puff) delivered hot, crispy, and ready to impress guests.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#181311] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              🍲
            </div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">Bulk Order Customers</h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              Corporate office lunches, conference packs, and interstate food waybill orders dispatched with prompt communication.
            </p>
          </div>
        </div>
      </div>

      {/* Culinary Standards */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900/90 to-stone-900 text-white border border-amber-500/30 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
            Our Strict Culinary Standards
          </h3>
          <p className="text-xs sm:text-sm text-stone-400">
            Every dish that leaves our kitchen in Lokoja is prepared with these core promises:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white font-semibold mb-1">100% Market-Fresh Ingredients</strong>
              <p className="text-stone-300 text-xs leading-relaxed">
                We handpick whole peppers, ripe tomatoes, live catfish, and prime meats directly from certified local vendors.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white font-semibold mb-1">Hygienic Preparation</strong>
              <p className="text-stone-300 text-xs leading-relaxed">
                Clean kitchen workstations, strict food handling standards, and sealed packaging ensure maximum freshness.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white font-semibold mb-1">Authentic Firewood Seasoning</strong>
              <p className="text-stone-300 text-xs leading-relaxed">
                We preserve authentic Nigerian cooking traditions, capturing that distinct party flavor people talk about.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
