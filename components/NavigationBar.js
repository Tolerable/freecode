import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'PNEWS', href: '/news' },
    { label: 'PSPEAK', href: '/speak' },
    { label: 'PIMAGES', href: '/images' },
    { label: 'PSTREAM', href: '/stream' },
    { label: 'AI PERSONA', href: '/ai-persona' },
    { label: 'PARALLAX', href: '/parallax' },
    { label: 'PSHOW', href: '/show' },
    { label: 'PMEME', href: '/meme' },
    { label: 'GAMES', href: '/games' },
    { label: 'ABOUT', href: '/about' }
  ];

  return (
    <nav className="bg-black text-white w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-red-600 text-2xl font-bold">
              AI-MINISTRIES
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white hover:text-red-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-500 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white hover:text-red-500 block px-3 py-2 text-base font-medium border-b border-gray-700"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;