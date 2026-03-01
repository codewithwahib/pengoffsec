import React from "react";
import Link from "next/link";
import Image from "next/image";

const About = () => {
  return (
    <>
      <section className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
            
            {/* Left side - Text Content */}
            <div className="flex-1 order-2 md:order-1 w-full">
              {/* About Us Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-left">
                About Us
              </h2>
              
              {/* About Us Content */}
              <div className="space-y-4 text-sm sm:text-base text-gray-700 text-left">
                <p>
                  At Penguin&apos;s Offensive Security, we believe that strong security is the foundation of a successful business. Cyber threats are growing every day, and attackers are always finding new ways to break into systems. That&apos;s why we focus on offensive security — thinking like hackers so we can stay one step ahead of them.
                </p>
                
                <p>
                  Our team of experienced professionals specializes in penetration testing, threat analysis, network testing, digital forensics, and security audits. We don&apos;t just run basic scans — we perform in-depth testing, uncover hidden vulnerabilities, and provide you with clear, practical solutions to fix them.
                </p>
                
                <p>
                  What makes us different is our hands-on approach. We simulate real-world attacks to show you exactly how hackers could exploit your systems. Then, we help you build stronger defenses to ensure your data, networks, and operations stay safe.
                </p>
              </div>
              
              {/* Learn More Button */}
              <div className="mt-8 flex justify-start">
                <Link href="/services">
                  <button className="bg-black text-white border-2 border-black hover:bg-white hover:text-black px-8 py-3 rounded-full font-medium transition-all duration-200 text-sm sm:text-base w-full sm:w-auto">
                    Our Services
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Right side - Image */}
            <div className="flex-1 flex justify-center order-1 md:order-2 w-full">
              <div className="w-full max-w-md md:max-w-xl bg-gray-200 rounded-lg overflow-hidden shadow-lg relative h-[300px] sm:h-[350px] md:h-[400px]">
                <Image 
                  src="/ab.png" 
                  alt="About Penguin's Offensive Security" 
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
                  className="object-cover"
                  priority={false}
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default About;