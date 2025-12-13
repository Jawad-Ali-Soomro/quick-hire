"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {

  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 dark:bg-black/95 backdrop-blur-lg border-b border-black/10 dark:border-white/10 animate-fade-in">
      <nav className=" mx-auto px-4 sm:px-6 lg:px-8 max-w-[1350px]">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex gap-6 items-center justify-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl md:text-3xl font-black text-black dark:text-white">
              QuickHire<sup className="text-xs md:text-sm align-super">™</sup>
            </span>
          </Link>
        <div className="ml-10 flex gap-6 items-center justify-center">
        {["About", "Services", "Contact", "How it works"].map((item, index) => (
            <Link key={index} href={`/${item.toLowerCase()}`} className="text-sm uppercase tracking-wide font-bold text-black dark:text-white hover:opacity-70 transition-opacity">
              {item}
            </Link>
          ))}
        </div>
          </div>

          <div className="flexitems-center space-x-6">
            
           
          <div className="flex gap-2">
          <button
              className="cursor-pointer w-[150px] h-[50px] font-black bg-black dark:bg-white text-white dark:text-black rounded-full text-sm hover:opacity-90 transition-opacity"
            >
              Hire.
            </button>
            <button
              className="cursor-pointer w-[150px] h-[50px] font-black border-2 border-black dark:border-white text-black dark:text-white rounded-full text-sm hover:opacity-90 transition-opacity"
            >
              Join.
            </button>
          </div>
          </div>

         
        </div>

       
      </nav>
    </header>
  );
}

