import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Sun, Moon, Menu, X, ArrowRight, PhoneCall } from 'lucide-react';
import { LotusLogo } from './LotusLogo';
import { BUSINESS_INFO } from '../data/restaurantData';

export type AppPage = 'home' | 'product' | 'about' | 'contact';

interface HeaderProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  isDark,
  onToggleTheme,
}) => {
  const [showTopBar, setShowTopBar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; page: AppPage }[] = [
    { name: 'Home', page: 'home' },
    { name: 'Product', page: 'product' },
    { name: 'About Us', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: AppPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-300">
      {/* Top Announcement Bar */}
      {showTopBar && (
        <div className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-amber-100 text-xs sm:text-sm py-2 px-4 transition-all duration-300 border-b border-amber-700/40">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center pr-8 sm:pr-0">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="text-amber-400">✨</span>
              <span>Fresh Nigerian meals, party smallchops platters & surprise food trays in Lokoja!</span>
            </span>
            <button
              onClick={() => handleNavClick('product')}
              className="inline-flex items-center gap-1 font-semibold text-amber-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer ml-1"
            >
              <span>Order Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            onClick={() => setShowTopBar(false)}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-amber-200/80 hover:text-white rounded-full hover:bg-amber-800/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#120E0D]/95 text-stone-900 dark:text-stone-100 backdrop-blur-md shadow-md border-b border-stone-200/80 dark:border-amber-900/20'
            : 'bg-white/90 dark:bg-[#120E0D]/90 text-stone-900 dark:text-stone-100 backdrop-blur-sm border-b border-stone-200/60 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Name */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1 text-left cursor-pointer"
              aria-label="Ebun D Foodie Home"
            >
              <LotusLogo className="group-hover:scale-105 transition-transform duration-300" size={42} />
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-amber-700 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors leading-tight">
                  EBUN D FOODIE
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-[0.2em] font-medium text-stone-500 dark:text-stone-400 uppercase">
                  Meals • Snacks • Catering
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-sm tracking-wide transition-all duration-200 relative py-1 cursor-pointer font-medium ${
                    currentPage === link.page
                      ? 'text-amber-600 dark:text-amber-400 font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
                >
                  {link.name}
                  {currentPage === link.page && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 dark:bg-amber-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                aria-label="Search dishes and snacks"
                className="p-2 sm:p-2.5 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
                title="Search Products (⌘K)"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Toggle (Day / Dark Mode) */}
              <button
                onClick={onToggleTheme}
                aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                className="p-2 sm:p-2.5 rounded-full border border-stone-200 dark:border-stone-800 bg-stone-100/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400/50 transition-all cursor-pointer shadow-xs"
                title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
                ) : (
                  <Moon className="w-5 h-5 text-stone-700" />
                )}
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={onOpenCart}
                aria-label={`View cart (${cartCount} items)`}
                className="relative p-2 sm:p-2.5 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-bold text-[11px] min-w-[20px] h-5 rounded-full flex items-center justify-center px-1 shadow-sm">
                  {cartCount}
                </span>
              </button>

              {/* Primary CTA: Store Button */}
              <button
                onClick={() => handleNavClick('product')}
                className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Store</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="md:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/98 dark:bg-stone-950/98 border-t border-stone-200 dark:border-stone-800 px-4 pt-4 pb-6 space-y-3 shadow-lg animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors text-left cursor-pointer ${
                    currentPage === link.page
                      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-l-4 border-amber-500 font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('product')}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-bold py-3 rounded-full shadow-md cursor-pointer"
              >
                <span>Browse Product Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-stone-500 dark:text-stone-400 pt-1">
                <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                <span>Lokoja Hotline: {BUSINESS_INFO.phones[0]} / {BUSINESS_INFO.phones[1]}</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
