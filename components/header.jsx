"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MdMenu, MdClose } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = ["About", "Services", "Contact", "How it works"];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header at the top of the page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 z-50 w-full bg-white/95 dark:bg-black/95 backdrop-blur-lg border-b border-black/10 dark:border-white/10 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1350px]">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
         <div className="flex gap-10">
         <Link href="/" className="flex items-center z-50">
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-black dark:text-white">
              QuickHire<sup className="text-xs md:text-sm align-super">™</sup>
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-sm uppercase tracking-wide font-bold text-black dark:text-white hover:opacity-70 transition-opacity"
              >
                {item}
              </Link>
            ))}
          </div>
         </div>

          {/* Desktop Navigation */}
         

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/hire"
              className="cursor-pointer w-[150px] px-4 md:px-6 h-10 md:h-[50px] font-black bg-black dark:bg-white text-white dark:text-black rounded-full text-xs md:text-sm hover:opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center"
            >
              Hire.
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="cursor-pointer w-[150px] px-4 md:px-6 h-10 md:h-[50px] font-black border-2 border-black dark:border-white text-black dark:text-white rounded-full text-xs md:text-sm hover:opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="cursor-pointer w-[50px]  flex items-center justify-center h-10 md:h-[50px] font-black border-2 border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-full text-xs md:text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  <BiLogOut />
                </button>
              </>
            ) : (
              <Link
                href="/join"
                className="cursor-pointer w-[150px] px-4 md:px-6 h-10 md:h-[50px] font-black border-2 border-black dark:border-white text-black dark:text-white rounded-full text-xs md:text-sm hover:opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center"
              >
                Join.
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-black dark:text-white z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <MdClose className="text-2xl" />
            ) : (
              <MdMenu className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed top-16 md:top-20 left-0 w-full bg-white dark:bg-black border-b border-black/10 dark:border-white/10 transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 py-6">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-4 mb-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base uppercase tracking-wide font-bold text-black dark:text-white hover:opacity-70 transition-opacity py-2"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Mobile Buttons */}
            <div className="flex flex-col gap-3">
              <Link
                href="/hire"
                onClick={() => setIsMenuOpen(false)}
                className="w-full h-12 font-black bg-black dark:bg-white text-white dark:text-black rounded-full text-sm hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                Hire.
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full h-12 font-black border-2 border-black dark:border-white text-black dark:text-white rounded-full text-sm hover:opacity-90 transition-opacity flex items-center justify-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      logout();
                    }}
                    className="w-full h-12 font-black border-2 border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-full text-sm hover:opacity-90 transition-opacity"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/join"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full h-12 font-black border-2 border-black dark:border-white text-black dark:text-white rounded-full text-sm hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  Join.
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
