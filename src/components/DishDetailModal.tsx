import React, { useState } from 'react';
import { X, Flame, Plus, Check, Star, Sparkles, MessageSquare, ShieldCheck } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { analytics } from '../services/analytics';
import { BUSINESS_INFO } from '../data/restaurantData';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, quantity?: number) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [spiceSelection, setSpiceSelection] = useState<number>(dish?.spiceLevel || 2);
  const [selectedOption, setSelectedOption] = useState<string>(dish?.sizeOptions?.[0] || '');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!dish) return null;

  const handleAdd = () => {
    onAddToCart(dish, quantity);
    analytics.trackDishAdd(dish.name, dish.price, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 900);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Ebun D Foodie! 🍲 I am interested in ordering:\n` +
      `• Product: ${dish.name}\n` +
      `• Portion/Size: ${dish.portionOrSize || 'Standard'}\n` +
      (selectedOption ? `• Option: ${selectedOption}\n` : '') +
      `• Quantity: ${quantity}\n` +
      `• Price: ₦${(dish.price * quantity).toLocaleString()}\n\n` +
      `Please let me know how soon this can be prepared/delivered in Lokoja. Thank you!`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 my-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#181311] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dish Hero Image */}
        <div className="relative aspect-16/9 w-full overflow-hidden bg-stone-900">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover object-center filter brightness-[0.95]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

          {/* Tags in top left */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            {dish.portionOrSize && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500 text-stone-950 shadow-sm">
                {dish.portionOrSize}
              </span>
            )}
            {dish.isBestseller && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-700 text-white shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Bestseller</span>
              </span>
            )}
          </div>

          {/* Title & Rating */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                {dish.name}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-sm bg-stone-950/70 px-2.5 py-1 rounded-lg backdrop-blur-md">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold">{dish.rating}</span>
              <span className="text-xs text-stone-300">({dish.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[50vh] overflow-y-auto">
          
          {/* Description */}
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            {dish.description}
          </p>

          {/* Meta specs */}
          <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-stone-100 dark:bg-[#1F1816] border border-stone-200 dark:border-stone-800 text-center text-xs">
            <div>
              <span className="text-stone-400 block">Preparation</span>
              <span className="font-bold text-stone-900 dark:text-stone-100">{dish.prepTime}</span>
            </div>
            <div>
              <span className="text-stone-400 block">Origin</span>
              <span className="font-bold text-stone-900 dark:text-stone-100">Lokoja Kitchen</span>
            </div>
            <div>
              <span className="text-stone-400 block">Category</span>
              <span className="font-bold capitalize text-amber-600 dark:text-amber-400">{dish.category}</span>
            </div>
          </div>

          {/* Size / Protein Options if available */}
          {dish.sizeOptions && dish.sizeOptions.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Select Option / Variety
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {dish.sizeOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`p-2 rounded-xl border text-xs text-center transition-all cursor-pointer ${
                      selectedOption === opt
                        ? 'border-amber-500 bg-amber-500/15 font-bold text-stone-900 dark:text-white ring-1 ring-amber-500'
                        : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Key Ingredients */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
              Fresh Ingredients & Flavor Profile
            </h4>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 rounded-full text-xs font-medium border border-stone-200 dark:border-stone-700/60"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Pairing Recommendation */}
          {dish.pairingRecommendation && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
              <span className="font-bold text-amber-700 dark:text-amber-400 block mb-0.5">
                Chef’s Pairing Recommendation:
              </span>
              <p className="text-stone-700 dark:text-stone-300">
                {dish.pairingRecommendation}
              </p>
            </div>
          )}

          {/* Custom Spice Level Choice */}
          {dish.spiceLevel && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Select Pepper / Spice Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { level: 1, label: 'Mild', desc: 'Light, friendly spice' },
                  { level: 2, label: 'Medium', desc: 'True Nigerian party heat' },
                  { level: 3, label: 'Extra Hot', desc: 'Rich scotch bonnet fire' },
                ].map((spice) => (
                  <button
                    key={spice.level}
                    type="button"
                    onClick={() => setSpiceSelection(spice.level)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      spiceSelection === spice.level
                        ? 'border-amber-500 bg-amber-500/15 font-bold text-stone-900 dark:text-white ring-1 ring-amber-500'
                        : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <div className="text-xs flex items-center justify-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span>{spice.label}</span>
                    </div>
                    <div className="text-[10px] text-stone-400">{spice.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer with Price and Add to Cart Button */}
        <div className="p-5 bg-stone-50 dark:bg-[#16110F] border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-stone-400">Total Price</div>
            <div className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
              ₦{(dish.price * quantity).toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 bg-stone-200 dark:bg-stone-800 rounded-xl px-3 py-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-stone-500 hover:text-stone-900 dark:hover:text-white text-base font-bold cursor-pointer"
              >
                -
              </button>
              <span className="text-sm font-bold w-4 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-stone-500 hover:text-stone-900 dark:hover:text-white text-base font-bold cursor-pointer"
              >
                +
              </button>
            </div>

            {/* WhatsApp Inquiry Button */}
            <button
              onClick={handleWhatsAppInquiry}
              className="py-3 px-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md transition-all flex items-center justify-center cursor-pointer"
              title="Inquire or Order via WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            {/* Add to Order Button */}
            <button
              onClick={handleAdd}
              className="flex-1 sm:flex-none py-3 px-6 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 text-sm"
            >
              {addedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Order!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Order</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
