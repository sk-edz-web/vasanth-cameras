/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, ShoppingCart, Info, MessageSquare } from 'lucide-react';

interface BottomNavBarProps {
  currentView: string;
  setView: (view: string) => void;
  cartCount: number;
}

export default function BottomNavBar({
  currentView,
  setView,
  cartCount,
}: BottomNavBarProps) {
  const isHomeActive = currentView === 'home' || currentView === 'camera-detail';

  const handleNav = (view: string) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg px-4 py-2 sm:py-3 select-none">
      <div className="max-w-md mx-auto flex items-center justify-around">
        
        {/* Tab 1: Home */}
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center gap-1.5 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            isHomeActive
              ? 'text-blue-600 font-extrabold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${isHomeActive ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[10px] sm:text-xs">Home Shop</span>
        </button>

        {/* Tab 2: Cart */}
        <button
          onClick={() => handleNav('cart')}
          className={`relative flex flex-col items-center gap-1.5 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            currentView === 'cart'
              ? 'text-blue-600 font-extrabold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <ShoppingCart className={`w-5 h-5 transition-transform ${currentView === 'cart' ? 'stroke-[2.5px]' : ''}`} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] sm:text-xs">Cart</span>
        </button>

        {/* Tab 3: About */}
        <button
          onClick={() => handleNav('about')}
          className={`flex flex-col items-center gap-1.5 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            currentView === 'about'
              ? 'text-blue-600 font-extrabold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Info className={`w-5 h-5 transition-transform ${currentView === 'about' ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[10px] sm:text-xs">Our Legacy</span>
        </button>

        {/* Tab 4: Contact */}
        <button
          onClick={() => handleNav('contact')}
          className={`flex flex-col items-center gap-1.5 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            currentView === 'contact'
              ? 'text-blue-600 font-extrabold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className={`w-5 h-5 transition-transform ${currentView === 'contact' ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[10px] sm:text-xs">Contact</span>
        </button>

      </div>
    </div>
  );
}
