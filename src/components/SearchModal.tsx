import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Plus } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { ALL_MENU_ITEMS } from '../data/restaurantData';
import { analytics } from '../services/analytics';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  onSelectDish: (item: MenuItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onSelectDish,
}) => {
  const [query, setQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string>('All');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    let items = ALL_MENU_ITEMS;

    if (filterTag === 'Smallchops') {
      items = items.filter((item) => item.category === 'smallchops');
    } else if (filterTag === 'Meals & Pots') {
      items = items.filter((item) => item.category === 'meals' || item.category === 'soups-stews');
    } else if (filterTag === 'Snacks & Cakes') {
      items = items.filter((item) => item.category === 'pastries-snacks' || item.category === 'cakes-trays');
    }

    if (!query.trim()) return items.slice(0, 10);

    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.portionOrSize && item.portionOrSize.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  }, [query, filterTag]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#181311] text-stone-900 dark:text-stone-100 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search food, snacks (e.g. Smallchops, Jollof, Egusi, Meatpie, Chinchin, Cake)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.length > 2) {
                analytics.track('MENU_FILTER', `Searched: "${e.target.value}"`);
              }
            }}
            className="flex-1 bg-transparent border-none text-base sm:text-lg focus:outline-none placeholder:text-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-stone-400 hover:text-stone-600 px-2 py-1 rounded cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-3 bg-stone-50 dark:bg-[#140F0D] border-b border-stone-200 dark:border-stone-800 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          {['All', 'Smallchops', 'Meals & Pots', 'Snacks & Cakes'].map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer shrink-0 ${
                filterTag === tag
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-300'
              }`}
            >
              {tag}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-stone-400 hidden sm:inline">
            {filteredResults.length} item{filteredResults.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-2">
              <p className="text-sm font-medium">No food items match "{query}"</p>
              <p className="text-xs">Try searching for Smallchops, Jollof, Stew, Chinchin, or Cake.</p>
            </div>
          ) : (
            filteredResults.map((dish) => (
              <div
                key={dish.id}
                className="group p-3 rounded-xl bg-stone-50 dark:bg-[#1E1715] hover:bg-amber-500/5 border border-stone-200/80 dark:border-stone-800 flex items-center gap-3.5 transition-all"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectDish(dish);
                    onClose();
                  }}
                />

                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    onSelectDish(dish);
                    onClose();
                  }}
                >
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 truncate">
                    {dish.name}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                    {dish.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                      ₦{dish.price.toLocaleString()}
                    </span>
                    {dish.portionOrSize && (
                      <span className="text-[10px] text-stone-400">• {dish.portionOrSize}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(dish);
                    analytics.trackDishAdd(dish.name, dish.price, 1);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
