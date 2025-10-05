'use client';

import { useState } from 'react';
import { Shield, Menu, X, LogIn } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg group-hover:scale-105 transition-transform duration-200">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Guardrail AI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center space-x-2 py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-0.5">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-lg border border-gray-700">
                Incoming feature
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 border border-gray-700"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-gray-300" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-300" />
                )}
              </button>
              
              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-20 animate-in fade-in slide-in-from-top-2">
                  <button className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-150">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                    <span className="text-xs text-gray-400 ml-auto">Incoming</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};