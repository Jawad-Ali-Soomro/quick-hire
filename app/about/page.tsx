"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  MdCheckCircle, 
  MdGroups, 
  MdLocationOn, 
  MdTrendingUp,
  MdSecurity,
  MdThumbUp
} from "react-icons/md";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="w-full bg-white dark:bg-black font-sans pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black dark:text-white mb-6">
              About QuickHire<sup className="text-lg md:text-sm align-super">™</sup>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Connecting trusted local professionals with customers across Pakistan. 
              We're building the future of home services, one connection at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                At QuickHire, we believe everyone deserves access to reliable, professional home services. 
                Our mission is to bridge the gap between skilled professionals and customers who need their expertise.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                We're committed to creating a platform where trust, quality, and convenience come together 
                to make home maintenance and improvement accessible to everyone across Pakistan.
              </p>
            </div>
            <div className="space-y-6" data-aos="fade-left">
              {[
                { icon: MdCheckCircle, title: "Verified Professionals", desc: "All pros are background checked and verified" },
                { icon: MdSecurity, title: "Secure Platform", desc: "Your data and payments are always protected" },
                { icon: MdThumbUp, title: "Quality Guaranteed", desc: "Up to $2,500 protection on every job" },
                { icon: MdLocationOn, title: "Nationwide Coverage", desc: "Available in all major cities across Pakistan" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-6 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white transition-all duration-300">
                    <Icon className="text-3xl text-black dark:text-white flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-black dark:text-white mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "4.5M+", label: "Happy Customers" },
              { number: "50K+", label: "Verified Pros" },
              { number: "300K+", label: "Reviews" },
              { number: "4.9/5", label: "Average Rating" },
            ].map((stat, index) => (
              <div key={index} className="text-center" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="text-4xl md:text-5xl font-black text-black dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: MdGroups, title: "Trust", desc: "Building trust through transparency, verification, and quality assurance." },
              { icon: MdTrendingUp, title: "Growth", desc: "Empowering professionals to grow their businesses and reach more customers." },
              { icon: MdLocationOn, title: "Community", desc: "Supporting local businesses and strengthening communities across Pakistan." },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center p-8 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-2xl hover:border-black dark:hover:border-white transition-all duration-300" data-aos="fade-up" data-aos-delay={index * 100}>
                  <Icon className="text-5xl text-black dark:text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-black text-black dark:text-white mb-4">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
