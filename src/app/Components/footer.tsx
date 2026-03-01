import React from "react";
import { Facebook, Twitter, Globe } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t-2">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About Us Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">ABOUT US</h3>
            <p className="text-sm text-gray-700 mb-4">
              From pentesting to audits, we secure networks, systems, and data with trusted offensive security solutions.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="border-2 border-gray-700 p-2 text-black hover:bg-black hover:text-white transition-colors duration-200">
                <Facebook size={18} />
              </a>
              <a href="#" className="border-2 border-gray-700 p-2  text-black hover:bg-black hover:text-white transition-colors duration-200">
                <Twitter size={18} />
              </a>
              <a href="#" className="border-2 border-gray-700 p-2  text-black hover:bg-black hover:text-white transition-colors duration-200">
                <Globe size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-700 hover:text-black hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-700 hover:text-black hover:underline transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-700 hover:text-black hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-700 hover:text-black hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services Column 1 */}
          <div>
            <h3 className="text-lg font-bold mb-4">SERVICES</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-700 hover:text-black hover:underline transition-colors">
                  In-depth Pentesting
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-700 hover:text-black hover:underline transition-colors">
                  Threat Analysis
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-700 hover:text-black hover:underline transition-colors">
                  Network Testing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-700 hover:text-black hover:underline transition-colors">
                  Threat Hunting
                </a>
              </li>
            </ul>
          </div>
          
          {/* Services Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4">SERVICES</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-700 hover:text-black hover:underline transition-colors">
                  Forensics
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-700 hover:text-black hover:underline transition-colors">
                  Security Audit (Onsite)
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-700 hover:text-black hover:underline transition-colors">
                  Security Audit (Online)
                </a>
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom Bar with Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Penguin&apos;s Offensive Security. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;