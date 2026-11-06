import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Home, 
  Sparkles, 
  Briefcase, 
  Users, 
  HeartHandshake, 
  Building2, 
  ShieldAlert, 
  CheckCircle2, 
  Sun,
  Flame
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-dark-mesh pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-phoenix-500/30 text-xs font-semibold text-phoenix-400">
                <Flame className="w-4 h-4 text-phoenix-500 animate-pulse" />
                <span>Faith-Based Recovery • Level II Monitored Housing</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Rising Above Barriers.{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-phoenix-400 via-phoenix-500 to-red-500">
                  Restoring Purpose.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Providing a safe, sober, spiritual, homelike environment and a flexible way to earn an income—inspiring and equipping men and women to overcome addiction and build a meaningful life.
              </p>

              {/* Badges for Standards */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs font-medium text-amber-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  NARR Standard 3.0 Aligned
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs font-medium text-amber-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Ohio Recovery Housing Level II
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Separate Men & Women Sober Living
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/admissions"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-phoenix-600 via-red-600 to-phoenix-700 hover:from-phoenix-500 hover:to-red-500 text-white font-bold text-base shadow-lg shadow-phoenix-900/40 hover:shadow-phoenix-600/50 transition-all transform hover:-translate-y-0.5"
                >
                  <Home className="w-5 h-5" />
                  <span>Apply for Residency</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/made-for-more"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 transition"
                >
                  <span>Explore Made for More</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual with Phoenix & Residence preview */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-phoenix-600 to-red-600 rounded-3xl blur-2xl opacity-30"></div>
                
                <div className="relative bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <img
                        src="/assets/lrs-logo.png"
                        alt="Life Recovery Society"
                        className="h-12 w-auto object-contain"
                      />
                      <div>
                        <div className="text-xs uppercase tracking-wider text-phoenix-400 font-bold">Featured Home</div>
                        <div className="text-lg font-bold text-white">Made for More Residence</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      Level II
                    </span>
                  </div>

                  {/* Residence Image */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-700 shadow-inner group">
                    <img
                      src="/assets/made-for-more-home.jpg"
                      alt="Made for More Recovery Residence Historic Brick Home"
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="bg-slate-900/80 px-2 py-1 rounded backdrop-blur-sm">Historic Brick Setting</span>
                      <span className="bg-phoenix-900/80 text-phoenix-200 px-2 py-1 rounded backdrop-blur-sm">Homelike & Peaceful</span>
                    </div>
                  </div>

                  {/* Program Badges */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                      <div className="font-semibold text-white">Men's Community</div>
                      <div className="text-slate-400">Structured fellowship & leadership</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                      <div className="font-semibold text-white">Women's Community</div>
                      <div className="text-slate-400">Dignified sanctuary & sisterhood</div>
                    </div>
                  </div>

                  <Link
                    to="/made-for-more"
                    className="block text-center text-xs font-semibold text-amber-400 hover:text-amber-300 py-1 transition"
                  >
                    View amenities, standards & daily life →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Mission & Vision Statement Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-800 shadow-xl overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-phoenix-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="p-8 sm:p-12 lg:p-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                Core Identity & Mandate
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
                Our Mission & Vision
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-phoenix-500 to-amber-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Mission Box */}
              <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-8 flex flex-col justify-between hover:border-amber-500/40 transition">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-phoenix-600/20 text-phoenix-400 border border-phoenix-500/30">
                      <Flame className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                  </div>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                    "{siteConfig.mission}"
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-2 text-xs text-amber-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Dignified Living • Spiritual Foundation • Income Pathways</span>
                </div>
              </div>

              {/* Vision Box */}
              <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-8 flex flex-col justify-between hover:border-amber-500/40 transition">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
                      <Sun className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                  </div>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                    "{siteConfig.vision}"
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-2 text-xs text-amber-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Partnership: Churches, Non-Profit, For-Profit, Government</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 R's Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-phoenix-400">
            The Biblical Collaborative Framework
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
            The 4 R's of Life Recovery
          </h2>
          <p className="mt-3 text-slate-400">
            How we partner across non-profits, for-profits, churches, government, and communities to bring lasting transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center mb-5 border border-red-500/30">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-phoenix-400 uppercase tracking-wider mb-1">Step One</div>
            <h3 className="text-xl font-bold text-white mb-3">Rescue Addicts</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Providing immediate refuge from the trap of substance dependency into a safe, structured, drug-free sober living environment.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/30">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Step Two</div>
            <h3 className="text-xl font-bold text-white mb-3">Reconnect Families</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Restoring relationships and rebuilding trust between parents, children, and spouses as emotional and spiritual integrity is renewed.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-phoenix-600/20 text-phoenix-400 flex items-center justify-center mb-5 border border-phoenix-500/30">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-phoenix-400 uppercase tracking-wider mb-1">Step Three</div>
            <h3 className="text-xl font-bold text-white mb-3">Repair Brokenness</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Addressing past wounds, mental health hurdles, and spiritual fractures through peer mentorship, accountability, and discipleship.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/30">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Step Four</div>
            <h3 className="text-xl font-bold text-white mb-3">Restore Communities</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Graduating equipped, employed, and purpose-driven men and women who invest back into churches, businesses, and neighborhoods.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Residence Section: Made for More */}
      <section className="bg-slate-950 py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-600/40 shadow-2xl">
                <img
                  src="/assets/made-for-more-home.jpg"
                  alt="Made for More Residence Historic House"
                  className="w-full h-auto object-cover max-h-[500px]"
                />
                <div className="absolute top-4 left-4 bg-slate-900/90 border border-amber-500/40 rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <img
                    src="/assets/made-for-more-logo.png"
                    alt="Made for More Logo"
                    className="h-7 w-auto object-contain"
                  />
                  <span className="text-xs font-bold text-amber-300">Level II Residence</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center italic">
                Our welcoming, historic brick recovery residence located in Central Ohio.
              </p>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inaugural Sober Living Home</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Introducing "Made for More"
              </h2>

              <p className="text-slate-300 leading-relaxed">
                {siteConfig.firstHome.description}
              </p>

              {/* Key Features List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Separate Men's & Women's Sober Living:</strong>
                    <span className="text-slate-300 text-sm ml-1.5">
                      Ensuring individual focus, psychological safety, and strong peer brotherhood and sisterhood.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">NARR Standard & Ohio Recovery Housing Level II:</strong>
                    <span className="text-slate-300 text-sm ml-1.5">
                      Peer-governed with live-in house managers, house curfew, random drug testing, and structured recovery meetings.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Flexible Income-Earning Model:</strong>
                    <span className="text-slate-300 text-sm ml-1.5">
                      Assisting residents in finding meaningful work that coordinates around their recovery schedule and meeting requirements.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/made-for-more"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition shadow"
                >
                  <span>Learn More About the Home</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-semibold text-sm transition"
                >
                  <span>Check Admissions Criteria</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flexible Income & Vocational Model */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-800 rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-phoenix-400">
                A Dignified Path Forward
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                The "Earn While You Heal" Flexible Income Model
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Many in early recovery face severe financial barriers, court fees, or a lack of flexible employment that respects recovery meeting commitments. Life Recovery Society integrates work with recovery so that one never undermines the other.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {siteConfig.firstHome.workModelHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <Briefcase className="w-4 h-4 text-phoenix-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-6 text-center space-y-4 max-w-sm">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                  <Briefcase className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white">Are You a Local Employer?</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We partner with values-driven businesses willing to offer flexible hours, fair wages, and second-chance employment to motivated recovery residents.
                </p>
                <Link
                  to="/partner"
                  className="inline-block w-full py-2.5 px-4 rounded-lg bg-phoenix-600 hover:bg-phoenix-500 text-white font-medium text-xs transition"
                >
                  Partner as an Employer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl bg-phoenix-gradient p-10 sm:p-14 text-center text-white overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Take the Next Step Toward Restoration?
            </h2>
            <p className="text-lg text-amber-100 font-light leading-relaxed">
              Whether you are an individual seeking sober living, a family member looking for a loved one, a case manager making a referral, or a church looking to partner—we are here for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/admissions"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-base shadow-xl transition transform hover:scale-105"
              >
                Apply Online Now
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-base transition"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
