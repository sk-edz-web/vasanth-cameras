/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, ArrowRight, Camera, ShoppingBag } from 'lucide-react';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export default function CartView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}: CartViewProps) {
  
  // Calculations
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.camera.price * curr.quantity, 0);

  // Format currency
  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4 space-y-6">
        <div className="mx-auto w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center border border-slate-100">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-slate-800">Your Cart is Empty</h2>
          <p className="text-sm text-slate-500">Looks like you haven't added any premium cameras to your cart yet.</p>
        </div>
        <button
          onClick={onContinueShopping}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold tracking-wide hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/10 cursor-pointer"
        >
          Browse Cameras
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      
      <div className="flex items-center gap-2">
        <Camera className="w-5 h-5 text-blue-600" />
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Shopping Cart</h2>
        <span className="text-xs font-bold text-slate-400">({cartItems.length} items selected)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Section: Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.camera.id}
              className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-4 items-center justify-between"
            >
              
              {/* Product Thumbnail Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 sm:w-20 aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-50 shrink-0">
                  <img
                    referrerPolicy="no-referrer"
                    src={item.camera.images[0] || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32'}
                    alt={item.camera.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-450 uppercase">{item.camera.brand}</span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-850 line-clamp-1">{item.camera.name}</h3>
                  <span className="text-xs font-semibold text-slate-500 block mt-0.5">{formatINR(item.camera.price)}</span>
                </div>
              </div>

              {/* Controls and Actions */}
              <div className="flex items-center gap-4 shrink-0">
                
                {/* Quantity adjustments */}
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => onUpdateQuantity(item.camera.id, -1)}
                    className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2.5 text-xs font-bold text-slate-800 min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.camera.id, 1)}
                    className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                    disabled={item.quantity >= item.camera.stock}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Trash Button */}
                <button
                  onClick={() => onRemoveItem(item.camera.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                  title="Remove camera"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>

            </div>
          ))}

          {/* Nav buttons */}
          <button
            onClick={onContinueShopping}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition"
          >
            ← Continue adding cameras
          </button>
        </div>

        {/* Right Section: Pricing Summary Panel */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-2xs h-fit space-y-6">
          <h3 className="font-bold text-slate-800 text-lg">Billing Summary</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-805">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Device Insurance Fee</span>
              <span className="font-semibold text-emerald-600 text-xs py-0.5 px-2 bg-emerald-50 rounded-md">FREE</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Pick-up / Shipping Delivery</span>
              <span className="font-semibold text-emerald-600 text-xs py-0.5 px-2 bg-emerald-50 rounded-md">FREE</span>
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between text-slate-900 font-extrabold text-base">
              <span>Final Total</span>
              <span className="text-xl text-slate-950">{formatINR(subtotal)}</span>
            </div>
          </div>

          <button
            onClick={onProceedToCheckout}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm tracking-wide hover:bg-blue-700 transition-all shadow-md shadow-blue-600/10 cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
