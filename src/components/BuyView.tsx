/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, CartItem, CheckoutDetails } from '../types';
import { MessageSquare, Calendar, ChevronRight, CheckCircle, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

interface BuyViewProps {
  checkoutItems: CartItem[];
  customerDetails: CheckoutDetails;
  onBack: () => void;
  onClearCartAndOrder: () => void;
}

export default function BuyView({
  checkoutItems,
  customerDetails,
  onBack,
  onClearCartAndOrder,
}: BuyViewProps) {
  
  // Cart subtotal
  const orderTotal = checkoutItems.reduce((acc, curr) => acc + curr.camera.price * curr.quantity, 0);

  // Format currency
  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Construct WhatsApp Message
  const handleWhatsAppRedirect = () => {
    const phoneNumber = '917603957492'; // Specified standard number
    
    // Construct message body
    let message = `📸 *NEW ORDER - VASANTH CAMERAS* 📸\n`;
    message += `==================================\n\n`;
    message += `👤 *CUSTOMER DETAILS:*\n`;
    message += `• *Name:* ${customerDetails.name}\n`;
    message += `• *Phone:* ${customerDetails.phone}\n`;
    message += `• *Email:* ${customerDetails.email}\n`;
    message += `• *Address:* ${customerDetails.streetAddress}, ${customerDetails.city}, Tamil Nadu - ${customerDetails.pincode}\n`;
    if (customerDetails.deliveryNotes) {
      message += `• *Notes:* ${customerDetails.deliveryNotes}\n`;
    }
    message += `\n🛒 *ORDER ITEMS:*\n`;
    
    checkoutItems.forEach((item, index) => {
      message += `${index + 1}. *\`${item.camera.name}\`* (${item.camera.brand})\n`;
      message += `   • *Qty:* ${item.quantity}\n`;
      message += `   • *Price:* ${formatINR(item.camera.price)} each\n`;
    });
    
    message += `\n==================================\n`;
    message += `💰 *TOTAL AMOUNT:* *${formatINR(orderTotal)}*\n`;
    message += `==================================\n\n`;
    message += `_This message was generated from Vasanth Cameras Store._ 🚀`;

    // Encode URL parameter
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;
    
    // Launch standard WhatsApp redirect!
    window.open(whatsappUrl, '_blank');

    // Trigger clear cart hook on home context
    onClearCartAndOrder();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16">
      
      {/* Header details */}
      <div className="space-y-1.5 text-center sm:text-left">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Invoice & Order Confirmation</h2>
        <p className="text-sm text-slate-500">Review your parameters before sending them instantly to Vasanth Cameras over WhatsApp.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Step Status Indicator */}
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-emerald-600 text-white rounded-lg animate-pulse">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Final Step</h4>
            <p className="text-xs text-emerald-700 leading-normal mt-0.5">
              Clicking the button below redirects you to WhatsApp with pre-filled invoice attributes. The camera stays booked for you.
            </p>
          </div>
        </div>

        {/* 1. Client Details summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Delivery Destination</h3>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100/50 text-sm space-y-1">
            <p className="font-bold text-slate-800">{customerDetails.name}</p>
            <p className="text-slate-500">{customerDetails.phone} | {customerDetails.email}</p>
            <p className="text-slate-500 leading-normal mt-1">
              {customerDetails.streetAddress}, {customerDetails.city}, Tamil Nadu - {customerDetails.pincode}
            </p>
            {customerDetails.deliveryNotes && (
              <p className="text-xs text-emerald-600 font-medium italic mt-2.5">
                Note: "{customerDetails.deliveryNotes}"
              </p>
            )}
          </div>
        </div>

        {/* 2. Items summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Purchase Items</h3>
          <div className="space-y-2.5">
            {checkoutItems.map((item) => (
              <div
                key={item.camera.id}
                className="flex items-center justify-between border-b border-slate-100 pb-2.5 last:border-0 last:pb-0"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                    <img referrerPolicy="no-referrer" src={item.camera.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">{item.camera.name}</h4>
                    <span className="text-[10px] text-slate-400">Qty: {item.quantity} × {formatINR(item.camera.price)}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-800">
                  {formatINR(item.camera.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Final calculations */}
        <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Order Total amount</span>
          <span className="text-2xl font-black text-slate-900">{formatINR(orderTotal)}</span>
        </div>

        {/* Action button */}
        <div className="pt-4 space-y-3">
          <button
            onClick={handleWhatsAppRedirect}
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-emerald-600 text-white rounded-xl font-black text-sm tracking-widest uppercase hover:bg-emerald-700 transition-all shadow-md shadow-emerald-550/10 cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 shrink-0" />
            <span>Open WhatsApp & Place Order</span>
          </button>

          <button
            onClick={onBack}
            className="w-full text-center text-xs font-bold text-slate-400 hover:text-slate-600 transition"
          >
            Modify Customer Details
          </button>
        </div>

      </div>

    </div>
  );
}
