"use client";

import Link from "next/link";
import { 
  MdEmail,
  MdPhone,
  MdLocationOn
} from "react-icons/md";
import { 
  FaFacebook, 
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-black dark:bg-white text-white dark:text-black border-t-2 border-white/10 dark:border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Top Section with Logo and Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Logo and Company Info */}
          <div className="lg:col-span-1" data-aos="fade-up">
            <Link href="/" className="flex items-center mb-6">
              <div className="flex items-center gap-3">
                
                <span className="text-2xl font-black text-white dark:text-black">
                  QuickHire<sup className="text-xs align-super">™</sup>
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/70 dark:text-black/70 mb-6 leading-relaxed">
              Connect with trusted local professionals for all your home service needs across Pakistan.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: FaFacebook, href: "#" },
                { icon: FaTwitter, href: "#" },
                { icon: FaInstagram, href: "#" },
                { icon: FaLinkedin, href: "#" },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full border-2 border-white/20 dark:border-black/20 flex items-center justify-center text-white dark:text-black hover:border-white dark:hover:border-black hover:scale-110 transition-all duration-300"
                  >
                    <Icon className="text-lg" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-white dark:text-black font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "How It Works",
                "Services",
                "Become a Pro",
                "Blog",
                "Careers"
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href="#" 
                    className="text-sm text-white/70 dark:text-black/70 hover:text-white dark:hover:text-black transition-colors duration-300 inline-block hover:translate-x-1"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Customers */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-white dark:text-black font-bold text-lg mb-6">For Customers</h3>
            <ul className="space-y-3">
              {[
                "Find a Pro",
                "Get Started",
                "Download App",
                "Services Near Me",
                "Cost Estimates",
                "Customer Reviews"
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href="#" 
                    className="text-sm text-white/70 dark:text-black/70 hover:text-white dark:hover:text-black transition-colors duration-300 inline-block hover:translate-x-1"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-white dark:text-black font-bold text-lg mb-6">Contact & Support</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="mailto:support@quickhire.com" 
                  className="text-sm text-white/70 dark:text-black/70 hover:text-white dark:hover:text-black transition-colors duration-300 flex items-center gap-2"
                >
                  <MdEmail className="text-base" />
                  support@quickhire.com
                </Link>
              </li>
              <li>
                <Link 
                  href="tel:+923001234567" 
                  className="text-sm text-white/70 dark:text-black/70 hover:text-white dark:hover:text-black transition-colors duration-300 flex items-center gap-2"
                >
                  <MdPhone className="text-base" />
                  +92 300 1234567
                </Link>
              </li>
              <li className="text-sm text-white/70 dark:text-black/70 flex items-start gap-2">
                <MdLocationOn className="text-base mt-0.5 flex-shrink-0" />
                <span>Karachi, Lahore, Islamabad & All Major Cities in Pakistan</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-white dark:text-black font-semibold text-sm mb-3">Support</h4>
              <ul className="space-y-2">
                {["Help Center", "Safety", "Terms of Use", "Privacy Policy"].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href="#" 
                      className="text-xs text-white/60 dark:text-black/60 hover:text-white dark:hover:text-black transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t-2 border-white/10 dark:border-black/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="text-sm text-white/70 dark:text-black/70">
                © {new Date().getFullYear()} QuickHire<sup className="text-xs align-super">™</sup>, Inc. All rights reserved.
              </p>
              <Link 
                href="#" 
                className="text-sm text-white/70 dark:text-black/70 hover:text-white dark:hover:text-black transition-colors duration-300"
              >
                QuickHire Guarantee
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <Link 
                href="#" 
                className="text-sm text-white/70 dark:text-black/70 hover:text-white dark:hover:text-black transition-colors duration-300"
              >
                Pakistan
              </Link>
              <span className="text-white/30 dark:text-black/30">|</span>
              <Link 
                href="#" 
                className="text-sm text-white/70 dark:text-black/70 hover:text-white dark:hover:text-black transition-colors duration-300"
              >
                English
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

