import React from "react";
import Link from "next/link";


const Hero = () => {
  return (
    <section className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Penguin&apos;s Offensive Security
          </h1>
          
          {/* Subheading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
            Defend Your Business with Expert Cybersecurity
          </h2>
          
          {/* Description Paragraph */}
          <p className="text-lg md:text-xl text-gray-800 mb-4">
            We protect your systems with in-depth pentesting, threat analysis, and advanced
          </p>
          <p className="text-lg md:text-xl text-gray-800 mb-8">
            security audits. Stay secure, stay confident. Our experts work 24/7 to keep you safe from
            cyber threats.
          </p>
          
          {/* Services and Contact Buttons - Alternative style */}
          <div className="flex flex-wrap gap-4">
            <Link href="/services">
  <button className="bg-black text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-medium transition-all duration-200 text-lg border-2 border-black">
    Our Services
  </button>
</Link>
            <Link href="/contact"><button className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-200 text-lg">
              Contact Us
            </button></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;