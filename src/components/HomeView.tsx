/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera } from '../types';
import { Camera as CameraIcon, ShoppingCart, Eye, ArrowUpAZ, ArrowDownZA, Sparkles, SlidersHorizontal, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  cameras: Camera[];
  loading: boolean;
  onSelectCamera: (camera: Camera) => void;
  onAddToCart: (camera: Camera, e: React.MouseEvent) => void;
  onInstantBuy: (camera: Camera, e: React.MouseEvent) => void;
  searchQuery: string;
}

type SortOption = 'default' | 'price-low' | 'price-high' | 'name-asc';

export default function HomeView({
  cameras,
  loading,
  onSelectCamera,
  onAddToCart,
  onInstantBuy,
  searchQuery,
}: HomeViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Categories
  const categories = ['All', 'Mirrorless', 'Cinema', 'Vintage'];

  // Filter cameras
  const filteredCameras = cameras.filter((camera) => {
    const matchesCategory = selectedCategory === 'All' || camera.category === selectedCategory;
    const matchesSearch =
      camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camera.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camera.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort cameras
  const sortedCameras = [...filteredCameras].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    return 0; // default - no sort
  });

  // Format currency in Indian Rupees
  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      
      {/* Banner / Hero Section */}
      <section className="hidden sm:flex relative overflow-hidden rounded-3xl bg-slate-900 text-white min-h-[180px] sm:min-h-[280px] items-center shadow-lg">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80")' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-slate-900/95" />
        <div className="relative max-w-2xl px-6 py-6 sm:px-12 sm:py-10 space-y-2 sm:space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-blue-400" /> Direct WhatsApp Ordering
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            Premium Camera Shop in Madurai
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
            Grab standard cinema rigs, analog bodies, and ultra-high dynamic range lenses. We prepare next day secure pickup.
          </p>
        </div>
      </section>

      {/* Catalog Filters Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-y border-slate-100 py-4">
        
        {/* Category badges list */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              id={`cat-btn-${category.toLowerCase()}`}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs font-semibold rounded-full shrink-0 transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-100 text-slate-600 hover:border-slate-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort drop downs */}
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sort:</span>
          </div>
          <select
            id="sort-select-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            <option value="default">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {!loading && sortedCameras.length === 0 && (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="mx-auto w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
            <CameraIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">No Premium Cameras Found</h3>
            <p className="text-xs text-slate-500 mt-1">We couldn't find items matching "{searchQuery}" under {selectedCategory}. Try resetting filters.</p>
          </div>
          <button
            onClick={() => { setSelectedCategory('All'); }}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Cameras Grid - Mobile MUST be exactly 2 cards per row ('grid-cols-2') */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {/* Loading Skeleton */}
        {loading &&
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100 space-y-4 shadow-xs">
              <div className="aspect-square w-full bg-slate-100 rounded-xl animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-1/3 bg-slate-100 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse" />
              </div>
            </div>
          ))}

        {/* Real Products Card Rendering */}
        {!loading &&
          sortedCameras.map((camera, index) => (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={camera.id}
              className="group bg-white border border-slate-100 rounded-xl p-3 card-shadow hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              
              {/* Product Card Media & Badge */}
              <div className="relative">
                <button
                  onClick={() => onSelectCamera(camera)}
                  className="w-full aspect-square overflow-hidden bg-slate-50 rounded-lg cursor-pointer block"
                >
                  <img
                    referrerPolicy="no-referrer"
                    src={camera.images[0] || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32'}
                    alt={camera.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </button>

                {/* Condition Tag / New Tag */}
                <span className={`absolute top-2 right-2 text-[8px] sm:text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm ${
                  camera.condition === 'New'
                    ? 'bg-blue-600 text-white'
                    : camera.condition === 'Vintage'
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-800 text-white'
                }`}>
                  {camera.condition === 'New' ? 'NEW' : camera.condition}
                </span>

                {/* Stock Out Flag */}
                {camera.stock <= 0 && (
                  <span className="absolute inset-0 bg-white/70 backdrop-blur-3xs rounded-xl flex items-center justify-center text-xs font-bold text-rose-600 uppercase">
                    Rent / Sold Out
                  </span>
                )}
              </div>

              {/* Product Info Description */}
              <div className="mt-3 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">{camera.brand}</span>
                  <button
                    onClick={() => onSelectCamera(camera)}
                    className="text-xs sm:text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors text-left line-clamp-1 sm:line-clamp-2 mt-0.5"
                  >
                    {camera.name}
                  </button>

                  <div className="flex flex-wrap gap-1 mt-1.5 min-h-[16px]">
                    {camera.specs.slice(0, 2).map((spec, i) => (
                      <span key={i} className="text-[8px] sm:text-[9px] font-medium text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded-md">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Controls & Price */}
                <div className="mt-3.5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-1">
                  <div>
                    <span className="text-[9px] text-slate-400 block font-medium leading-none mb-0.5">Price starts at</span>
                    <span className="text-xs sm:text-sm font-bold text-blue-600">
                      {formatINR(camera.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => onAddToCart(camera, e)}
                      disabled={camera.stock <= 0}
                      className="p-1.5 sm:p-2 rounded-lg border border-slate-150 text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all disabled:opacity-50 duration-200 cursor-pointer"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={(e) => onInstantBuy(camera, e)}
                      disabled={camera.stock <= 0}
                      className="hidden sm:inline-flex bg-slate-900 text-white hover:bg-blue-600 transition-colors px-3 py-1.5 rounded-lg text-xs font-medium leading-none disabled:opacity-50 cursor-pointer"
                    >
                      Buy
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          ))}
      </div>

    </div>
  );
}
