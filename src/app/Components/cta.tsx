"use client";
import React from "react";
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Link from "next/link";

const CTA = () => {
  const router = useRouter();

  return (
    <section className="bg-white text-black py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-black to-gray-800 rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            
            {/* Left side - Text Content */}
            <div className="flex-1 text-left w-full">
              <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-3 md:mb-4">
                Stay Ahead of Cyber Threats Today
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-2xl">
                Don&apos;t wait for an attack to happen. Partner with Penguin&apos;s Offensive Security and secure your business with expert pentesting, audits, and threat hunting.
              </p>
            </div>
            
            {/* Right side - Button */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <button 
                onClick={() => router.push('/contact')}
                className="bg-white text-black px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 whitespace-nowrap w-full md:w-auto text-sm sm:text-base"
              >
                Contact Our Experts
                <ArrowRight size={18} className="flex-shrink-0" />
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;