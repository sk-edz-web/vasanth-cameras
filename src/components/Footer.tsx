/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, MapPin, Phone, Mail, Instagram } from 'lucide-react';

interface FooterProps {
  setView: (view: string) => void;
}

export default function Footer({ setView }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-12 pb-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <Camera className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-white tracking-tight uppercase">
                VASANTH <span className="text-blue-500">CAMERAS</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Premium camera store in the heart of Madurai. We provide the latest mirrorless and DSLR technology for professionals and enthusiasts.
            </p>
          </div>

          {/* Column 2: Contact Details */}
          <div className="space-y-3 font-sans">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Contact Details</h4>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>+91 76039 57492 (WhatsApp)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>vasanthmudu20@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>Instagram: @madurai__cameras_shop</span>
            </div>
          </div>

          {/* Column 3: Store Location */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Store Location</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              171/2, Madurai North,<br />
              Tamilnadu 625014, India
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setView('about')}
                className="text-[10px] bg-slate-800 px-2.5 py-1 rounded text-slate-300 hover:text-white hover:bg-slate-750 transition cursor-pointer"
              >
                Our Legacy
              </button>
              <button
                onClick={() => setView('contact')}
                className="text-[10px] bg-slate-800 px-2.5 py-1 rounded text-slate-300 hover:text-white hover:bg-slate-750 transition cursor-pointer"
              >
                Get in Touch
              </button>
            </div>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Vasanth Cameras. Sleek Interface theme. Tamil Nadu, India.</p>
          <div className="flex gap-4">
            <a href="https://instagram.com/madurai__cameras_shop" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://wa.me/917603957492" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp Order Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
