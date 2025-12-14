"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { 
  MdSearch, 
  MdCompare, 
  MdCheckCircle,
  MdRateReview
} from "react-icons/md";

export default function HowItWorks() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  const steps = [
    {
      icon: MdSearch,
      number: "01",
      title: "Describe Your Project",
      description: "Tell us what you need help with. Be as detailed as you'd like - the more information, the better we can match you with the right pro.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&q=90"
    },
    {
      icon: MdCompare,
      number: "02",
      title: "Compare Local Pros",
      description: "We'll show you verified professionals in your area. Compare profiles, read reviews, and check ratings to find your perfect match.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=1080&fit=crop&q=90"
    },
    {
      icon: MdCheckCircle,
      number: "03",
      title: "Hire with Confidence",
      description: "Once you've found your pro, request a quote and hire them directly through our platform. All jobs are protected by our guarantee.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&q=90"
    },
    {
      icon: MdRateReview,
      number: "04",
      title: "Review & Rate",
      description: "After the job is complete, share your experience. Your feedback helps other customers and helps pros improve their services.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=90"
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-black font-sans pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black dark:text-white mb-6">
              How It Works
            </h1>
            <p className="text-lg sm:text-xl font-bold text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Getting started with QuickHire is simple. Follow these four easy steps to find and hire your perfect pro.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                  data-aos={isEven ? "fade-right" : "fade-left"}
                  data-aos-delay={index * 100}
                >
                  <div className={!isEven ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-black dark:bg-white flex items-center justify-center border-2 border-black dark:border-white">
                        <Icon className="text-3xl text-white dark:text-black" />
                      </div>
                      <div className="text-6xl font-black text-gray-200 dark:text-gray-800">
                        {step.number}
                      </div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white mb-4">
                      {step.title}
                    </h2>
                    <p className="text-lg font-bold text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className={`relative h-64 md:h-80 rounded-[30px] border-2 border-gray-200 dark:border-gray-800 overflow-hidden group hover:border-black dark:hover:border-white transition-all duration-300 ${!isEven ? "lg:order-1" : ""}`}>
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="w-12 h-12 rounded-full bg-white dark:bg-black flex items-center justify-center border-2 border-white dark:border-black mb-3">
                        <Icon className="text-2xl text-black dark:text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white mb-4">
              Why Choose QuickHire?
            </h2>
            <p className="text-lg font-bold text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We make finding and hiring professionals simple, safe, and stress-free
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Verified Pros", desc: "All professionals are background checked" },
              { title: "Protected Jobs", desc: "Protection on every completed job" },
              { title: "Easy Booking", desc: "Simple process from search to hire in minutes" },
            ].map((benefit, index) => (
              <div
                key={index}
                className="p-8 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-[30px] hover:border-black dark:hover:border-white transition-all duration-300 text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-2xl font-black text-black dark:text-white font-black mb-4">{benefit.title}</h3>
                <p className="text-gray-600 font-bold dark:text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Find your perfect pro today
          </p>
          <button className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full text-lg hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

