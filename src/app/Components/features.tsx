import React from "react";
import { FaShieldAlt, FaNetworkWired, FaHandshake } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      title: "Expert Offensive Security",
      description: "Our team thinks like hackers to identify weaknesses before attackers do. We use advanced tools and methods to secure your business.",
      icon: <FaShieldAlt className="w-16 h-16" />
    },
    {
      title: "Complete Cyber Protection",
      description: "From pentesting to threat hunting, we cover every layer of security to protect your data, systems, and networks.",
      icon: <FaNetworkWired className="w-16 h-16" />
    },
    {
      title: "Trusted & Professional Service",
      description: "We provide clear reports, practical solutions, and round-the-clock support to keep your business safe and compliant.",
      icon: <FaHandshake className="w-16 h-16" />
    }
  ];

  return (
    <section className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        
        {/* Features Grid with Borders and Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="border-2 border-black rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center text-center"
            >
              {/* Icon - centered and bigger */}
              <div className="mb-4 text-black">
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold mb-3">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-base text-gray-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;