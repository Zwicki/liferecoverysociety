import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* 4 R's Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h3 className="text-xs font-semibold tracking-wider text-amber-500 uppercase">
              Our Foundational Mandate
            </h3>
            <p className="mt-2 text-xl font-bold text-white">
              A Replicable, Self-Sustaining Biblical Model of Recovery
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {siteConfig.fourRs.map((r, i) => (
              <div
                key={i}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-phoenix-500/40 transition-colors"
              >
                <div className="text-xs font-bold text-phoenix-400 mb-1">{r.subtitle}</div>
                <h4 className="text-lg font-bold text-white mb-2">{r.title}</h4>
                <p className="text-xs leading-relaxed text-slate-300">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Organization & Logos */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="/assets/lrs-logo.png"
                alt="Life Recovery Society"
                className="h-14 w-auto object-contain"
              />
              <div>
                <h3 className="text-lg font-bold text-white">Life Recovery Society</h3>
                <p className="text-xs text-amber-400 font-medium">Rebuilding Lives • Restoring Hope</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Helping those struggling with addiction and mental health overcome barriers through a safe, sober, spiritual, homelike environment and flexible income opportunities.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <div className="bg-slate-900 border border-amber-500/30 rounded-lg p-2.5 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span className="text-xs text-slate-200 font-medium">
                  NARR Standard 3.0 & Ohio Recovery Housing Certified Level II
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-phoenix-400 transition">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-phoenix-400 transition">
                  Mission & Vision
                </Link>
              </li>
              <li>
                <Link to="/made-for-more" className="hover:text-phoenix-400 transition">
                  Made for More Residence
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-phoenix-400 transition">
                  Admissions & Intake
                </Link>
              </li>
              <li>
                <Link to="/partner" className="hover:text-phoenix-400 transition">
                  Partner with Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-phoenix-400 transition">
                  Contact & Referrals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Made for More Residence */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Recovery Residence
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Separate Men's Sober Living</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Separate Women's Sober Living</span>
              </div>
              <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                Level II monitored environment with live-in leadership, random toxicology, peer community, and earned income model.
              </p>
              <Link
                to="/made-for-more"
                className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold pt-1"
              >
                <span>View residence details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 4: Contact & Crisis Help */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-phoenix-500 mt-1 shrink-0" />
                <span>Central Ohio Region<br />NARR & ORH Residence</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-phoenix-500 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-phoenix-500 shrink-0" />
                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`} className="hover:text-white transition">
                  {siteConfig.contact.phoneFormatted}
                </a>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-lg bg-red-950/40 border border-red-900/60">
              <div className="text-xs font-bold text-red-300 uppercase">24/7 Crisis Support</div>
              <div className="text-xs text-slate-300 mt-0.5">Call or Text <strong className="text-white">988</strong> anytime</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Operating in compliance with NARR Standard 3.0 and Ohio Recovery Housing (ORH) Level II guidelines.
          </div>
          <div className="flex items-center gap-6">
            <span>Domain: <strong className="text-slate-300">{siteConfig.domain}</strong></span>
            <span>Made with <Heart className="w-3 h-3 inline text-red-500 mx-0.5 fill-red-500" /> for Recovery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
