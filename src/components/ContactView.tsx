/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, MessageSquare, Instagram, MapPin, Landmark, Clock, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactView() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      
      {/* Title block */}
      <section className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Connect With Us</h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          We operate 6 days a week in Madurai. Get custom camera assemblies or quick vintage test films booked today.
        </p>
      </section>

      {/* Grid: Left Column Cards details, Right Column Map block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Contact details links list */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Store Contacts</h3>
          
          {/* Card: WhatsApp */}
          <a
            href="https://wa.me/917603957492"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 p-5 bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-xs transition-all rounded-3xl cursor-pointer"
          >
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-2xs">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">WhatsApp Order Desk</p>
              <h4 className="text-base font-bold text-slate-800 mt-1">+91 76039 57492</h4>
              <p className="text-xs text-slate-500 mt-0.5">Chat with our engineers anytime</p>
            </div>
          </a>

          {/* Card: Email */}
          <a
            href="mailto:vasanthmudu20@gmail.com"
            className="group flex items-center gap-4 p-5 bg-white border border-slate-100 hover:border-blue-200 hover:shadow-xs transition-all rounded-3xl cursor-pointer"
          >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-2xs">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Official Support Email</p>
              <h4 className="text-base font-bold text-slate-800 mt-1">vasanthmudu20@gmail.com</h4>
              <p className="text-xs text-slate-500 mt-0.5">Send custom quotes & partnerships</p>
            </div>
          </a>

          {/* Card: Instagram */}
          <a
            href="https://instagram.com/madurai__cameras_shop"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 p-5 bg-white border border-slate-100 hover:border-rose-200 hover:shadow-xs transition-all rounded-3xl cursor-pointer"
          >
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-colors shadow-2xs">
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Instagram Media Portfolio</p>
              <h4 className="text-base font-bold text-slate-800 mt-1">@madurai__cameras_shop</h4>
              <p className="text-xs text-slate-500 mt-0.5">Browse daily releases & lens tests</p>
            </div>
          </a>
        </div>

        {/* Right Column: Physical Address Info Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-3xs space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Landmark className="w-5 h-5 text-slate-850" />
            <h3 className="font-bold text-slate-800 text-lg">Main Corporate HQ</h3>
          </div>

          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block pb-0.5">Physical Address</span>
                <p className="text-slate-700 leading-normal font-medium">
                  171/2, Madurai North,<br />Tamil Nadu 625014,<br />India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block pb-0.5">Working Hours</span>
                <p className="text-slate-600">Monday – Saturday: 10:00 AM – 8:00 PM</p>
                <p className="text-xs text-rose-500 font-medium mt-1">We are closed on Sundays</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block pb-0.5">Support Notice</span>
                <p className="text-slate-500 leading-relaxed text-xs">
                  For active cameras inspections, please contact 2 hours ahead of arrival. Our physical vault location has strict security measures.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
