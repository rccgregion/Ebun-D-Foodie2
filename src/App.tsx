import React, { useState, useEffect } from 'react';
import { Header, AppPage } from './components/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactPage } from './pages/ContactPage';

import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AnalyticsModal } from './components/AnalyticsModal';
import { DishDetailModal } from './components/DishDetailModal';

import { MenuItem, CartItem } from './types/restaurant';
import { analytics } from './services/analytics';

const CART_STORAGE_KEY = 'ebundfoodie_cart_v1';
const THEME_STORAGE_KEY = 'ebundfoodie_theme_v1';

export default function App() {
  // Theme state: dark mode by default
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved !== null) {
      return saved === 'dark';
    }
    return true;
  });

  // Page Routing state: exactly Home, Product, About Us, Contact
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'product' || hash === 'products' || hash === 'store' || hash === 'menu') return 'product';
    if (hash === 'about' || hash === 'about-us' || hash === 'story') return 'about';
    if (hash === 'contact' || hash === 'contact-us' || hash === 'bookings') return 'contact';
    return 'home';
  });

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [selectedDishForDetail, setSelectedDishForDetail] = useState<MenuItem | null>(null);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }, [isDark]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore quota error
    }
  }, [cartItems]);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'product' || hash === 'products' || hash === 'store' || hash === 'menu') {
        setCurrentPage('product');
      } else if (hash === 'about' || hash === 'about-us' || hash === 'story') {
        setCurrentPage('about');
      } else if (hash === 'contact' || hash === 'contact-us' || hash === 'bookings') {
        setCurrentPage('contact');
      } else if (hash === 'home' || hash === '') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    analytics.track('PAGE_VIEW', `Navigated to ${page.toUpperCase()} page`);
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      analytics.track('THEME_TOGGLE', `Switched theme to ${next ? 'Dark' : 'Day'}`);
      return next;
    });
  };

  const handleAddToCart = (dish: MenuItem, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.menuItem.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { menuItem: dish, quantity }];
      }
    });
    analytics.trackDishAdd(dish.name, dish.price, quantity);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.menuItem.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1F1916] dark:bg-[#120E0D] dark:text-[#FAF5EE] transition-colors duration-300">
      
      {/* 1. Navigation Header with exactly Home, Product, About Us, Contact */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area - Renders exactly the active page */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            cartItems={cartItems}
            onAddToCart={(dish) => handleAddToCart(dish, 1)}
            onUpdateQuantity={handleUpdateQuantity}
            onSelectDish={(dish) => setSelectedDishForDetail(dish)}
          />
        )}

        {currentPage === 'product' && (
          <ProductPage
            cartItems={cartItems}
            onAddToCart={(dish) => handleAddToCart(dish, 1)}
            onUpdateQuantity={handleUpdateQuantity}
            onSelectDish={(dish) => setSelectedDishForDetail(dish)}
            onNavigateToContact={() => handleNavigate('contact')}
          />
        )}

        {currentPage === 'about' && (
          <AboutUsPage
            onNavigateToProducts={() => handleNavigate('product')}
            onNavigateToContact={() => handleNavigate('contact')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer linking to the 4 pages with Store Analytics Hub */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
      />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onAddToCart={(dish) => handleAddToCart(dish, 1)}
        onSelectDish={(dish) => setSelectedDishForDetail(dish)}
      />

      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      <DishDetailModal
        dish={selectedDishForDetail}
        onClose={() => setSelectedDishForDetail(null)}
        onAddToCart={(dish, qty) => handleAddToCart(dish, qty || 1)}
      />

    </div>
  );
}
