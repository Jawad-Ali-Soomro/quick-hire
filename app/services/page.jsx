"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { 
  MdCleaningServices, 
  MdBuild, 
  MdGrass, 
  MdLocalShipping,
  MdPlumbing,
  MdElectricalServices,
  MdFormatPaint,
  MdAcUnit,
  MdConstruction
} from "react-icons/md";

export default function Services() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  const handleServiceClick = (serviceTitle) => {
    // Navigate to hire page with service filter
    router.push(`/hire?service=${encodeURIComponent(serviceTitle)}`);
  };

  const services = [
    {
      icon: MdCleaningServices,
      title: "Home Cleaning",
      description: "Professional house cleaning, deep cleaning, and move-in/out services",
      image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1920&h=1080&fit=crop&q=90"
    },
    {
      icon: MdBuild,
      title: "Handyman Services",
      description: "General repairs, furniture assembly, and home maintenance",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop&q=90"
    },
    {
      icon: MdGrass,
      title: "Landscaping",
      description: "Lawn care, garden design, and irrigation services",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop&q=90"
    },
    {
      icon: MdLocalShipping,
      title: "Moving Services",
      description: "Long distance moving, packing, and storage solutions",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=90"
    },
    {
      icon: MdPlumbing,
      title: "Plumbing",
      description: "Emergency plumbing, pipe repair, and water heater services",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&q=90"
    },
    {
      icon: MdElectricalServices,
      title: "Electrical Work",
      description: "Wiring, panel upgrades, and lighting installation",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop&q=90"
    },
    {
      icon: MdFormatPaint,
      title: "Painting",
      description: "Interior and exterior painting, wallpaper removal",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&h=1080&fit=crop&q=90"
    },
    {
      icon: MdAcUnit,
      title: "HVAC Services",
      description: "AC repair, furnace installation, and thermostat replacement",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&h=1080&fit=crop&q=90"
    },
    {
      icon: MdConstruction,
      title: "Contractors",
      description: "Home remodeling, bathroom remodels, and new construction",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop&q=90"
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-black font-sans pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black dark:text-white mb-6">
              Our Services
            </h1>
            <p className="text-lg sm:text-xl font-bold text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Find trusted professionals for all your home service needs across Pakistan
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  onClick={() => handleServiceClick(service.title)}
                  className="group relative h-80 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300 cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="mb-3">
                      <Icon className="text-4xl text-white mb-3" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-white/80 text-sm">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg font-bold text-gray-600 dark:text-gray-400 mb-8">
            Find a professional in your area today
          </p>
          <button className="px-8 py-4 w-[300px] mx-auto bg-black dark:bg-white text-white dark:text-black font-bold rounded-full text-lg hover:opacity-90 transition-opacity">
            Find a Pro
          </button>
        </div>
      </section>
    </div>
  );
}

