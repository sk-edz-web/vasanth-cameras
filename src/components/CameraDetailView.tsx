/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera } from '../types';
import { ChevronLeft, ShoppingCart, CheckCircle2, ChevronRight, Package, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface CameraDetailViewProps {
  camera: Camera;
  onBack: () => void;
  onAddToCart: (camera: Camera) => void;
  onInstantBuy: (camera: Camera) => void;
}

export default function CameraDetailView({
  camera,
  onBack,
  onAddToCart,
  onInstantBuy,
}: CameraDetailViewProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Format currency
  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % camera.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + camera.images.length) % camera.images.length);
  };

  return (
    <div className="pb-16 max-w-5xl mx-auto space-y-6">
      
      {/* Back Navigation Bar */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:border-slate-350 transition-all cursor-pointer shadow-2xs"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Store Catalog</span>
      </button>

      {/* Main Container Grid */}
      <div className="bg-white border border-slate-100 rounded-3xl p-4 sm:p-10 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Column: Mult-Image Showcase Carousel */}
        <div className="space-y-4">
          <div className="relative aspect-square border border-slate-50 bg-slate-50/50 rounded-2xl overflow-hidden group">
            <img
              referrerPolicy="no-referrer"
              src={camera.images[activeImageIndex] || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32'}
              alt={camera.name}
              className="w-full h-full object-cover transition-transform duration-300"
            />

            {/* Carousel navigation overlays */}
            {camera.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-sm border border-slate-100 text-slate-700 hover:bg-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-sm border border-slate-100 text-slate-700 hover:bg-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dot Index Displays */}
                <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-1.5">
                  {camera.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === activeImageIndex ? 'w-5 bg-blue-600' : 'w-2 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Alternate Thumbnails Picker */}
          {camera.images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto py-1">
              {camera.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 aspect-video rounded-lg overflow-hidden border-2 shrink-0 cursor-pointer ${
                    idx === activeImageIndex ? 'border-blue-600' : 'border-slate-100 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img referrerPolicy="no-referrer" src={imgUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Detailed Purchase Specifications */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Header tags info */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg tracking-wider uppercase">
                {camera.brand}
              </span>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                {camera.condition}
              </span>
              {camera.stock > 0 ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock ({camera.stock} units)
                </span>
              ) : (
                <span className="text-xs font-semibold text-rose-500">Out of Stock</span>
              )}
            </div>

            {/* Brand Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {camera.name}
            </h2>

            {/* Exact Price */}
            <div className="border-y border-slate-100 py-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-blue-600">{formatINR(camera.price)}</span>
              <span className="text-xs text-slate-400">Fixed shop price, VAT / GST included</span>
            </div>

            {/* Description Paragraph */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Device Overview</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {camera.description}
              </p>
            </div>

            {/* Technical Bullet Spec list */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Technical Specifications</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {camera.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Checkout controls */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onAddToCart(camera)}
              disabled={camera.stock <= 0}
              className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-slate-100 text-slate-800 rounded-xl font-bold text-sm tracking-wide hover:bg-slate-200 hover:text-slate-950 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={() => onInstantBuy(camera)}
              disabled={camera.stock <= 0}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm tracking-wide hover:bg-blue-700 transition-all shadow-md shadow-blue-600/10 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              Buy Now & Place Order
            </button>
          </div>

          {/* Guaranteed help banner */}
          <div className="mt-4 p-3 bg-slate-50 rounded-xl flex items-start gap-2.5 border border-slate-100">
            <Package className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 leading-normal">
              <strong>Need customization or custom mount rings?</strong> Vasanth Cameras provides direct assistance and on-demand setup matching before finalizing delivery.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
