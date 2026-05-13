"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 flex items-center justify-center font-bold rounded-xl bg-[#6D5EF5] text-white">
            C
          </div>
          <h1 className="text-lg sm:text-xl font-semibold">CostPilot</h1>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <Link className="hover:text-black transition" href="/">
            Home
          </Link>
          <Link className="hover:text-black transition" href="/#how-it-works">
            How it works
          </Link>
          <Link className="hover:text-black transition" href="/#features">
            Features
          </Link>
        </div>
        <Link
          href="/audit"
          className="hidden md:block bg-[#6D5EF5] hover:bg-[#5b4df0] rounded-xl px-5 text-white p-2"
        >
          Start Audit
        </Link>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden px-4 pb-5">
          <div className="flex flex-col gap-4 text-gray-600 text-sm">
            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            <Link href="#how-it-works" onClick={() => setIsOpen(false)}>
              How it works
            </Link>

            <Link href="#features" onClick={() => setIsOpen(false)}>
              Features
            </Link>

            <Link
              href="/audit"
              className="bg-[#6D5EF5] hover:bg-[#5b4df0] rounded-xl px-5 py-2 text-white text-center transition"
              onClick={() => setIsOpen(false)}
            >
              Start Audit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
