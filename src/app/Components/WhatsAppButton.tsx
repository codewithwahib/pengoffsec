"use client";

import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "923423415018"; // Replace with your WhatsApp number (with country code, no +)
  const message = "Hello, I want to get more information.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300"
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.896.76 5.725 2.204 8.214L0 32l7.605-2.173a15.94 15.94 0 0 0 8.395 2.366c8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.185a13.1 13.1 0 0 1-6.664-1.827l-.477-.284-4.513 1.29 1.205-4.399-.31-.452a13.084 13.084 0 0 1-2.005-6.948c0-7.245 5.896-13.141 13.141-13.141s13.141 5.896 13.141 13.141-5.896 13.141-13.141 13.141zm7.287-9.747c-.399-.2-2.362-1.164-2.728-1.296-.366-.133-.633-.2-.9.2-.266.399-1.033 1.296-1.266 1.563-.233.266-.466.3-.865.1-.399-.2-1.686-.62-3.212-1.977-1.186-1.057-1.987-2.364-2.22-2.763-.233-.399-.025-.615.175-.815.18-.179.399-.466.599-.699.2-.233.266-.399.399-.665.133-.266.066-.499-.033-.699-.1-.2-.9-2.17-1.233-2.969-.325-.779-.655-.674-.9-.686l-.765-.013c-.266 0-.699.1-1.066.499-.366.399-1.399 1.366-1.399 3.331 0 1.965 1.433 3.864 1.632 4.13.2.266 2.821 4.308 6.835 6.037.955.412 1.699.658 2.279.842.957.304 1.828.261 2.516.158.767-.114 2.362-.965 2.695-1.897.333-.932.333-1.731.233-1.897-.1-.166-.366-.266-.765-.466z" />
      </svg>
    </button>
  );
};

export default WhatsAppButton;