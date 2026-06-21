/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, Users, Target, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutView() {
  const teamMembers = [
    {
      name: 'Vasanth Mudu',
      role: 'Founder & Technical Director',
      bio: 'Over 12 years of hands-on camera repair and optics restoration experience. Vasanth oversees technical evaluations and secures premium import pipelines.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80',
    },
    {
      name: 'Karthik Raja',
      role: 'Chief Lens Restorer',
      bio: 'Expert optical technician specializing in rebuilding vintage manual focus German glass and calibrating fine focus barrels.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80',
    },
    {
      name: 'Abishek Chandran',
      role: 'Cinematography Consultant',
      bio: 'Active commercial cinematographer helping filmmakers choose custom anamorphic lens adapters and active video transmitters.',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      
      {/* Hero legacy layout */}
      <section className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-900 text-white uppercase tracking-widest">
          Est. 2014, Tamil Nadu
        </span>
        <h2 className="text-3xl font-black text-slate-905 tracking-tight leading-none">
          Vasanth Cameras Legacy
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
          How we became Madurai’s premier and most trusted camera supplier, serving wedding photography teams, independent filmmakers, and vintage collectors.
        </p>
      </section>

      {/* Grid: 3 Pillars Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3 shadow-2xs">
          <div className="p-2.5 bg-slate-50 text-slate-800 rounded-xl w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-800 text-sm">Double Tested Gear</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every camera sensor and sub-shutter is put through meticulous benchmark standards before listing.
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3 shadow-2xs">
          <div className="p-2.5 bg-slate-50 text-slate-800 rounded-xl w-fit">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-800 text-sm">Finest Logistics</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            From vintage medium formats to high frame rate cinema rigs, we source the highest grade gear locally.
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3 shadow-2xs">
          <div className="p-2.5 bg-slate-50 text-slate-800 rounded-xl w-fit">
            <Heart className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-800 text-sm">Lifetime Assistance</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            We provide direct continuous firmware support and custom calibration assistance after booking.
          </p>
        </div>

      </div>

      {/* Team sections details */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-105">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="font-extrabold text-slate-850 text-xl tracking-tight">Our Master Specialists</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {teamMembers.map((member, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:shadow-xs transition duration-200">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-100 bg-slate-50">
                  <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-850 text-sm">{member.name}</h4>
                  <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider block mt-0.5">{member.role}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
