import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MenuCategory } from '../types/restaurant';
import { CATEGORIES } from '../data/restaurantData';
import { analytics } from '../services/analytics';

interface CategoryMenuProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
  onViewFullMenu: () => void;
}

export const CategoryMenu: React.FC<CategoryMenuProps> = ({
  selectedCategory,
  onSelectCategory,
  onViewFullMenu,
}) => {
  const handleCategoryClick = (category: MenuCategory) => {
    onSelectCategory(category.id);
    analytics.track('MENU_FILTER', `Selected category: "${category.name}"`);
  };

  return (
    <section id="menu-categories" className="py-16 sm:py-20 bg-stone-100/60 dark:bg-[#181311] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-[0.22em] text-amber-600 dark:text-amber-400 uppercase">
              EXPLORE OUR MENU
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Flavours for Every Craving
            </h2>
          </div>

          <button
            onClick={onViewFullMenu}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 group transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Circular Category Cards Row (Touch optimized with horizontal swipe on mobile) */}
        <div className="relative">
          <div className="flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar pb-6 pt-2 px-1 snap-x snap-mandatory scroll-smooth">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={`flex flex-col items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-2xl p-2 transition-all cursor-pointer snap-center ${
                    isSelected ? 'scale-105' : 'hover:scale-102'
                  }`}
                  aria-pressed={isSelected}
                >
                  {/* Circular Image Container with Ring */}
                  <div
                    className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden transition-all duration-300 shadow-md ${
                      isSelected
                        ? 'ring-4 ring-amber-500 ring-offset-4 ring-offset-stone-100 dark:ring-offset-[#181311] shadow-amber-500/20'
                        : 'group-hover:ring-2 group-hover:ring-amber-400/80 group-hover:shadow-lg'
                    }`}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover object-center group-hover:scale-115 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Subtle darkening overlay for readability */}
                    <div className="absolute inset-0 bg-stone-950/10 group-hover:bg-transparent transition-colors" />
                  </div>

                  {/* Category Title */}
                  <div className="text-center">
                    <span
                      className={`text-sm sm:text-base font-semibold block transition-colors ${
                        isSelected
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-stone-800 dark:text-stone-200 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                      }`}
                    >
                      {category.name}
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 block font-normal">
                      {category.itemCount} items
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
