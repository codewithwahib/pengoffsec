"use client";
import React, { useEffect, useState } from "react";
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import Image from "next/image";

const Services = () => {
  const [services, setServices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check window size on client side
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch services from Sanity
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesQuery = groq`
          *[_type == "service"] | order(_createdAt asc) {
            name,
            "slug": slug.current,
            smallDescription,
            "image": image.asset->url
          }
        `;
        const fetchedServices = await client.fetch(servicesQuery);
        setServices(fetchedServices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // For mobile: one card per slide
  const mobileTotalSlides = services.length;
  // For desktop: three cards per slide
  const desktopTotalSlides = Math.ceil(services.length / 3);

  // Auto slide from right to left
  useEffect(() => {
    if (services.length === 0) return;
    
    const interval = setInterval(() => {
      if (isMobile) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mobileTotalSlides);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % desktopTotalSlides);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [mobileTotalSlides, desktopTotalSlides, services.length, isMobile]);

  const nextSlide = () => {
    if (isMobile) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mobileTotalSlides);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % desktopTotalSlides);
    }
  };

  const prevSlide = () => {
    if (isMobile) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + mobileTotalSlides) % mobileTotalSlides);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + desktopTotalSlides) % desktopTotalSlides);
    }
  };

  // Group services for desktop view (chunks of 3)
  const groupedServices = [];
  for (let i = 0; i < services.length; i += 3) {
    groupedServices.push(services.slice(i, i + 3));
  }

  return (
    <>
      <section className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
          
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Our Services
          </h2>
          
          {/* Slider Container */}
          <div className="relative">
            {/* Services Slider */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {/* Mobile View - One card per slide */}
                {isMobile ? (
                  // Mobile slides
                  services.map((service: any, index: number) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="flex justify-center">
                        <div className="w-80 border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col">
                          {/* Image on top - full size */}
                          <div className="w-full h-72 overflow-hidden relative">
                            <Image 
                              src={service.image} 
                              alt={service.name} 
                              fill
                              sizes="(max-width: 768px) 100vw, 320px"
                              className="object-cover"
                            />
                          </div>
                          
                          {/* Content */}
                          <div className="p-4 flex flex-col flex-grow">
                            {/* Service Name */}
                            <h3 className="text-lg font-bold mb-2">
                              {service.name}
                            </h3>
                            
                            {/* Service Description */}
                            <p className="text-xs text-gray-700 mb-3 flex-grow leading-relaxed">
                              {service.smallDescription}
                            </p>
                            
                            {/* Read More Link */}
                            <a 
                              href={`/services/${service.slug}`}
                              className="inline-flex items-center font-bold text-black text-sm hover:underline group mt-auto"
                            >
                              Read More
                              <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // Desktop slides (3 cards per slide)
                  groupedServices.map((group, groupIndex) => (
                    <div key={groupIndex} className="w-full flex-shrink-0">
                      <div className="flex flex-row gap-8 justify-center">
                        {group.map((service: any, index: number) => (
                          <div 
                            key={index} 
                            className="w-80 border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
                          >
                            {/* Image on top - full size */}
                            <div className="w-full h-72 overflow-hidden relative">
                              <Image 
                                src={service.image} 
                                alt={service.name} 
                                fill
                                sizes="(max-width: 768px) 100vw, 320px"
                                className="object-cover"
                              />
                            </div>
                            
                            {/* Content */}
                            <div className="p-4 flex flex-col flex-grow">
                              {/* Service Name */}
                              <h3 className="text-lg font-bold mb-2">
                                {service.name}
                              </h3>
                              
                              {/* Service Description */}
                              <p className="text-xs text-gray-700 mb-3 flex-grow leading-relaxed">
                                {service.smallDescription}
                              </p>
                              
                              {/* Read More Link */}
                              <a 
                                href={`/services/${service.slug}`}
                                className="inline-flex items-center font-bold text-black text-sm hover:underline group mt-auto"
                              >
                                Read More
                                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            {services.length > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-transparent text-gray-900 hover:text-gray-600 transition-colors duration-200 font-bold text-5xl z-10"
                  aria-label="Previous slide"
                >
                  ‹
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-transparent text-gray-900 hover:text-gray-600 transition-colors duration-200 font-bold text-5xl z-10"
                  aria-label="Next slide"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Thin line at the bottom */}
      <div className="w-full border-t border-gray-300"></div>
    </>
  );
};

export default Services;