import React, { useState, useEffect } from 'react';
import { X, BarChart3, TrendingUp, Users, ShoppingBag, Calendar, Sparkles, RefreshCw, Activity, ArrowUpRight } from 'lucide-react';
import { analytics } from '../services/analytics';
import { AnalyticsSummary } from '../types/restaurant';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ isOpen, onClose }) => {
  const [summary, setSummary] = useState<AnalyticsSummary>(analytics.getSummary());

  useEffect(() => {
    const unsubscribe = analytics.subscribe(() => {
      setSummary(analytics.getSummary());
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const conversionRate = summary.pageViews > 0
    ? ((summary.bookingsConfirmed / summary.pageViews) * 100).toFixed(1)
    : '0.0';

  const cartAddRate = summary.pageViews > 0
    ? ((summary.cartAdditions / summary.pageViews) * 100).toFixed(1)
    : '0.0';

  const popularEntries = Object.entries(summary.dishPopularity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const maxDishCount = popularEntries.length > 0 ? popularEntries[0][1] : 1;

  const handleSimulateVisitor = () => {
    analytics.track('PAGE_VIEW', 'Simulated visitor session from Lokoja Metropolis');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 my-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#181311] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-5 bg-stone-900 dark:bg-[#120E0D] text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-white">
                  Ebun D Foodie Analytics & Conversion Hub
                </h3>
                <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Engine
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Real-time tracking of visitor traffic, orders, WhatsApp leads & catering bookings
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Total Pageviews */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#1F1816] border border-stone-200 dark:border-stone-800 space-y-1">
              <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
                <span>Page Impressions</span>
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
                {summary.pageViews.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                <span>{summary.uniqueVisitors} Unique Visitors</span>
              </div>
            </div>

            {/* Cart Additions */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#1F1816] border border-stone-200 dark:border-stone-800 space-y-1">
              <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
                <span>Cart Additions</span>
                <ShoppingBag className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
                {summary.cartAdditions.toLocaleString()}
              </div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400">
                <span>{cartAddRate}% Add-to-Basket Rate</span>
              </div>
            </div>

            {/* Bookings / WhatsApp */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#1F1816] border border-stone-200 dark:border-stone-800 space-y-1">
              <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
                <span>Confirmed Leads</span>
                <Calendar className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
                {summary.bookingsConfirmed.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
                <span>{conversionRate}% Booking Conv.</span>
              </div>
            </div>

            {/* Order Volume in Naira */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#1F1816] border border-stone-200 dark:border-stone-800 space-y-1">
              <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
                <span>Total Order Pipeline</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-bold font-serif text-emerald-600 dark:text-emerald-400">
                ₦{summary.totalOrderValue.toLocaleString()}
              </div>
              <div className="text-[11px] text-stone-500">
                <span>Online & WhatsApp Pipeline</span>
              </div>
            </div>

          </div>

          {/* Popular Items Chart */}
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-[#1F1816] border border-stone-200 dark:border-stone-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Most In-Demand Food & Snacks</span>
            </h4>

            <div className="space-y-3">
              {popularEntries.map(([dishName, count]) => {
                const percent = Math.round((count / maxDishCount) * 100);
                return (
                  <div key={dishName} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-stone-800 dark:text-stone-200">{dishName}</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">{count} orders</span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Activity Feed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span>Recent Live Customer Activity</span>
              </h4>
              <button
                onClick={handleSimulateVisitor}
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Simulate Visitor Event</span>
              </button>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto">
              {summary.events.slice(0, 10).map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-xl bg-stone-50 dark:bg-[#1E1715] border border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-stone-700 dark:text-stone-300 font-medium">{ev.details}</span>
                  </div>
                  <span className="text-[11px] text-stone-400 shrink-0 ml-3">{ev.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
