import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Shield
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const MadeForMorePage: React.FC = () => {
  return (
    <div className="space-y-24 py-12">
      {/* Hero Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Inaugural Level II Sober Living Residence</span>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="/assets/made-for-more-logo.png"
                alt="Made for More Logo"
                className="h-16 w-auto object-contain"
              />
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Made for More
                </h1>
                <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                  Men's & Women's Recovery Residences
                </p>
              </div>
            </div>

            <p className="text-lg text-slate-300 leading-relaxed">
              {siteConfig.firstHome.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-amber-500/30 text-xs font-medium text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                NARR Level II Monitored
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-amber-500/30 text-xs font-medium text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Ohio Recovery Housing Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-emerald-500/30 text-xs font-medium text-emerald-400">
                <Users className="w-4 h-4 text-emerald-400" />
                Separate Men & Women Tracks
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-lg transition"
              >
                <span>Apply to Made for More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition"
              >
                <span>Schedule a Residence Tour</span>
              </Link>
            </div>
          </div>

          {/* Residence Photo Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-600/40 shadow-2xl bg-slate-900 group">
              <img
                src="/assets/made-for-more-home.jpg"
                alt="Made for More Recovery Residence - Historic Brick Home"
                className="w-full h-full object-cover max-h-[580px] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-600 text-white uppercase tracking-wider">
                  Safe • Sober • Spiritual • Homelike
                </span>
                <h3 className="text-xl font-bold text-white">A Dignified Place to Heal</h3>
                <p className="text-xs text-slate-300">
                  Historic red-brick craftsmanship with spacious porch, warm shared spaces, and quiet reflection rooms in Ohio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separate Men's and Women's Programs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-phoenix-400">
            Tailored Brotherhood & Sisterhood
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
            Separate Men's & Women's Sober Living Tracks
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            While united under the Life Recovery Society mission, our men's and women's residences maintain separate accommodations and distinct community programming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Men's Track */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 hover:border-phoenix-500/50 transition space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-phoenix-600/20 text-phoenix-400 flex items-center justify-center font-bold text-xl border border-phoenix-500/30">
                  M
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Men's Residence Track</h3>
                  <p className="text-xs text-phoenix-400 font-medium">Brotherhood, Purpose & Accountability</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-slate-300">
                Level II Monitored
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Designed to help men conquer addiction, take ownership of their lives, and restore their roles as fathers, sons, and leaders in society.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-phoenix-500 shrink-0" />
                <span>Male Peer Recovery Leader & live-in house leadership</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-phoenix-500 shrink-0" />
                <span>Weekly Men's Life Group & Bible study sessions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-phoenix-500 shrink-0" />
                <span>Mentorship focused on vocational skills, fatherhood & work ethic</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-phoenix-500 shrink-0" />
                <span>Strong brotherhood culture centered on truth and vulnerability</span>
              </div>
            </div>

            <Link
              to="/admissions?track=mens"
              className="inline-flex items-center gap-2 text-xs font-semibold text-phoenix-400 hover:text-phoenix-300 pt-2"
            >
              <span>Apply for Men's Residence Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Women's Track */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 hover:border-amber-500/50 transition space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-xl border border-amber-500/30">
                  W
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Women's Residence Track</h3>
                  <p className="text-xs text-amber-400 font-medium">Sisterhood, Healing & Dignity</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-slate-300">
                Level II Monitored
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              A peaceful, trauma-informed sanctuary enabling women to heal from emotional wounds, rebuild confidence, and reclaim their God-given identity.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Female Peer Recovery Leader & live-in house leadership</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Trauma-informed sisterhood meetings & emotional healing circles</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Focus on maternal reunification, boundary-setting & self-worth</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Warm, safe domestic environment honoring dignity and privacy</span>
              </div>
            </div>

            <Link
              to="/admissions?track=womens"
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 pt-2"
            >
              <span>Apply for Women's Residence Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Level II Standards & Daily Rhythm */}
      <section className="bg-slate-950 py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Structured & Safe
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              What Defines a Level II Recovery Residence?
            </h2>
            <p className="text-slate-400 text-sm">
              According to NARR and Ohio Recovery Housing standards, Level II homes provide monitored, community-governed sober living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-phoenix-600/20 text-phoenix-400 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Monitored Accountability</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Live-in house manager or senior peer leader on site. Random urine toxicology screenings and alcohol breathalyzers to protect resident sobriety.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Peer Governance & Rhythm</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Weekly house meetings, shared chores, curfew guidelines, and active attendance at 12-step or faith-based recovery meetings each week.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Flexible Work & Income</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Residents are encouraged and equipped to work, attend school, or volunteer. We assist in scheduling employment that never collides with recovery obligations.
              </p>
            </div>
          </div>

          {/* Daily Rhythm Timeline */}
          <div className="mt-12 bg-slate-900/80 border border-slate-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold text-white">A Day in the Life at Made for More</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-300">
              <div className="border-l-2 border-phoenix-500 pl-4 py-1">
                <strong className="block text-white text-sm mb-1">Morning: Center & Plan</strong>
                Personal devotions or reflection, coffee in the communal kitchen, chore completion, and departure for work or outpatient treatment.
              </div>
              <div className="border-l-2 border-amber-500 pl-4 py-1">
                <strong className="block text-white text-sm mb-1">Afternoon: Purpose & Vocation</strong>
                Work shifts with partner employers, vocational training, educational classes, or community volunteering.
              </div>
              <div className="border-l-2 border-emerald-500 pl-4 py-1">
                <strong className="block text-white text-sm mb-1">Evening: Family Dinner & Meetings</strong>
                Shared community meal, recovery meeting attendance (Celebrate Recovery, AA/NA, or faith group), and peer fellowship.
              </div>
              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <strong className="block text-white text-sm mb-1">Night: Curfew & Rest</strong>
                Check-in with house manager, quiet reflection, reading, and peaceful rest in a safe, drug-free home.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white">
          Begin Your Residency Journey Today
        </h2>
        <p className="text-slate-300 text-sm sm:text-base">
          Spaces are limited to maintain our high staff-to-resident ratio and homelike setting. Submit an inquiry or application online now.
        </p>
        <Link
          to="/admissions"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-phoenix-600 to-amber-600 hover:from-phoenix-500 hover:to-amber-500 text-white font-bold text-sm shadow-xl transition"
        >
          <span>Complete Resident Application</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};
