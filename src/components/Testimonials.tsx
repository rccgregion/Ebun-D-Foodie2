import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/restaurantData';

export const Testimonials: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Get 3 visible reviews (wrapping around)
  const visibleReviews = [
    TESTIMONIALS[startIndex % TESTIMONIALS.length],
    TESTIMONIALS[(startIndex + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(startIndex + 2) % TESTIMONIALS.length],
  ];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-stone-100/70 dark:bg-[#181311] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title & Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-[0.22em] text-amber-600 dark:text-amber-500 uppercase">
              CUSTOMER LOVE & EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Real Flavours. Real Happiness.
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous customer review"
              className="w-10 h-10 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next customer review"
              className="w-10 h-10 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-[#1B1513] rounded-2xl p-6 sm:p-7 border border-stone-200 dark:border-stone-800/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Quote */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 italic leading-relaxed">
                  "{rev.comment}"
                </p>
                {rev.dishRecommended && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                    Favorite Pick: <span className="underline">{rev.dishRecommended}</span>
                  </p>
                )}
              </div>

              {/* Guest Profile & 5 Stars */}
              <div className="flex items-center justify-between pt-6 mt-4 border-t border-stone-100 dark:border-stone-800/80">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      <span>{rev.location}</span>
                    </p>
                  </div>
                </div>

                {/* 5 Golden Stars */}
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
