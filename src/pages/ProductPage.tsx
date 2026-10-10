import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Flame, Sparkles, MessageSquare, Info, Filter } from 'lucide-react';
import { ALL_MENU_ITEMS, CATEGORIES, BUSINESS_INFO } from '../data/restaurantData';
import { MenuItem, CartItem, CategoryId } from '../types/restaurant';

interface ProductPageProps {
  cartItems: CartItem[];
  onAddToCart: (dish: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onSelectDish: (dish: MenuItem) => void;
  onNavigateToContact: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onSelectDish,
  onNavigateToContact,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceSort, setPriceSort] = useState<'default' | 'low-high' | 'high-low'>('default');

  const getItemQuantity = (id: string): number => {
    const found = cartItems.find((c) => c.menuItem.id === id);
    return found ? found.quantity : 0;
  };

  const filteredProducts = useMemo(() => {
    let items = ALL_MENU_ITEMS;

    // Filter by Category
    if (selectedCategory !== 'all') {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.portionOrSize && item.portionOrSize.toLowerCase().includes(q)) ||
          item.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    // Sort by Price
    if (priceSort === 'low-high') {
      return [...items].sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high-low') {
      return [...items].sort((a, b) => b.price - a.price);
    }

    return items;
  }, [selectedCategory, searchQuery, priceSort]);

  const handleWhatsAppQuickInquiry = (dish: MenuItem) => {
    const text = encodeURIComponent(
      `Hello Ebun D Foodie! 🍲 I would like to order/inquire about:\n` +
      `• Product: ${dish.name} (${dish.portionOrSize || 'standard'})\n` +
      `• Price: ₦${dish.price.toLocaleString()}\n\n` +
      `How soon can this be ready in Lokoja? Thank you!`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Page Title & Breadcrumb */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] text-amber-600 dark:text-amber-500 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ONLINE STORE & CATALOG</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Our Products & Delicacies
          </h1>
          <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 mt-1 max-w-2xl">
            Explore authentic Nigerian dishes, freshly fried party smallchops platters, 2.5L pots of stew, crunchy milky chinchin, and celebration cakes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToContact}
            className="text-xs sm:text-sm font-semibold px-4 py-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl text-stone-700 dark:text-stone-300 transition-colors"
          >
            Need Custom Event Catering? Contact Us
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#181311] p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-amber-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products (e.g. Smallchops, Jollof, Egusi, Chinchin)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 dark:text-stone-400 hidden sm:inline">Sort:</span>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as any)}
              className="px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="default">Featured First</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            All Products ({ALL_MENU_ITEMS.length})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {cat.name} ({cat.itemCount})
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-stone-400 space-y-3 bg-white dark:bg-[#181311] rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
          <p className="text-lg font-bold text-stone-800 dark:text-stone-200">No items match your search criteria</p>
          <p className="text-sm">Try searching for "smallchops", "jollof", "meatpie", or select "All Products".</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-2 px-5 py-2 bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((dish) => {
            const quantity = getItemQuantity(dish.id);

            return (
              <div
                key={dish.id}
                className="group bg-white dark:bg-[#1B1513] rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl dark:hover:shadow-amber-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Image */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-200 dark:bg-stone-800">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 cursor-pointer"
                    onClick={() => onSelectDish(dish)}
                    loading="lazy"
                  />

                  {/* Size or Portion Badge */}
                  {dish.portionOrSize && (
                    <div className="absolute top-3 left-3 bg-stone-900/90 text-amber-300 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-semibold border border-amber-500/30">
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
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3
                      onClick={() => onSelectDish(dish)}
                      className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {dish.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>

                    {/* Ingredients summary */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {dish.ingredients.slice(0, 3).map((ing, i) => (
                        <span key={i} className="text-[10px] bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 px-2 py-0.5 rounded-md">
                          {ing}
                        </span>
                      ))}
                      {dish.ingredients.length > 3 && (
                        <span className="text-[10px] text-stone-400 self-center">+{dish.ingredients.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  {/* Pricing & Order Actions */}
                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                        ₦{dish.price.toLocaleString()}
                      </span>

                      {/* WhatsApp quick order icon */}
                      <button
                        onClick={() => handleWhatsAppQuickInquiry(dish)}
                        className="p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors cursor-pointer"
                        title="Inquire directly on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity controls or Add to Order button */}
                    {quantity === 0 ? (
                      <button
                        onClick={() => onAddToCart(dish)}
                        className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98]"
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
                        <span className="text-xs sm:text-sm font-extrabold">{quantity} in Cart</span>
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
      )}

      {/* Bottom Information Box for Bulk Orders */}
      <div className="p-6 sm:p-8 bg-amber-500/10 border border-amber-500/20 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
            Planning a Major Celebration or Need 50L Pots?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            We provide bespoke catering packages for weddings, corporate meetings, and family celebrations across Kogi State.
          </p>
        </div>

        <button
          onClick={onNavigateToContact}
          className="px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs sm:text-sm rounded-full shrink-0 hover:bg-amber-600 dark:hover:bg-amber-400 transition-colors cursor-pointer shadow"
        >
          Contact Us for Catering
        </button>
      </div>

    </div>
  );
};
