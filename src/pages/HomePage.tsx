import React from 'react';
import { ArrowRight, Sparkles, Flame, ChefHat, Award, Heart, MapPin, ShoppingBag, Gift } from 'lucide-react';
import { BUSINESS_INFO, BESTSELLER_ITEMS, TESTIMONIALS } from '../data/restaurantData';
import { MenuItem, CartItem } from '../types/restaurant';

interface HomePageProps {
  onNavigate: (page: 'home' | 'product' | 'about' | 'contact') => void;
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onSelectDish: (item: MenuItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onSelectDish,
}) => {
  const getItemQuantity = (id: string): number => {
    const found = cartItems.find((c) => c.menuItem.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section - Elegantly styled for both Light and Dark mode */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-amber-50/70 via-[#FAF7F2] to-[#F5EFEB]/50 dark:from-stone-950 dark:via-[#120E0D] dark:to-stone-950 text-stone-900 dark:text-stone-100 border-b border-stone-200/60 dark:border-stone-800/80 transition-colors duration-300">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-400/15 dark:bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-300/10 dark:bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 dark:bg-amber-950/60 border border-amber-300/70 dark:border-amber-800/50 text-amber-800 dark:text-amber-300 text-xs tracking-[0.16em] font-semibold uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>FRESH HOMEMADE FLAVORS • LOKOJA, KOGI STATE</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-[1.08]">
                  Good Food, <br className="hidden sm:inline" />
                  <span className="text-amber-600 dark:text-amber-400 italic font-normal">Memorable</span> Taste
                </h1>
                <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-xl mx-auto lg:mx-0 font-normal dark:font-light leading-relaxed">
                  Authentic firewood smokey party jollof, loaded smallchops platters, 2.5L pots of rich stews, milky chinchin, and luxury celebration food trays in Lokoja.
                </p>
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-stone-700 dark:text-amber-300/90 bg-white/90 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-xl border border-stone-200 dark:border-amber-900/30 shadow-2xs">
                  <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-medium">{BUSINESS_INFO.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('product')}
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold px-7 py-3.5 rounded-full shadow-md hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-sm sm:text-base"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Explore Products & Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 bg-white dark:bg-stone-900/90 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-100 font-semibold px-7 py-3.5 rounded-full border border-stone-300 dark:border-stone-700/80 hover:border-amber-500/60 dark:hover:border-amber-400/60 transition-all text-sm sm:text-base cursor-pointer hover:-translate-y-0.5 active:translate-y-0 shadow-2xs"
                >
                  <span>Book Catering / Contact</span>
                </button>
              </div>

              {/* 4 Pillars Under Buttons */}
              <div className="pt-6 sm:pt-8 border-t border-stone-200 dark:border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-center text-amber-700 dark:text-amber-400 shadow-2xs">
                    <Flame className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Smokey Party<br />Jollof & Soups
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-center text-amber-700 dark:text-amber-400 shadow-2xs">
                    <ChefHat className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Crispy Hot<br />Smallchops
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-center text-amber-700 dark:text-amber-400 shadow-2xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    2.5L Bulk Pots<br />& Meatpies
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-center text-amber-700 dark:text-amber-400 shadow-2xs">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Surprise VIP<br />Food Trays
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md sm:max-w-xl lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden border border-amber-300/50 dark:border-amber-500/20 shadow-xl dark:shadow-2xl bg-gradient-to-b from-stone-100 to-stone-200 dark:from-stone-900 dark:to-stone-950 group">
                  <img
                    src="/images/smokey_party_jollof_plate_4k.jpg"
                    alt="Authentic Nigerian Smokey Party Jollof Rice by Ebun D Foodie"
                    className="w-full h-[380px] sm:h-[460px] lg:h-[500px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter brightness-[0.98]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

                  <div className="absolute top-6 right-6 text-right max-w-[200px]">
                    <p className="font-script text-3xl sm:text-4xl text-amber-300 font-bold leading-tight drop-shadow-md transform -rotate-3">
                      Taste the Joy in Every Bite!
                    </p>
                    <div className="h-0.5 w-16 bg-amber-400/80 ml-auto mt-1 rounded-full" />
                  </div>

                  {/* Floating card */}
                  <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white/95 dark:bg-stone-950/90 backdrop-blur-md border border-stone-200 dark:border-amber-500/30 rounded-2xl p-4 shadow-xl flex items-center gap-4 text-stone-900 dark:text-stone-100">
                    <img
                      src="/images/smallchops_beef_platter_16k.jpg"
                      alt="Smallchops beef platter"
                      className="w-14 h-14 rounded-xl object-cover border border-amber-500/40 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Top Event Pick</span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold">₦16,000</span>
                      </div>
                      <p className="text-sm font-bold text-stone-900 dark:text-stone-100">Smallchops Beef Platter</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">Golden Samosas, Spring Rolls, Puff Puff & Beef</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Featured Bestsellers Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-amber-600 dark:text-amber-500 uppercase">
              POPULAR CHOICES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Our Signature Specialties
            </h2>
          </div>

          <button
            onClick={() => onNavigate('product')}
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Products in Store</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BESTSELLER_ITEMS.slice(0, 4).map((dish) => {
            const quantity = getItemQuantity(dish.id);
            return (
              <div
                key={dish.id}
                className="group bg-white dark:bg-[#1B1513] rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 cursor-pointer"
                    onClick={() => onSelectDish(dish)}
                  />
                  {dish.portionOrSize && (
                    <div className="absolute top-3 left-3 bg-stone-900/90 text-amber-300 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-semibold border border-amber-500/30">
                      {dish.portionOrSize}
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3
                      onClick={() => onSelectDish(dish)}
                      className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {dish.name}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                    <span className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                      ₦{dish.price.toLocaleString()}
                    </span>

                    <button
                      onClick={() => onAddToCart(dish)}
                      className="py-2 px-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer active:scale-95"
                    >
                      {quantity > 0 ? `In Cart (${quantity})` : 'Add to Order'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Event Catering & Surprise Trays Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-stone-950 text-white shadow-xl border border-amber-500/20">
          <div className="absolute inset-0">
            <img
              src="/images/luxury_food_tray_150k.jpg"
              alt="Celebration Catering"
              className="w-full h-full object-cover filter brightness-[0.35]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-14 lg:p-16 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>SURPRISE TRAYS & EVENT SERVICES</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              Celebrate in Style with Ebun D Foodie
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              From luxurious 3-tier birthday surprise food trays with wine and pastries to 200-piece party smallchops packages for weddings and corporate gatherings.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3 rounded-full text-sm shadow-md transition-all cursor-pointer"
              >
                Inquire for Events & Bookings
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 font-semibold px-6 py-3 rounded-full text-sm transition-all cursor-pointer"
              >
                Learn Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold tracking-[0.2em] text-amber-600 dark:text-amber-500 uppercase">
            COMMUNITY LOVE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
            What Foodies in Lokoja Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-[#1B1513] rounded-2xl p-6 border border-stone-200/90 dark:border-stone-800/80 shadow-sm flex flex-col justify-between space-y-4"
            >
              <p className="text-sm text-stone-700 dark:text-stone-300 italic">
                "{rev.comment}"
              </p>
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">{rev.name}</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400">{rev.location}</p>
                </div>
                <div className="text-amber-500 text-xs font-bold">★ 5.0</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
