// src/app/Components/ProjectInquiryForm.tsx
'use client';

import { useState, useEffect } from 'react';

interface ProjectInquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialInquiry?: string;
  readOnlyInquiry?: boolean;
}

export default function ProjectInquiryForm({ 
  isOpen, 
  onClose, 
  initialInquiry = '',
  readOnlyInquiry = false 
}: ProjectInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiryAbout: initialInquiry,
    message: ''
  });

  // Update inquiryAbout when initialInquiry changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      inquiryAbout: initialInquiry
    }));
  }, [initialInquiry]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          inquiryAbout: initialInquiry,
          message: ''
        });
        setSubmitStatus({ type: null, message: '' });
      }, 300);
    }
  }, [isOpen, initialInquiry]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('https://formsubmit.co/ajax/info@pengoffsec.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New ${formData.inquiryAbout} Form Submission`,
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          inquiryAbout: formData.inquiryAbout,
          message: formData.message,
          source: 'Project Inquiry Form',
          timestamp: new Date().toISOString(),
          _template: 'table',
          _captcha: 'false'
        })
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your inquiry! Our team will contact you shortly.'
        });
        // Reset form
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          inquiryAbout: initialInquiry,
          message: ''
        });
        
        // Auto close after 3 seconds on success
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        const errorMessage = result.message || 'Submission failed. Please try again.';
        setSubmitStatus({
          type: 'error',
          message: errorMessage
        });
      }
    } catch (error) {
      console.error('Network Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative w-full max-w-2xl transform overflow-hidden bg-white border-2 border-black shadow-xl transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-black px-6 py-4 border-b-2 border-black">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                {formData.inquiryAbout.includes('Demo') ? 'Request a Demo' : 'Get a Quote'}
              </h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors duration-300"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-300 text-sm mt-1">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          {/* Form */}
          <div className="p-6 bg-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-black border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors bg-white"
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-black mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-black border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors bg-white"
                    placeholder="Your company"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-black border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors bg-white"
                    placeholder="Email Address"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-black border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors bg-white"
                    placeholder="+92 3XX XXXXXXX"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Inquiry About - Now pre-filled and read-only */}
              <div>
                <label htmlFor="inquiryAbout" className="block text-sm font-medium text-black mb-1">
                  Inquiry About *
                </label>
                <input
                  type="text"
                  id="inquiryAbout"
                  name="inquiryAbout"
                  value={formData.inquiryAbout}
                  onChange={handleChange}
                  readOnly={readOnlyInquiry}
                  className={`w-full px-4 py-2 text-black border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors bg-white ${
                    readOnlyInquiry ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="What is your inquiry about?"
                  required
                  disabled={isSubmitting || readOnlyInquiry}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-black mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 text-black border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors bg-white resize-none"
                  placeholder="Please provide details about your inquiry..."
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit Status */}
              {submitStatus.type && (
                <div className={`p-3 rounded-lg text-sm font-medium border-2 ${
                  submitStatus.type === 'success' 
                    ? 'bg-white text-black border-black' 
                    : 'bg-white text-black border-black'
                }`}>
                  <div className="flex items-start">
                    {submitStatus.type === 'success' ? (
                      <svg className="w-5 h-5 mr-2 mt-0.5 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 mr-2 mt-0.5 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span className="text-black">{submitStatus.message}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-black border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-black text-white font-medium rounded-lg transition-all duration-300 border-2 border-black ${
                    isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:bg-white hover:text-black'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}