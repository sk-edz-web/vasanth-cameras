/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CheckoutDetails } from '../types';
import { User, Phone, Mail, MapPin, Notebook, Key, ArrowRight, ArrowLeft } from 'lucide-react';

interface AddressViewProps {
  onSubmit: (details: CheckoutDetails) => void;
  onBack: () => void;
}

export default function AddressView({ onSubmit, onBack }: AddressViewProps) {
  const [formData, setFormData] = useState<CheckoutDetails>({
    name: '',
    phone: '',
    email: '',
    streetAddress: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    deliveryNotes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutDetails, string>>>({});

  // Recover form from local storage if available
  useEffect(() => {
    const saved = localStorage.getItem('vasanth_customer_details');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutDetails, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    // Simple phone validator matching standard Indian mobile numbers (e.g. 10 digits)
    const phoneClean = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneClean.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address syntax';
    }

    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Door no. and Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City/Village is required';
    
    const pinClean = formData.pincode.replace(/[^0-9]/g, '');
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (pinClean.length !== 6) {
      newErrors.pincode = 'Pincode must be exactly 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name as keyof CheckoutDetails]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Save for next duration
      localStorage.setItem('vasanth_customer_details', JSON.stringify(formData));
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16">
      
      {/* Header details */}
      <div className="space-y-1.5 text-center sm:text-left">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Delivery & Contact Details</h2>
        <p className="text-sm text-slate-500">Provide shipping or pickup coordinates before placing order on WhatsApp.</p>
      </div>

      <form onSubmit={handleFormSubmit} className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-3xs space-y-6">
        
        {/* Row 1: Full name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-650 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              id="name-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Vasanth Kumar"
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.name ? 'border-rose-400 focus:ring-rose-500/15' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
              }`}
            />
            {errors.name && <p className="text-rose-500 text-[11px] font-medium">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-650 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>Contact Number</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone-input"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 7603957492"
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.phone ? 'border-rose-400 focus:ring-rose-500/15' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
              }`}
            />
            {errors.phone && <p className="text-rose-500 text-[11px] font-medium">{errors.phone}</p>}
          </div>
        </div>

        {/* Row 2: Email */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-650 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>Email Address</span>
          </label>
          <input
            type="email"
            name="email"
            id="email-input"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. vasanthmudu20@gmail.com"
            className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.email ? 'border-rose-400 focus:ring-rose-500/15' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
            }`}
          />
          {errors.email && <p className="text-rose-500 text-[11px] font-medium">{errors.email}</p>}
        </div>

        {/* Row 3: Street Address */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-650 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Street Address / Door Number</span>
          </label>
          <textarea
            name="streetAddress"
            id="address-textarea"
            rows={2}
            value={formData.streetAddress}
            onChange={handleChange}
            placeholder="Door No, Street Name, Area..."
            className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.streetAddress ? 'border-rose-400 focus:ring-rose-500/15' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
            }`}
          />
          {errors.streetAddress && <p className="text-rose-500 text-[11px] font-medium">{errors.streetAddress}</p>}
        </div>

        {/* Row 4: City, State, Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-640">City</label>
            <input
              type="text"
              name="city"
              id="city-input"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Madurai"
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.city ? 'border-rose-400 focus:ring-rose-500/15' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
              }`}
            />
            {errors.city && <p className="text-rose-500 text-[11px] font-medium">{errors.city}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-640">State</label>
            <input
              type="text"
              name="state"
              id="state-input"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 bg-slate-55 rounded-xl text-sm text-slate-500 cursor-not-allowed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-640">Pincode</label>
            <input
              type="text"
              name="pincode"
              id="pincode-input"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="e.g. 625014"
              maxLength={6}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.pincode ? 'border-rose-400 focus:ring-rose-500/15' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
              }`}
            />
            {errors.pincode && <p className="text-rose-500 text-[11px] font-medium">{errors.pincode}</p>}
          </div>
        </div>

        {/* Row 5: Contact/Delivery note */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-650 flex items-center gap-1.5">
            <Notebook className="w-3.5 h-3.5 text-slate-400" />
            <span>Delivery Instructions & Special Custom Requirements</span>
          </label>
          <textarea
            name="deliveryNotes"
            id="notes-textarea"
            rows={2}
            value={formData.deliveryNotes}
            onChange={handleChange}
            placeholder="Add specs, customization notes, or lease terms here..."
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Navigation Buttons flow */}
        <div className="pt-4 flex items-center justify-between gap-4 border-t border-slate-55">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold tracking-wide hover:bg-blue-700 transition shadow-xs cursor-pointer"
          >
            <span>Proceed to Buy Tab</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
}
