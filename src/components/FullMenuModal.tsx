import React, { useState } from 'react';
import { X, Search, Plus, Flame, Sparkles } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { ALL_MENU_ITEMS, CATEGORIES } from '../data/restaurantData';
import { analytics } from '../services/analytics';
import { LotusLogo } from './LotusLogo';

interface FullMenuModalProps {
  isOpen: boolean;
  initialCategory?: string | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem) => void;
  onSelectDish: (dish: MenuItem) => void;
}

export const FullMenuModal: React.FC<FullMenuModalProps> = ({
  isOpen,
  initialCategory,
  onClose,
  onAddToCart,
  onSelectDish,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'all');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredDishes = ALL_MENU_ITEMS.filter((item) => {
    // category filter
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }
    // search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const match =
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.portionOrSize && item.portionOrSize.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 my-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#181311] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-stone-900 dark:bg-[#120E0D] text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <LotusLogo size={36} />
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Ebun D Foodie Catalogue & Store
              </h3>
              <p className="text-xs text-stone-400">
                Fresh party smallchops, firewood jollof, bulk 2.5L pots & celebration trays
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-bar: Search & Category Chips */}
        <div className="p-4 bg-stone-100 dark:bg-[#1C1614] border-b border-stone-200 dark:border-stone-800 shrink-0 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search food (e.g. Smallchops, Jollof, Egusi, Chinchin, Cake)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="text-xs text-stone-500 dark:text-stone-400">
              Showing {filteredDishes.length} items
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-950 font-bold shadow-sm'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              All Items
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="p-6 overflow-y-auto flex-1">
          {filteredDishes.length === 0 ? (
            <div className="py-16 text-center text-stone-400 space-y-2">
              <p className="text-base font-semibold">No items match this selection</p>
              <p className="text-xs">Adjust your search keyword or selected category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-white dark:bg-[#1E1715] rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => onSelectDish(dish)}
                    />
                    
                    {dish.portionOrSize && (
                      <div className="absolute top-2.5 left-2.5 bg-stone-950/80 text-amber-300 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-semibold border border-amber-500/20">
                        {dish.portionOrSize}
                      </div>
                    )}

                    {dish.spiceLevel && (
                      <div className="absolute bottom-2.5 right-2.5 bg-stone-950/80 px-2 py-0.5 rounded-full text-[10px] text-amber-300 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-red-400" />
                        <span>{dish.spiceLevel === 1 ? 'Mild' : dish.spiceLevel === 2 ? 'Medium' : 'Hot'}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4
                        onClick={() => onSelectDish(dish)}
                        className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer"
                      >
                        {dish.name}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-1">
                        {dish.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
                      <div>
                        <span className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                          ₦{dish.price.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          onAddToCart(dish);
                          analytics.trackDishAdd(dish.name, dish.price, 1);
                        }}
                        className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
