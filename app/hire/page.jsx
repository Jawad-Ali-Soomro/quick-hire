"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { createPortal } from "react-dom";
import { 
  MdSearch,
  MdLocationOn,
  MdStar,
  MdVerified,
  MdAccessTime,
  MdEmojiEvents,
  MdFilterList,
  MdSort,
  MdKeyboardArrowDown,
  MdClose,
  MdEmail,
  MdPhone,
  MdMessage
} from "react-icons/md";

function HireContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [selectedArea, setSelectedArea] = useState("Karachi");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [pros, setPros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(true);
  const [selectedPro, setSelectedPro] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [locationDropdownPosition, setLocationDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const locationButtonRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });

    // Pre-fill contact form with user data if logged in
    if (user) {
      setContactForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        message: ""
      });
    }
  }, [user]);

  // Get user location on mount
  useEffect(() => {
    const getUserLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const response = await fetch(
                `/api/location?lat=${latitude}&lng=${longitude}`
              );
              const data = await response.json();
              if (data.success && data.data.city) {
                setSelectedArea(data.data.city);
              }
            } catch (error) {
              console.error('Error getting location:', error);
            } finally {
              setLocationLoading(false);
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
            setLocationLoading(false);
          }
        );
      } else {
        setLocationLoading(false);
      }
    };

    getUserLocation();
  }, []);

  // Get service from URL params
  useEffect(() => {
    const service = searchParams.get('service');
    if (service) {
      setSelectedService(service);
      setSearchQuery(service);
    }
  }, [searchParams]);

  // Fetch pros from API
  useEffect(() => {
    const fetchPros = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          sortBy: sortBy,
        });

        // Always filter by location (city)
        if (selectedArea) {
          params.append('location', selectedArea);
        }

        // Filter by service if selected
        if (selectedService) {
          params.append('service', selectedService);
        }

        // Search query
        if (searchQuery) {
          params.append('search', searchQuery);
        }

        const response = await fetch(`/api/pros?${params.toString()}`);
        const data = await response.json();

        if (data.success) {
          // Ensure all pros have _id field as string
          const prosWithId = data.data.map(pro => {
            const proId = pro._id || pro.id;
            return {
              ...pro,
              _id: typeof proId === 'string' ? proId : String(proId),
              id: typeof proId === 'string' ? proId : String(proId)
            };
          });
          setPros(prosWithId);
        } else {
          console.error('Error fetching pros:', data.error);
        }
      } catch (error) {
        console.error('Error fetching pros:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!locationLoading) {
      fetchPros();
    }
  }, [selectedArea, selectedService, searchQuery, sortBy, locationLoading]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (isSortOpen && target && !target.closest('[data-dropdown-container]')) {
        setIsSortOpen(false);
      }
      if (isLocationOpen && target && !target.closest('[data-location-dropdown-container]') && !target.closest('[data-location-dropdown-menu]')) {
        setIsLocationOpen(false);
      }
    };
    if (isSortOpen || isLocationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortOpen, isLocationOpen]);

  const areas = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta"];

  return (
    <div className="w-full bg-white dark:bg-black font-sans pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 relative" style={{ zIndex: 30 }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8" data-aos="fade-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black dark:text-white mb-4">
              {selectedService ? `${selectedService} Professionals` : "Find Your Perfect Pro"}
            </h1>
            <p className="text-lg sm:text-xl font-bold text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {selectedService 
                ? `Browse verified ${selectedService.toLowerCase()} professionals in ${selectedArea}`
                : "Browse all verified professionals"}
            </p>
            {selectedService && (
              <button
                onClick={() => {
                  setSelectedService("");
                  setSearchQuery("");
                  router.push("/hire");
                }}
                className="mt-4 px-6 py-2 text-sm font-bold border-2 border-gray-300 dark:border-gray-700 rounded-[30px] text-black dark:text-white hover:border-black dark:hover:border-white transition-all duration-300"
              >
                Clear Filter
              </button>
            )}
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by service or pro name..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-[30px] bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>
              <div className="relative w-full md:w-auto" data-location-dropdown-container ref={locationButtonRef} style={{ zIndex: 9999 }}>
                <button
                  onClick={() => {
                    if (locationButtonRef.current) {
                      const rect = locationButtonRef.current.getBoundingClientRect();
                      setLocationDropdownPosition({
                        top: rect.bottom + 8,
                        left: rect.left,
                        width: rect.width
                      });
                    }
                    setIsLocationOpen(!isLocationOpen);
                  }}
                  className="w-full md:w-auto flex items-center gap-2 px-4 py-4 pl-12 pr-10 border-2 border-gray-300 dark:border-gray-700 rounded-[30px] bg-white dark:bg-black text-black dark:text-white hover:border-black dark:hover:border-white transition-all duration-300 text-sm font-bold cursor-pointer relative"
                  style={{ zIndex: 9999 }}
                >
                  <MdLocationOn className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                  <span>{selectedArea}</span>
                  <MdKeyboardArrowDown className={`absolute right-4 top-1/2 -translate-y-1/2 text-xl transition-transform duration-300 ${isLocationOpen ? "rotate-180" : ""}`} />
                </button>
                
                {/* Location Dropdown Menu - Portal */}
                {isLocationOpen && typeof window !== 'undefined' && createPortal(
                  <>
                    <div 
                      className="fixed inset-0 bg-transparent"
                      onClick={() => setIsLocationOpen(false)}
                      style={{ zIndex: 99998 }}
                    />
                    <div 
                      ref={locationDropdownRef}
                      data-location-dropdown-menu
                      className="fixed bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 rounded-[30px] overflow-hidden shadow-2xl"
                      style={{ 
                        zIndex: 99999,
                        top: `${locationDropdownPosition.top}px`,
                        left: `${locationDropdownPosition.left}px`,
                        width: `${locationDropdownPosition.width}px`
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {areas.map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedArea(area);
                            setIsLocationOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${
                            selectedArea === area
                              ? "bg-black dark:bg-white text-white dark:text-black"
                              : "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </>,
                  document.body
                )}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center justify-between relative" style={{ zIndex: 9999 }}>
              <div className="flex items-center gap-4 relative" style={{ zIndex: 9999 }}>
                <MdFilterList className="text-2xl text-black dark:text-white" />
                <div className="relative" data-dropdown-container ref={buttonRef} style={{ zIndex: 9999 }}>
                  <button
                    onClick={() => {
                      if (buttonRef.current) {
                        const rect = buttonRef.current.getBoundingClientRect();
                        setDropdownPosition({
                          top: rect.bottom + 8,
                          left: rect.left,
                          width: rect.width
                        });
                      }
                      setIsSortOpen(!isSortOpen);
                    }}
                    className="flex items-center gap-2 px-4 py-2 pr-8 border-2 border-gray-300 dark:border-gray-700 rounded-[30px] bg-white dark:bg-black text-black dark:text-white hover:border-black dark:hover:border-white transition-all duration-300 text-sm font-bold cursor-pointer relative"
                    style={{ zIndex: 9999 }}
                  >
                    <span>
                      {sortBy === "rating" && "Highest Rated"}
                      {sortBy === "distance" && "Nearest First"}
                      {sortBy === "reviews" && "Most Reviews"}
                      {sortBy === "response" && "Fastest Response"}
                    </span>
                    <MdKeyboardArrowDown className={`text-xl transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
                
                {/* Dropdown Menu - Portal */}
                {isSortOpen && typeof window !== 'undefined' && createPortal(
                  <>
                    <div 
                      className="fixed inset-0 bg-transparent"
                      onClick={() => setIsSortOpen(false)}
                      style={{ zIndex: 99998 }}
                    />
                    <div 
                      ref={dropdownRef}
                      className="fixed bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 rounded-[30px] overflow-hidden shadow-2xl"
                      style={{ 
                        zIndex: 99999,
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                        width: `${dropdownPosition.width}px`
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {[
                        { value: "rating", label: "Highest Rated" },
                        { value: "distance", label: "Nearest First" },
                        { value: "reviews", label: "Most Reviews" },
                        { value: "response", label: "Fastest Response" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${
                            sortBy === option.value
                              ? "bg-black dark:bg-white text-white dark:text-black"
                              : "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>,
                  document.body
                )}
              </div>
              <div className="text-sm font-bold text-gray-600 dark:text-gray-400">
                {pros.length} pros found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pros List */}
      <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg font-bold text-gray-600 dark:text-gray-400">Loading pros...</p>
            </div>
          ) : pros.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg font-bold text-gray-600 dark:text-gray-400">
                {selectedService 
                  ? `No ${selectedService.toLowerCase()} pros found in ${selectedArea}`
                  : "No pros found"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                {selectedService 
                  ? "Try selecting a different location or service"
                  : "Try adjusting your search"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pros.map((pro, index) => (
              <div
                key={pro._id || pro.id || index}
                onClick={() => {
                  const proId = pro._id || pro.id;
                  if (proId) {
                    router.push(`/pro/${String(proId)}`);
                  } else {
                    console.error('Pro ID is missing:', pro);
                  }
                }}
                className="bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-[30px] overflow-hidden hover:border-black dark:hover:border-white transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] cursor-pointer"
                style={{ zIndex: 1 }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {/* Image */}
                  <div className="relative h-48 md:h-full min-h-[200px]">
                    <Image
                      src={pro.image}
                      alt={pro.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      {pro.topPro && (
                        <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold rounded-full border-2 border-black dark:border-white">
                          Top Pro
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-black text-black dark:text-white">{pro.name}</h3>
                          {pro.verified && (
                            <MdVerified className="text-black dark:text-white text-lg" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(Math.floor(pro.rating || 0))].map((_, i) => (
                            <MdStar key={i} className="text-yellow-400 text-sm" />
                          ))}
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                            ({pro.reviews || 0} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-500 mb-2">Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {pro.services.map((service, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-xs font-bold rounded-full border border-gray-300 dark:border-gray-700"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <MdLocationOn className="text-sm" />
                        {pro.location?.city || selectedArea}
                      </span>
                      <span className="flex items-center gap-1">
                        <MdAccessTime className="text-sm" />
                        Responds in {pro.responseTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MdEmojiEvents className="text-sm" />
                        {pro.yearsInBusiness} yrs
                      </span>
                    </div>

                    {/* Action Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isAuthenticated) {
                          // Redirect to login page
                          router.push('/join');
                        } else {
                          // Show contact modal
                          setSelectedPro(pro);
                          setShowContactModal(true);
                        }
                      }}
                      className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-[30px] hover:opacity-90 transition-opacity border-2 border-black dark:border-white"
                    >
                      Contact Pro
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && selectedPro && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 dark:bg-white/20 backdrop-blur-md"
          onClick={() => setShowContactModal(false)}
        >
          <div 
            className="relative w-full max-w-md bg-white dark:bg-black border-2 border-black dark:border-white rounded-[30px] shadow-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-black dark:text-white hover:opacity-70 transition-opacity z-10"
            >
              <MdClose className="text-2xl" />
            </button>

            {/* Modal Content */}
            <div>
              <h2 className="text-2xl font-black text-black dark:text-white mb-2">
                Contact {selectedPro.name}
              </h2>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-6">
                Fill out the form below to send a message and initiate a contract
              </p>

              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    // Get user ID from localStorage or auth context
                    const token = localStorage.getItem('token');
                    
                    const response = await fetch('/api/contacts', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        proId: selectedPro._id || selectedPro.id,
                        userId: user?._id || user?.id || null,
                        email: contactForm.email,
                        phone: contactForm.phone,
                        message: contactForm.message,
                        customerName: contactForm.name || user?.name || null,
                        service: selectedService || null,
                      }),
                    });

                    const data = await response.json();

                    if (data.success) {
                      alert('Your contact request has been sent! The pro will respond within 24 hours.');
                      setShowContactModal(false);
                      setContactForm({ name: "", email: "", phone: "", message: "" });
                    } else {
                      alert('Error: ' + data.error);
                    }
                  } catch (error) {
                    console.error('Error sending contact request:', error);
                    alert('Failed to send contact request. Please try again.');
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <div className="relative">
                    <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      placeholder="Your Email"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-[30px] bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <MdPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      required
                      placeholder="Your Phone Number"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-[30px] bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <MdMessage className="absolute left-4 top-5 text-lg text-gray-400" />
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      placeholder="Describe your project or service need..."
                      rows={4}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-[30px] bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-black rounded-[30px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 border-2 border-black dark:border-white mt-4"
                >
                  Send Contact Request
                </button>
              </form>

              <p className="text-xs text-center text-gray-500 dark:text-gray-500 font-bold mt-4">
                By sending this request, you agree to our terms and conditions. The pro will respond within 24 hours.
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default function Hire() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-white dark:bg-black font-sans flex items-center justify-center pt-24">
        <p className="text-lg font-bold text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    }>
      <HireContent />
    </Suspense>
  );
}
