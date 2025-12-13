"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BiSearch } from "react-icons/bi";
import { 
  MdCleaningServices, 
  MdBuild, 
  MdGrass, 
  MdLocalShipping,
  MdPlumbing,
  MdElectricalServices,
  MdFormatPaint,
  MdAcUnit,
  MdConstruction,
  MdPool,
  MdArrowBack,
  MdPerson,
  MdStar,
  MdLocationOn,
  MdAccessTime,
  MdVerified,
  MdGroups,
  MdBusiness,
  MdEmojiEvents,
  MdEdit,
  MdDescription,
  MdSend,
  MdCheckCircle,
  MdSecurity,
  MdHome,
  MdFilterList,
  MdThumbUp
} from "react-icons/md";
import { IoChatbubbleOutline } from "react-icons/io5";
import Image from "next/image";
import Footer from "../footer";

export default function Hero() {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Cleaners");
  const [activeTab, setActiveTab] = useState(0);

  const strings = [
    "Improvement",
    "Repair",
    "Inspection",
    "Cleaning",
    "Plumbing",
    "Electrical Work",
    "Carpentry",
    "Painting"
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    let timeout;
    const currentString = strings[currentIndex];

    if (!isDeleting && currentText.length < currentString.length) {
      timeout = setTimeout(() => {
        setCurrentText(currentString.substring(0, currentText.length + 1));
      }, 0);
    } else if (!isDeleting && currentText.length === currentString.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && currentText.length > 0) {
      timeout = setTimeout(() => {
        setCurrentText(currentString.substring(0, currentText.length - 1));
      }, 0);
    } else if (isDeleting && currentText.length === 0) {
      setIsDeleting(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % strings.length);
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, strings]);

  return (
    <section className="w-full py-8 md:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black pt-24 md:pt-32">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mt-8 md:mt-12" data-aos="fade-up">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-800 dark:text-gray-200 mb-6 leading-tight">
            <div className="relative h-[1.2em] flex items-center justify-center overflow-hidden">
              <span 
                key={currentText}
                className="inline-block text-gray-800 font-black dark:text-gray-200"
                style={{
                  animation: "slideUpFromBottom 0.6s ease-out"
                }}
              >
                {currentText}
              </span>
            </div>
            <span className="block mt-2 text-gray-800 font-black dark:text-gray-200">made easy.</span>
          </h1>
        </div>

        <div className="relative mb-8">
          <div className="relative max-w-4xl mx-auto">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Describe your Problem."
              className="w-full px-6 py-5 pr-14 text-lg border-2 border-black/20 dark:border-white/20 rounded-full focus:outline-none focus:border-black dark:focus:border-white bg-white dark:bg-black text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-4 text-2xl bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:opacity-90 transition-opacity">
              <BiSearch />
            </button>
          </div>
        </div>

        <div className="text-center mb-12" data-aos="fade-up" data-aos-delay="100">
          <p className="text-sm font-bold text-gray-800/70 dark:text-gray-200/70">
            Trusted by 4.5M+ people • 4.9/5 with over 300k reviews
          </p>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-4 mb-8 mt-12 md:mt-16 scrollbar-hide" data-aos="fade-up" data-aos-delay="200">
          {[
            { name: "Cleaners", icon: MdCleaningServices },
            { name: "Handymen", icon: MdBuild },
            { name: "Landscapers", icon: MdGrass },
            { name: "Movers", icon: MdLocalShipping },
            { name: "Plumbers", icon: MdPlumbing },
            { name: "Electrical pros", icon: MdElectricalServices },
            { name: "Painters", icon: MdFormatPaint },
            { name: "HVAC pros", icon: MdAcUnit },
            { name: "Contractors", icon: MdConstruction },
          ].map((service, index) => {
            const IconComponent = service.icon;
            return (
              <button
                key={service.name}
                onClick={() => setSelectedCategory(service.name)}
                className={`flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-300 transform hover:scale-110 ${
                  selectedCategory === service.name
                    ? "border-gray-600 text-gray-600 dark:text-gray-400 dark:border-gray-400 scale-110"
                    : "border-transparent text-black dark:text-white hover:border-black/20 dark:hover:border-white/20"
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out forwards`,
                  animationDelay: `${index * 0.05}s`,
                  opacity: 0
                }}
              >
                <IconComponent className={`text-lg transition-transform duration-300 ${
                  selectedCategory === service.name ? "scale-125 rotate-12" : "group-hover:scale-110"
                }`} />
                <span>{service.name}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-12" data-aos="fade-up" data-aos-delay="300">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            Pros for every project in{" "}
            <span className="text-gray-600 dark:text-gray-400 inline-block animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>Your Area.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8" data-aos="fade-up" data-aos-delay="400">
          {selectedCategory === "Cleaners" && [
            {
              title: "House Cleaning",
              image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1920&h=1080&fit=crop&q=90",
            },
            {
              title: "Carpet Cleaning",
              image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop&q=90",
            },
           
            {
              title: "Pressure Washing",
              image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&h=1080&fit=crop&q=90",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="group relative h-64 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white transform group-hover:scale-105 transition-transform duration-300">{service.title}</h3>
              </div>
            </div>
          ))}

          {selectedCategory === "Handymen" && [
            {
              title: "General Repairs",
              image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop&q=90",
            },
            {
              title: "Furniture Assembly",
              image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1920&h=1080&fit=crop&q=90",
            },
           
            {
              title: "Home Maintenance",
              image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop&q=90",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="group relative h-64 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white transform group-hover:scale-105 transition-transform duration-300">{service.title}</h3>
              </div>
            </div>
          ))}

          {selectedCategory === "Landscapers" && [
            {
              title: "Lawn Care",
              image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop&q=90",
            },
            {
              title: "Garden Design",
              image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1920&h=1080&fit=crop&q=90",
            },
           
            {
              title: "Irrigation",
              image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=1080&fit=crop&q=90",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="group relative h-64 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white transform group-hover:scale-105 transition-transform duration-300">{service.title}</h3>
              </div>
            </div>
          ))}

          {selectedCategory === "Plumbers" && [
            {
              title: "Emergency Plumbing",
              image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&q=90",
            },
            {
              title: "Pipe Repair",
              image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop&q=90",
            },
            {
              title: "Water Heater",
              image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop&q=90",
            },
           
          ].map((service, index) => (
            <div
              key={index}
              className="group relative h-64 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white transform group-hover:scale-105 transition-transform duration-300">{service.title}</h3>
              </div>
            </div>
          ))}

          {selectedCategory === "Painters" && [
            {
              title: "Interior Painting",
              image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&h=1080&fit=crop&q=90",
            },
            {
              title: "Exterior Painting",
              image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop&q=90",
            },
        
            {
              title: "Wallpaper Removal",
              image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1920&h=1080&fit=crop&q=90",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="group relative h-64 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white transform group-hover:scale-105 transition-transform duration-300">{service.title}</h3>
              </div>
            </div>
          ))}

          {selectedCategory === "Movers" && [
           
            {
              title: "Long Distance Moving",
              image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=90",
            },
            {
              title: "Packing Services",
              image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&h=1080&fit=crop&q=90",
            },
            {
              title: "Storage Solutions",
              image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=90",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="group relative h-64 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white transform group-hover:scale-105 transition-transform duration-300">{service.title}</h3>
              </div>
            </div>
          ))}

          {selectedCategory === "Electrical pros" && [
            {
              title: "Wiring & Rewiring",
              image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop&q=90",
            },
            {
              title: "Panel Upgrades",
              image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1920&h=1080&fit=crop&q=90",
            },
            {
              title: "Lighting Installation",
              image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1920&h=1080&fit=crop&q=90",
            },
            
          ].map((service, index) => (
            <div
              key={index}
              className="group relative h-64 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white transform group-hover:scale-105 transition-transform duration-300">{service.title}</h3>
              </div>
            </div>
          ))}

          {selectedCategory === "HVAC pros" && [
            {
              title: "AC Repair",
              image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&h=1080&fit=crop&q=90",
            },
            {
              title: "Furnace Installation",
              image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=90",
            },
           
            {
              title: "Thermostat Replacement",
              image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop&q=90",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="group relative h-64 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white transform group-hover:scale-105 transition-transform duration-300">{service.title}</h3>
              </div>
            </div>
          ))}

          {selectedCategory === "Contractors" && [
            {
              title: "Home Remodeling",
              image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop&q=90",
            },
        
            {
              title: "Bathroom Remodel",
              image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1920&h=1080&fit=crop&q=90",
            },
            {
              title: "New Construction",
              image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1920&h=1080&fit=crop&q=90",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="group relative h-64 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white transform group-hover:scale-105 transition-transform duration-300">{service.title}</h3>
              </div>
            </div>
          ))}

         
        </div>

        {/* Trusted pros, coast to coast section */}
        <div className="mt-20 md:mt-32 lg:mt-60 mb-12 md:mb-16 relative overflow-hidden" data-aos="fade-up">
          {/* Background decorative shape */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-100 dark:bg-gray-900 transform rotate-12 origin-top-right opacity-50 -z-10"></div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12" data-aos="fade-up" data-aos-delay="100">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                Trusted pros, coast to coast.
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Don't worry about finding a pro — we cover every county in the U.S.
              </p>
            </div>

            {/* City buttons grid */}
            <div className="flex flex-wrap justify-center gap-3 mb-8" data-aos="fade-up" data-aos-delay="200">
              {[
                "Karachi",
                "Lahore",
                "Islamabad",
                "Rawalpindi",
                "Faisalabad",
                "Multan",
                "Peshawar",
                "Quetta",
                "Gujranwala",
                "Sialkot"
              ].map((city, index) => (
                <button
                  key={city}
                  className="px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-110 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black border-2 border-transparent hover:border-black dark:hover:border-white"
                  style={{
                    animation: `fadeInScale 0.5s ease-out forwards`,
                    animationDelay: `${index * 0.05}s`,
                    opacity: 0
                  }}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Find your town link */}
            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <a
                href="#"
                className="text-black dark:text-white font-semibold text-base sm:text-lg underline hover:opacity-80 transition-opacity duration-300 inline-block transform hover:scale-105"
              >
                Find your town
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-32 lg:mt-60 mb-12 md:mb-16" data-aos="fade-up">
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up" data-aos-delay="100">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
              Why customers love QuickHire<sup className="text-xs md:text-sm align-super">™</sup>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Every day, millions of customers like you rely on QuickHire to care for their homes—and we've got your back if things don't go as planned.
            </p>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center order-2 lg:order-1">
            {/* Left Column - Tabs with Descriptions */}

            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 min-h-[700px]" data-aos="fade-left" data-aos-delay="300">
              {/* Mobile Screen 1: Project Input */}
              {activeTab === 0 && (
                <div className="relative w-[320px] sm:w-[360px] h-[700px] bg-white dark:bg-black rounded-[2.5rem] p-2 shadow-2xl border-2 border-black dark:border-white animate-slide-in-right">
                  <div className="bg-white dark:bg-black rounded-[2rem] overflow-hidden border border-gray-200 dark:border-gray-800 h-full flex flex-col">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center px-6 pt-3 pb-2 text-xs font-medium text-black dark:text-white">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 border border-black dark:border-white rounded-sm">
                          <div className="w-3 h-1.5 bg-black dark:bg-white rounded-sm m-0.5"></div>
                        </div>
                        <div className="w-4 h-2 border border-black dark:border-white rounded-sm">
                          <div className="w-3 h-1.5 bg-black dark:bg-white rounded-sm m-0.5"></div>
                        </div>
                        <div className="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <MdArrowBack className="text-xl text-gray-600 dark:text-gray-400" />
                      <h4 className="text-lg font-bold text-black dark:text-white">Describe your project</h4>
                      <div className="w-6"></div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
                      <div className="space-y-4 animate-fade-in-scale">
                        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                          <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                            What do you need help with?
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {["House cleaning", "Deep clean", "Move-out"].map((tag, i) => (
                              <span 
                                key={i} 
                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 hover:scale-110 ${
                                  i === 0 
                                    ? "bg-black dark:bg-white text-white border-none" 
                                    : "bg-white dark:bg-black text-black dark:text-white border border-gray-300 dark:border-gray-700"
                                }`}
                                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                          <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                            Tell us more (optional)
                          </label>
                          <textarea
                            placeholder="Share details about your project in your own words..."
                            className="w-full h-32 p-4 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none focus:outline-none focus:border-black dark:focus:border-white transition-all duration-300"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                          <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Bedrooms</label>
                            <select className="w-full p-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-all duration-300">
                              <option>2</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Bathrooms</label>
                            <select className="w-full p-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-all duration-300">
                              <option>2</option>
                            </select>
                          </div>
                        </div>

                        <button className="w-full bg-black dark:bg-white hover:opacity-90 text-white dark:text-black font-semibold py-4 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border-2 border-black dark:border-white hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                          <MdSend className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                          <span>Find pros</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Screen 2: Local Pros List */}
              {activeTab === 1 && (
                <div className="relative w-[320px] sm:w-[360px] h-[700px] bg-white dark:bg-black rounded-[2.5rem] p-2 shadow-2xl border-2 border-black dark:border-white animate-slide-in-right">
                  <div className="bg-white dark:bg-black rounded-[2rem] overflow-hidden border border-gray-200 dark:border-gray-800 h-full flex flex-col">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center px-6 pt-3 pb-2 text-xs font-medium text-black dark:text-white">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 border border-black dark:border-white rounded-sm">
                          <div className="w-3 h-1.5 bg-black dark:bg-white rounded-sm m-0.5"></div>
                        </div>
                        <div className="w-4 h-2 border border-black dark:border-white rounded-sm">
                          <div className="w-3 h-1.5 bg-black dark:bg-white rounded-sm m-0.5"></div>
                        </div>
                        <div className="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <MdArrowBack className="text-xl text-gray-600 dark:text-gray-400" />
                      <h4 className="text-lg font-bold text-black dark:text-white">Local pros near you</h4>
                      <MdFilterList className="text-xl text-gray-600 dark:text-gray-400" />
                    </div>

                    {/* Content */}
                    <div className="px-4 py-4 space-y-3 flex-1 overflow-y-auto">
                      {[
                        { name: "Grime Gone Cleaners", rating: 5, distance: "0.8 mi", verified: true, topPro: true },
                        { name: "Sparkle Clean Services", rating: 5, distance: "1.2 mi", verified: true, topPro: false },
                        { name: "Elite Home Cleaning", rating: 4, distance: "2.1 mi", verified: true, topPro: true },
                      ].map((pro, idx) => (
                        <div 
                          key={idx} 
                          className="p-4 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up"
                          style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold border-2 border-black dark:border-white">
                              {pro.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-bold text-black dark:text-white">{pro.name}</h5>
                                {pro.verified && (
                                  <MdVerified className="text-black dark:text-white text-sm" />
                                )}
                                {pro.topPro && (
                                  <span className="px-2 w-[100px] text-center py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold rounded-full border-black dark:border-white">
                                    Top Pro
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {[...Array(pro.rating)].map((_, i) => (
                                  <MdStar key={i} className="text-yellow-400 text-sm" />
                                ))}
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                  <MdLocationOn className="text-xs" />
                                  {pro.distance}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MdVerified className="text-xs" />
                                  Verified
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Screen 3: Guarantee Screen */}
              {activeTab === 2 && (
                <div className="relative w-[320px] sm:w-[360px] h-[700px] overflow-hidden bg-white dark:bg-black rounded-[2.5rem] p-2 shadow-2xl border-2 border-black dark:border-white animate-slide-in-right">
                  <div className="bg-white dark:bg-black rounded-[2rem] overflow-hidden border border-gray-200 dark:border-gray-800 h-full flex flex-col">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center px-6 pt-3 pb-2 text-xs font-medium text-black dark:text-white">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 border border-black dark:border-white rounded-sm">
                          <div className="w-3 h-1.5 bg-black dark:bg-white rounded-sm m-0.5"></div>
                        </div>
                        <div className="w-4 h-2 border border-black dark:border-white rounded-sm">
                          <div className="w-3 h-1.5 bg-black dark:bg-white rounded-sm m-0.5"></div>
                        </div>
                        <div className="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <MdArrowBack className="text-xl text-gray-600 dark:text-gray-400" />
                      <h4 className="text-lg font-bold text-black dark:text-white">Job Guarantee</h4>
                      <div className="w-6"></div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-8 space-y-6 flex-1 overflow-hidden">
                      {/* Guarantee Badge */}
                      <div className="flex flex-col items-center text-center space-y-4 animate-fade-in-scale">
                        <div className="w-20 h-20 rounded-full bg-black dark:bg-white flex items-center justify-center border-2 border-black dark:border-white animate-pulse-slow">
                          <MdCheckCircle className="text-white dark:text-black text-5xl" />
                        </div>
                        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                          <h5 className="text-2xl font-bold text-black dark:text-white mb-2">
                            Job Done Right Guarantee
                          </h5>
                          <p className="text-4xl font-bold text-black dark:text-white mb-1">
                            Up to $2,500
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Protected on every job
                          </p>
                        </div>
                      </div>

                      {/* Guarantee Details */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                          <MdSecurity className="text-black dark:text-white text-xl flex-shrink-0 mt-0.5 transition-transform duration-300 hover:rotate-12" />
                          <div>
                            <h6 className="font-semibold text-black dark:text-white mb-1">Fully Protected</h6>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              If the job isn't done as agreed, you could get up to $2,500 back.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                          <MdThumbUp className="text-black dark:text-white text-xl flex-shrink-0 mt-0.5 transition-transform duration-300 hover:scale-125" />
                          <div>
                            <h6 className="font-semibold text-black dark:text-white mb-1">Quality Assured</h6>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              We verify all pros and ensure they meet our standards.
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            <a href="#" className="text-black dark:text-white underline">
                              Terms apply
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>


            <div className="space-y-6 order-1 lg:order-1" data-aos="fade-right" data-aos-delay="200">
              {[
                { 
                  id: 0, 
                  title: "Get to a hire faster.", 
                  description: "Share details about your project in your own words, so we can find your best fit.",
                  boxed: false 
                },
                { 
                  id: 1, 
                  title: "Only see local, trusted pros.", 
                  description: "We will only show you pros we are confident can do their job very well & better.",
                  boxed: true 
                },
                { 
                  id: 2, 
                  title: "A job done right—guaranteed.", 
                  description: "If the job isn't done as agreed you could get up to $2,500 back. Terms apply.",
                  boxed: false 
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-6 rounded-[30px] cursor-pointer transition-all duration-500 ease-in-out transform ${
                    activeTab === tab.id
                      ? "border-2 border-black dark:border-white bg-white dark:bg-black shadow-lg"
                      : "border-2 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:scale-102 bg-white dark:bg-black"
                  }`}
                
                >
                  <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 transition-all duration-500 ${
                    activeTab === tab.id
                      ? "text-black dark:text-white"
                      : "text-gray-400 dark:text-gray-400"
                  }`}>
                    {tab.title}
                  </h3>
                  <p className={`text-base sm:text-lg transition-all duration-500 ${
                    activeTab === tab.id
                      ? "text-gray-600 dark:text-gray-400 opacity-100"
                      : "text-gray-500 dark:text-gray-500 opacity-70"
                  }`}>
                    {tab.description}
                    {tab.id === 2 && (
                      <a href="#" className="text-black dark:text-white underline hover:opacity-80 ml-1 transition-opacity duration-300">
                        Terms apply.
                      </a>
                    )}
                  </p>
                </button>
              ))}
            </div>

            {/* Mobile Screen - Top on mobile, Right on desktop */}
          
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20 md:mt-32 lg:mt-60 mb-12 md:mb-16" data-aos="fade-up">
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
              What our customers say
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real reviews from real customers who found their perfect pro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                name: "Ahmed Ali",
                location: "Karachi",
                rating: 5,
                review: "Found an amazing cleaner through QuickHire. Professional, punctual, and did an excellent job. Highly recommend!",
                avatar: "AA",
                service: "House Cleaning"
              },
              {
                name: "Fatima Khan",
                location: "Lahore",
                rating: 5,
                review: "The plumber they connected me with fixed my issue in no time. Great service and fair pricing. Will use again!",
                avatar: "FK",
                service: "Plumbing"
              },
              {
                name: "Hassan Malik",
                location: "Islamabad",
                rating: 5,
                review: "QuickHire made it so easy to find a reliable electrician. The pro was knowledgeable and completed the work perfectly.",
                avatar: "HM",
                service: "Electrical Work"
              },
              {
                name: "Ayesha Sheikh",
                location: "Rawalpindi",
                rating: 5,
                review: "Best platform for finding home services. Found a great painter who transformed my living room beautifully.",
                avatar: "AS",
                service: "Painting"
              },
              {
                name: "Bilal Ahmed",
                location: "Faisalabad",
                rating: 5,
                review: "Used QuickHire for moving services. The team was professional, careful with my belongings, and very efficient.",
                avatar: "BA",
                service: "Moving"
              },
              {
                name: "Zainab Hassan",
                location: "Multan",
                rating: 5,
                review: "Excellent experience! Found a skilled handyman who fixed multiple issues around my house. Very satisfied!",
                avatar: "ZH",
                service: "Handyman"
              }
            ].map((review, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-black dark:hover:border-white transition-all duration-2000 hover:shadow-xl transform hover:scale-105"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <MdStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{review.review}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-lg border-2 border-black dark:border-white">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-black dark:text-white mb-1">
                      {review.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MdLocationOn className="text-sm" />
                      <span>{review.location}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {review.service}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Reviews Link */}
          <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="600">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-black dark:text-white font-semibold text-lg underline hover:opacity-80 transition-opacity duration-300"
            >
              View all reviews
              <svg className="w-5 h-5 transform transition-transform duration-300 hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
