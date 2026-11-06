import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Heart, Shield, Home as HomeIcon } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Made for More Home', path: '/made-for-more' },
    { name: 'Admissions & Referrals', path: '/admissions' },
    { name: 'Partner & Donate', path: '/partner' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Crisis and Helpline Bar */}
      <div className="bg-slate-950 border-b border-slate-800 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-red-900/60 text-red-200 border border-red-700/50">
              Immediate Help
            </span>
            <span>In crisis? Call or text <strong className="text-white">988</strong> Suicide & Crisis Lifeline</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">Ohio CareLine: <strong className="text-white">{siteConfig.contact.ohioCareLine}</strong></span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              NARR & Ohio Recovery Housing Level II Standards
            </span>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-1 text-slate-200 hover:text-white transition"
            >
              <Phone className="w-3 h-3 text-phoenix-500" />
              <span>{siteConfig.contact.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Name */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/assets/lrs-logo.png"
                  alt="Life Recovery Society Logo"
                  className="h-14 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-phoenix-400 transition-colors">
                  Life Recovery Society
                </span>
                <span className="text-xs text-amber-400/90 font-medium tracking-wide uppercase">
                  Level II Sober Living & Recovery Residences
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-phoenix-600/20 text-phoenix-400 border border-phoenix-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Call To Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-phoenix-600 to-red-600 hover:from-phoenix-500 hover:to-red-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-red-950/40 hover:shadow-phoenix-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <HomeIcon className="w-4 h-4" />
                <span>Apply for Residence</span>
              </Link>
              <Link
                to="/partner"
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 px-3.5 py-2.5 rounded-lg text-sm font-medium transition"
              >
                <Heart className="w-4 h-4 text-amber-500" />
                <span>Support</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="lg:hidden border-b border-slate-800 bg-slate-900/98 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-phoenix-600/20 text-phoenix-400 border-l-4 border-phoenix-500'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              <Link
                to="/admissions"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-gradient-to-r from-phoenix-600 to-red-600 text-white py-2.5 rounded-lg font-semibold shadow"
              >
                Apply for Residence
              </Link>
              <Link
                to="/partner"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-slate-800 text-amber-400 border border-amber-500/30 py-2.5 rounded-lg font-medium"
              >
                Partner & Support
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
