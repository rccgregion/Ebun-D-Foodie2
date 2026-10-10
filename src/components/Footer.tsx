import React from 'react';
import { MapPin, Phone, Mail, Clock, Heart, ArrowUp, MessageSquare, Video, BarChart3 } from 'lucide-react';
import { LotusLogo } from './LotusLogo';
import { BUSINESS_INFO } from '../data/restaurantData';
import { AppPage } from './Header';

interface FooterProps {
  onNavigate: (page: AppPage) => void;
  onOpenAnalytics: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAnalytics }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: AppPage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F8F4EE] dark:bg-[#0E0A09] text-stone-700 dark:text-stone-300 pt-16 pb-12 border-t border-stone-200 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-stone-300/80 dark:border-stone-800/80">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <LotusLogo size={42} />
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-amber-700 dark:text-amber-400 block">
                  EBUN D FOODIE
                </span>
                <span className="text-[10px] tracking-[0.22em] font-medium text-stone-500 dark:text-stone-400 uppercase block">
                  MEALS • SNACKS • CATERING
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
              Authentic homemade Nigerian meals, party smallchops platters, 2.5L pots of rich stews, and celebration food trays crafted with passion in Lokoja, Kogi State.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat with Ebun D Foodie on WhatsApp"
                className="w-10 h-10 rounded-full bg-white dark:bg-stone-900 hover:bg-emerald-600 hover:text-white text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-colors border border-stone-200 dark:border-stone-800 shadow-xs"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Ebun D Foodie on TikTok"
                className="w-10 h-10 rounded-full bg-white dark:bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-stone-600 dark:text-stone-300 flex items-center justify-center transition-colors border border-stone-200 dark:border-stone-800 shadow-xs"
                title="Watch on TikTok (@ebundfoodie1)"
              >
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links: Exactly the 4 Pages (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Website Pages
            </h4>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('product')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Product (Online Store)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  About Us (Our Story & Kitchen)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Contact & Bookings
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Products (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Popular Items
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
              <li>Smallchops Beef Platter</li>
              <li>2.5L Beef & Ponmo Stew</li>
              <li>Smokey Party Jollof</li>
              <li>2L Fish & Ponmo Egusi</li>
              <li>Milky Crunchy Chinchin</li>
              <li>VIP Surprise Food Tray</li>
              <li>Celebration Cakes</li>
            </ul>
          </div>

          {/* Visit Us Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Contact & Location
            </h4>

            <div className="space-y-2.5 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p>{BUSINESS_INFO.location}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${BUSINESS_INFO.phones[0]}`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium">
                    {BUSINESS_INFO.phones[0]}
                  </a>
                  <a href={`tel:${BUSINESS_INFO.phones[1]}`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-stone-500 dark:text-stone-400 text-[11px]">
                    {BUSINESS_INFO.phones[1]} (Calls / WhatsApp)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p>{BUSINESS_INFO.openingHours}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Perfectly Placed Analytics Button + Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <p>
            © {new Date().getFullYear()} Ebun D Foodie. All rights reserved. Lokoja, Kogi State, Nigeria.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Live Analytics Button placed cleanly in the footer */}
            <button
              onClick={onOpenAnalytics}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-full border border-stone-200 dark:border-stone-800 transition-all cursor-pointer shadow-xs"
              title="View Live Store & Conversion Analytics"
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Store Analytics Hub</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" /> in Lokoja
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white border border-stone-200 dark:border-stone-800 transition-colors cursor-pointer shadow-xs"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
