import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus, Flame, Info, Sparkles } from 'lucide-react';
import { MenuItem, CartItem } from '../types/restaurant';
import { BESTSELLER_ITEMS, ALL_MENU_ITEMS } from '../data/restaurantData';

interface BestsellersProps {
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onSelectDish: (item: MenuItem) => void;
}

export const Bestsellers: React.FC<BestsellersProps> = ({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onSelectDish,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'smallchops' | 'meals-pots' | 'pastries-cakes'>('all');
  const [scrollIndex, setScrollIndex] = useState(0);

  const filteredItems = (filterType === 'all' ? BESTSELLER_ITEMS : ALL_MENU_ITEMS.filter((item) => {
    if (filterType === 'smallchops') return item.category === 'smallchops';
    if (filterType === 'meals-pots') return item.category === 'meals' || item.category === 'soups-stews';
    if (filterType === 'pastries-cakes') return item.category === 'pastries-snacks' || item.category === 'cakes-trays';
    return true;
  }));

  const handleNext = () => {
    setScrollIndex((prev) => Math.min(prev + 1, Math.max(0, filteredItems.length - 4)));
  };

  const handlePrev = () => {
    setScrollIndex((prev) => Math.max(0, prev - 1));
  };

  const getItemQuantity = (id: string): number => {
    const found = cartItems.find((c) => c.menuItem.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <section id="bestsellers" className="py-16 sm:py-24 bg-stone-50 dark:bg-[#120E0D] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-[0.22em] text-amber-600 dark:text-amber-500 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CHEF EBUN'S SIGNATURE CREATIONS</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Most Loved Products
            </h2>
          </div>

          {/* Filter Pills and Carousel Controls */}
          <div className="flex items-center gap-4 self-start sm:self-auto flex-wrap">
            {/* Filter Pills */}
            <div className="inline-flex p-1 bg-stone-200/80 dark:bg-stone-800/80 rounded-full text-xs font-medium">
              <button
                onClick={() => { setFilterType('all'); setScrollIndex(0); }}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                All Favorites
              </button>
              <button
                onClick={() => { setFilterType('smallchops'); setScrollIndex(0); }}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  filterType === 'smallchops'
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-600 dark:text-stone-300 hover:text-amber-500'
                }`}
              >
                Smallchops
              </button>
              <button
                onClick={() => { setFilterType('meals-pots'); setScrollIndex(0); }}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  filterType === 'meals-pots'
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-600 dark:text-stone-300 hover:text-amber-500'
                }`}
              >
                Meals & 2.5L Pots
              </button>
              <button
                onClick={() => { setFilterType('pastries-cakes'); setScrollIndex(0); }}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  filterType === 'pastries-cakes'
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-600 dark:text-stone-300 hover:text-amber-500'
                }`}
              >
                Snacks & Cakes
              </button>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={scrollIndex === 0}
                aria-label="Previous dishes"
                className="w-10 h-10 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={scrollIndex >= Math.max(0, filteredItems.length - 4)}
                aria-label="Next dishes"
                className="w-10 h-10 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bestseller Dishes Grid (4 columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {filteredItems.slice(scrollIndex, scrollIndex + 4).map((dish) => {
            const quantity = getItemQuantity(dish.id);

            return (
              <div
                key={dish.id}
                className="group bg-white dark:bg-[#1B1513] rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800/80 shadow-sm hover:shadow-xl dark:hover:shadow-amber-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Dish Image Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-200 dark:bg-stone-800">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Portion or Category Badge */}
                  {dish.portionOrSize && (
                    <div className="absolute top-3 left-3 bg-stone-900/90 text-amber-300 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide shadow-sm border border-amber-500/30">
                      {dish.portionOrSize}
                    </div>
                  )}

                  {/* Quick Detail Info button */}
                  <button
                    onClick={() => onSelectDish(dish)}
                    aria-label={`View ingredients for ${dish.name}`}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-900/80 hover:bg-stone-900 text-stone-200 hover:text-amber-400 flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
                    title="View Product Ingredients & Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  {/* Spice or Fresh badge */}
                  {dish.spiceLevel && (
                    <div className="absolute bottom-3 right-3 bg-stone-950/80 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 text-[11px] text-amber-300">
                      <Flame className="w-3 h-3 text-red-500" />
                      <span>{dish.spiceLevel === 1 ? 'Mild' : dish.spiceLevel === 2 ? 'Medium' : 'Hot'}</span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3
                      onClick={() => onSelectDish(dish)}
                      className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {dish.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart button */}
                  <div className="pt-4 mt-2 border-t border-stone-100 dark:border-stone-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                          ₦{dish.price.toLocaleString()}
                        </span>
                      </div>

                      <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                        <span>★ {dish.rating}</span>
                        <span className="text-stone-400 text-[10px]">({dish.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Add to Cart / Quantity Controller */}
                    {quantity === 0 ? (
                      <button
                        onClick={() => onAddToCart(dish)}
                        className="w-full py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-sm hover:bg-amber-500 hover:border-amber-500 hover:text-stone-950 transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98]"
                      >
                        Add to Order
                      </button>
                    ) : (
                      <div className="flex items-center justify-between bg-amber-500 text-stone-950 font-bold rounded-xl py-1.5 px-3 shadow-md animate-fadeIn">
                        <button
                          onClick={() => onUpdateQuantity(dish.id, -1)}
                          className="w-7 h-7 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 flex items-center justify-center transition-colors cursor-pointer"
                          aria-label={`Decrease ${dish.name} quantity`}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-extrabold">{quantity} in Cart</span>
                        <button
                          onClick={() => onUpdateQuantity(dish.id, 1)}
                          className="w-7 h-7 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 flex items-center justify-center transition-colors cursor-pointer"
                          aria-label={`Increase ${dish.name} quantity`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
