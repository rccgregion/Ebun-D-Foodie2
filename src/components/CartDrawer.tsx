import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle2, ShoppingBag, Bike, Store, MessageSquare, Phone } from 'lucide-react';
import { CartItem } from '../types/restaurant';
import { analytics } from '../services/analytics';
import { BUSINESS_INFO } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0; // 10% discount
  const deliveryFee = deliveryType === 'delivery' ? 1500 : 0;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'EBUN10' || promoCode.trim().toUpperCase() === 'LOKOJA') {
      setPromoApplied(true);
      analytics.track('CHECKOUT_SIMULATION', `Applied promo coupon: ${promoCode}`);
    } else {
      alert('Use promo code "EBUN10" for 10% off your order!');
    }
  };

  const handleWhatsAppCheckout = () => {
    const orderId = 'EBF-ORD-' + Math.floor(100000 + Math.random() * 900000);
    const itemList = cartItems
      .map((item, idx) => `${idx + 1}. ${item.menuItem.name} (${item.menuItem.portionOrSize || 'standard'}) x${item.quantity} = ₦${(item.menuItem.price * item.quantity).toLocaleString()}`)
      .join('\n');

    const message = encodeURIComponent(
      `Hello Ebun D Foodie! 🍲\n\nI want to place an order from your online store:\n\n` +
      `Order Ref: ${orderId}\n` +
      `Customer: ${customerName || 'Customer'}\n` +
      `Phone: ${customerPhone || 'Not provided'}\n` +
      `Fulfillment: ${deliveryType === 'delivery' ? 'Doorstep Delivery' : 'Self Pickup at Rock Garden'}\n` +
      (deliveryAddress ? `Address: ${deliveryAddress}\n` : '') +
      `\nItems Ordered:\n${itemList}\n\n` +
      `Subtotal: ₦${subtotal.toLocaleString()}\n` +
      (deliveryFee > 0 ? `Delivery Fee: ₦${deliveryFee.toLocaleString()}\n` : '') +
      (discount > 0 ? `Discount: -₦${discount.toLocaleString()}\n` : '') +
      `Grand Total: ₦${grandTotal.toLocaleString()}\n\n` +
      `Please provide bank account details for transfer or confirm delivery time. Thank you!`
    );

    analytics.track('WHATSAPP_CHECKOUT', `WhatsApp Checkout initiated: #${orderId} (₦${grandTotal})`);
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleDirectCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      const orderId = 'EBF-ORD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderSuccess(orderId);
      setIsCheckingOut(false);
      analytics.track('CHECKOUT_SIMULATION', `Completed online order #${orderId} (₦${grandTotal})`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-50 dark:bg-[#181311] text-stone-900 dark:text-stone-100 shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-white dark:bg-[#1C1614]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                  Your Food Basket
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen after placing order */}
          {orderSuccess ? (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                Order Received!
              </h4>

              <div className="p-4 bg-white dark:bg-[#1F1816] rounded-2xl border border-stone-200 dark:border-stone-800 w-full text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Order Reference:</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{orderSuccess}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Fulfillment:</span>
                  <span className="font-medium capitalize">{deliveryType === 'delivery' ? 'Doorstep Delivery' : 'Pickup at Rock Garden'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Estimated Dispatch:</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">30–45 mins (Hot & Fresh)</span>
                </div>
                <div className="flex justify-between border-t border-stone-200 dark:border-stone-800 pt-2 font-bold text-sm">
                  <span>Grand Total:</span>
                  <span>₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-left text-xs space-y-1 text-stone-700 dark:text-stone-300">
                <p className="font-semibold text-amber-600 dark:text-amber-400">Need Immediate WhatsApp Assistance?</p>
                <p>Send your reference <strong>{orderSuccess}</strong> directly to Chef Ebun at <strong>08158820544</strong>.</p>
              </div>

              <button
                onClick={() => {
                  onClearCart();
                  setOrderSuccess(null);
                  onClose();
                }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-all cursor-pointer shadow-md"
              >
                Back to Menu
              </button>
            </div>
          ) : (
            <>
              {/* Order Style Selector */}
              <div className="p-3 bg-stone-100 dark:bg-[#140F0D] border-b border-stone-200 dark:border-stone-800 flex gap-2">
                <button
                  onClick={() => setDeliveryType('delivery')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    deliveryType === 'delivery'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Lokoja Delivery (+₦1,500)</span>
                </button>
                <button
                  onClick={() => setDeliveryType('pickup')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    deliveryType === 'pickup'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Pickup (Rock Garden)</span>
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {cartItems.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center text-stone-400 space-y-3">
                    <ShoppingBag className="w-12 h-12 stroke-[1.2] text-stone-300 dark:text-stone-700" />
                    <p className="text-sm font-medium">Your basket is currently empty.</p>
                    <p className="text-xs max-w-xs text-stone-500">
                      Explore our smallchops, jollof meals, and 2.5L pots of stew to add items to your order.
                    </p>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div
                        key={item.menuItem.id}
                        className="flex items-center gap-3.5 p-3 rounded-xl bg-white dark:bg-[#1C1614] border border-stone-200 dark:border-stone-800 shadow-sm"
                      >
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold truncate text-stone-900 dark:text-stone-100">
                            {item.menuItem.name}
                          </h4>
                          <p className="text-xs text-stone-500 dark:text-stone-400">
                            ₦{item.menuItem.price.toLocaleString()} {item.menuItem.portionOrSize ? `• ${item.menuItem.portionOrSize}` : ''}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                              ₦{(item.menuItem.price * item.quantity).toLocaleString()}
                            </span>

                            {/* Stepper */}
                            <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 rounded-lg px-2 py-1">
                              <button
                                onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                                className="text-stone-500 hover:text-stone-900 dark:hover:text-white"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-bold w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                                className="text-stone-500 hover:text-stone-900 dark:hover:text-white"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.menuItem.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {/* Quick Customer Info for Checkout */}
                    <div className="p-3.5 bg-stone-100 dark:bg-[#140F0D] rounded-xl border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                      <span className="font-bold text-stone-700 dark:text-stone-300 block">Your Contact & Delivery Info:</span>
                      <input
                        type="text"
                        placeholder="Your Name (e.g. Ebunoluwa)"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-3 py-1.5 rounded-lg text-xs"
                      />
                      <input
                        type="tel"
                        placeholder="Phone / WhatsApp Number"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-3 py-1.5 rounded-lg text-xs"
                      />
                      {deliveryType === 'delivery' && (
                        <input
                          type="text"
                          placeholder="Delivery Address in Lokoja"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-3 py-1.5 rounded-lg text-xs"
                        />
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Promo & Summary Footer */}
              {cartItems.length > 0 && (
                <div className="p-4 bg-white dark:bg-[#1C1614] border-t border-stone-200 dark:border-stone-800 space-y-3.5">
                  {/* Coupon Bar */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (use EBUN10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="flex-1 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-3 py-2 text-xs rounded-lg uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      disabled={promoApplied}
                      className="px-3.5 py-2 bg-stone-800 dark:bg-stone-700 hover:bg-stone-900 text-stone-100 text-xs font-semibold rounded-lg disabled:opacity-50 cursor-pointer"
                    >
                      {promoApplied ? 'Applied ✓' : 'Apply'}
                    </button>
                  </form>

                  {/* Price breakdown */}
                  <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                    <div className="flex justify-between">
                      <span>Item Subtotal:</span>
                      <span className="font-semibold text-stone-900 dark:text-stone-200">₦{subtotal.toLocaleString()}</span>
                    </div>
                    {deliveryType === 'delivery' && (
                      <div className="flex justify-between">
                        <span>Lokoja Dispatch Fee:</span>
                        <span className="text-stone-900 dark:text-stone-200">₦{deliveryFee.toLocaleString()}</span>
                      </div>
                    )}
                    {promoApplied && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                        <span>Discount (10%):</span>
                        <span>-₦{discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-stone-900 dark:text-white pt-2 border-t border-stone-200 dark:border-stone-800">
                      <span>Grand Total:</span>
                      <span className="text-amber-600 dark:text-amber-400">₦{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Checkout Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Order via WhatsApp (Instant)</span>
                    </button>

                    <button
                      onClick={handleDirectCheckout}
                      disabled={isCheckingOut}
                      className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 text-xs disabled:opacity-60"
                    >
                      {isCheckingOut ? (
                        <span>Processing Order...</span>
                      ) : (
                        <>
                          <span>Direct Order Confirmation • ₦{grandTotal.toLocaleString()}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};
