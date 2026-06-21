/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import CameraDetailView from './components/CameraDetailView';
import CartView from './components/CartView';
import AddressView from './components/AddressView';
import BuyView from './components/BuyView';
import ContactView from './components/ContactView';
import AboutView from './components/AboutView';
import BottomNavBar from './components/BottomNavBar';

import { Camera, CartItem, CheckoutDetails } from './types';
import { getCamerasList } from './dbHelper';
import { SAMPLE_CAMERAS } from './data';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation State
  const [currentView, setView] = useState<string>('home'); // home, camera-detail, cart, address, buy, contact, about
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  // Data States
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Checkout States
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [customerDetails, setCustomerDetails] = useState<CheckoutDetails | null>(null);

  // Load Initial Product List from DB helper
  const loadCameras = async () => {
    setLoading(true);
    try {
      const data = await getCamerasList();
      setCameras(data);
    } catch (e) {
      console.error("Failed to load cameras list", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCameras();

    // Recover Cart state from localStorage
    const savedCart = localStorage.getItem('vasanth_cameras_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync Cart to localStorage on change
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('vasanth_cameras_cart', JSON.stringify(items));
  };

  // 1. ADD TO CART HANDLER
  const handleAddToCart = (camera: Camera, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const existingIndex = cartItems.findIndex((item) => item.camera.id === camera.id);
    let updated: CartItem[];
    if (existingIndex >= 0) {
      updated = [...cartItems];
      // Bound by in-stock count
      if (updated[existingIndex].quantity < camera.stock) {
        updated[existingIndex].quantity += 1;
      }
    } else {
      updated = [...cartItems, { camera, quantity: 1 }];
    }
    saveCart(updated);
  };

  // 2. QUANTITY UPDATES
  const handleUpdateQuantity = (id: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.camera.id === id) {
          const nextQty = item.quantity + delta;
          const maxStock = item.camera.stock;
          return {
            ...item,
            quantity: Math.max(1, Math.min(nextQty, maxStock)),
          };
        }
        return item;
      });
    saveCart(updated);
  };

  // 3. REMOVE ITEM
  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter((item) => item.camera.id !== id);
    saveCart(updated);
  };

  // 4. CHOOSE CARD CLICK DETAIL
  const handleSelectCamera = (camera: Camera) => {
    setSelectedCamera(camera);
    setView('camera-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 5. CART TO ADDRESS TRANSITION
  const handleProceedToCheckout = () => {
    setCheckoutItems(cartItems);
    setView('address');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 6. INSTANT PURCHASE DIRECT FLOW (one product click, bypass Cart)
  const handleInstantBuy = (camera: Camera, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setCheckoutItems([{ camera, quantity: 1 }]);
    setView('address');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 7. COMPACT ADDRESS FORM SUBMISSION
  const handleSubmitAddress = (details: CheckoutDetails) => {
    setCustomerDetails(details);
    setView('buy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 8. AFTER WHATSAPP TRIGGER - RESET STUFF
  const handleClearCartAndOrder = () => {
    saveCart([]); // Empty browser shopping cart
    setCheckoutItems([]);
    setView('home');
  };

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pb-20">
      
      {/* Navigation Header */}
      <Header
        currentView={currentView}
        setView={(v) => {
          setView(v);
          window.scrollTo({ top: 0 });
        }}
        cartCount={cartCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area with elegant fade layout animation */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            id={`view-container-${currentView}`}
          >
            {currentView === 'home' && (
              <HomeView
                cameras={cameras}
                loading={loading}
                onSelectCamera={handleSelectCamera}
                onAddToCart={handleAddToCart}
                onInstantBuy={handleInstantBuy}
                searchQuery={searchQuery}
              />
            )}

            {currentView === 'camera-detail' && selectedCamera && (
              <CameraDetailView
                camera={selectedCamera}
                onBack={() => setView('home')}
                onAddToCart={(cam) => {
                  handleAddToCart(cam);
                  setView('cart');
                }}
                onInstantBuy={(cam) => handleInstantBuy(cam)}
              />
            )}

            {currentView === 'cart' && (
              <CartView
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onProceedToCheckout={handleProceedToCheckout}
                onContinueShopping={() => setView('home')}
              />
            )}

            {currentView === 'address' && (
              <AddressView
                onSubmit={handleSubmitAddress}
                onBack={() => setView('cart')}
              />
            )}

            {currentView === 'buy' && customerDetails && (
              <BuyView
                checkoutItems={checkoutItems}
                customerDetails={customerDetails}
                onBack={() => setView('address')}
                onClearCartAndOrder={handleClearCartAndOrder}
              />
            )}

            {currentView === 'contact' && <ContactView />}

            {currentView === 'about' && <AboutView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Clean matching Footer */}
      <Footer
        setView={(v) => {
          setView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating Sleek Interface WhatsApp Button positioned neatly above bottom nav */}
      <div className="fixed bottom-24 right-4 sm:right-6 z-40">
        <a
          href="https://wa.me/917603957492"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-emerald-500/20 font-bold hover:scale-105 transition-all text-xs sm:text-sm tracking-wide"
        >
          <svg className="w-4.5 h-4.5 fill-current shrink-0 animate-pulse" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.89 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.435 5.624 1.435h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span className="hidden sm:inline">WhatsApp Order</span>
        </a>
      </div>

      {/* Sticky Bottom Navigation Bar */}
      <BottomNavBar
        currentView={currentView}
        setView={setView}
        cartCount={cartCount}
      />

    </div>
  );
}
