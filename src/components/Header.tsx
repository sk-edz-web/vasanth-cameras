/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, ShoppingCart, User, Search } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  currentView,
  setView,
  cartCount,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass-nav shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Name */}
          <button
            onClick={() => setView('home')}
            id="brand-logo-btn"
            className="flex items-center gap-3 cursor-pointer group shrink-0 font-sans"
          >
            <div className="p-2.5 bg-blue-600 text-white rounded-lg group-hover:bg-blue-700 transition-all duration-300 shadow-md shadow-blue-600/10">
              <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="text-left">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-800 leading-tight uppercase font-sans">
                VASANTH <span className="text-blue-600">CAMERAS</span>
              </h1>
              <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase leading-none mt-0.5">Madurai's Best</p>
            </div>
          </button>

          {/* Search Bar (Visible primarily on Home or as global) */}
          <div className="hidden md:flex items-center max-w-md w-full relative">
            <span className="absolute left-3.5 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              id="desktop-search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'home') setView('home');
              }}
              placeholder="Search camera models (e.g. Sony A7IV)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>

          {/* Right Navigation Controls */}
          <nav className="flex items-center gap-3 text-sm font-medium text-slate-600">
            {/* Shopping Cart Button */}
            <button
              onClick={() => setView('cart')}
              id="nav-cart-btn"
              className={`relative p-2.5 rounded-xl transition-all cursor-pointer ${
                currentView === 'cart'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 sm:h-5 w-4 sm:w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Mobile Search Bar (Only visible on small screen sizes below medium) */}
        <div className="md:hidden pb-4 pt-1 px-1">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              id="mobile-search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'home') setView('home');
              }}
              placeholder="Search camera models (e.g. Sony A7IV)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-150 border-none rounded-full text-xs focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>
        </div>

      </div>
    </header>
  );
}
