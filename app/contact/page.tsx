"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  MdEmail, 
  MdPhone, 
  MdLocationOn,
  MdSend
} from "react-icons/md";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full bg-white dark:bg-black font-sans pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black dark:text-white mb-6">
              Let's Connect!
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Have questions? We're here to help. Reach out to us anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div data-aos="fade-right">
              <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white mb-8">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 border-2 border-gray-200 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white transition-all duration-300">
                  <MdEmail className="text-3xl text-black dark:text-white flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-1">Email</h3>
                    <a href="mailto:support@quickhire.com" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                      support@quickhire.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 border-2 border-gray-200 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white transition-all duration-300">
                  <MdPhone className="text-3xl text-black dark:text-white flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-1">Phone</h3>
                    <a href="tel:+923001234567" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                      +92 300 1234567
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 border-2 border-gray-200 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white transition-all duration-300">
                  <MdLocationOn className="text-3xl text-black dark:text-white flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-1">Location</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Karachi, Lahore, Islamabad & All Major Cities in Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div data-aos="fade-left">
              <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white mb-8">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-black dark:text-white mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-black dark:text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-black dark:text-white mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    placeholder="+92 300 1234567"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-black dark:text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <MdSend className="text-xl" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
