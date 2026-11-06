import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Sun, 
  ShieldCheck, 
  Church, 
  Briefcase, 
  Building, 
  Landmark, 
  Users2, 
  Award
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-20 py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-phoenix-500/30 text-xs font-semibold text-phoenix-400">
            <Flame className="w-4 h-4 text-phoenix-500" />
            <span>About Life Recovery Society</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Mission, Vision & Biblical Model
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Creating a replicable, self-sustaining ecosystem where faith, community, dignity, and recovery converge to rebuild lives.
          </p>
        </div>
      </section>

      {/* Mission & Vision Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-slate-900/90 border border-phoenix-500/30 rounded-3xl p-8 sm:p-10 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-phoenix-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-phoenix-600/20 text-phoenix-400 border border-phoenix-500/30">
                <Flame className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Statement of Purpose</span>
                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
              </div>
            </div>
            <blockquote className="text-lg text-slate-200 leading-relaxed font-light border-l-4 border-phoenix-500 pl-4 italic">
              "{siteConfig.mission}"
            </blockquote>
            <p className="text-sm text-slate-400 leading-relaxed">
              We believe sobriety is not just the absence of substances—it is the presence of purpose, belonging, and spiritual connection. By combining safe housing with flexible income opportunities, we eliminate the economic anxiety that often triggers relapse.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-8 sm:p-10 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
                <Sun className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">The Future We Build</span>
                <h2 className="text-2xl font-bold text-white">Our Vision</h2>
              </div>
            </div>
            <blockquote className="text-lg text-slate-200 leading-relaxed font-light border-l-4 border-amber-500 pl-4 italic">
              "{siteConfig.vision}"
            </blockquote>
            <p className="text-sm text-slate-400 leading-relaxed">
              True transformation requires a holistic coalition. By bridging the gap between non-profits, employers, churches, and civic programs, we create an enduring support structure that transforms isolated recovering individuals into community leaders.
            </p>
          </div>
        </div>
      </section>

      {/* The 5 Pillars of Biblical Collaboration */}
      <section className="bg-slate-950 py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Shared Vision & Partnership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              The 5 Collaborative Sectors
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Our Biblical model relies on intentional collaboration across five societal sectors to create self-sustaining recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-phoenix-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-phoenix-600/20 text-phoenix-400 flex items-center justify-center mb-4">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Non-Profit</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mission-first governance, grants, community donations, and specialized recovery support services without commercial profit bias.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">For-Profit</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Business leaders providing flexible hours, dignified employment, vocational training, and sustainable revenue models.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-red-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center mb-4">
                <Church className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Churches</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Spiritual mentorship, pastoral care, volunteer support, congregational prayer, and warm faith-based fellowship.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Government</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Adherence to Ohio Recovery Housing (ORH) and OhioMHAS standards, court diversion alignment, and civic safety partnerships.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Communities</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Neighborhood integration, family reconciliation events, anti-stigma education, and restorative community service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Standards of Care & Quality Assurance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Accountability & Rigor
            </span>
            <h2 className="mt-1 text-3xl font-extrabold text-white">
              Committed to NARR & Ohio Recovery Housing Standards
            </h2>
            <p className="mt-2 text-slate-300 text-sm">
              We hold our residences to the highest national and state standards to ensure physical safety, peer accountability, and ethical resident care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-bold text-white">NARR Standard 3.0 (Level II)</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {siteConfig.standards.narrDescription}
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li>• Certified safety and physical plant inspection</li>
                <li>• Documented house rules and resident rights charter</li>
                <li>• Structured weekly community meetings and peer council</li>
                <li>• Zero-tolerance substance use with compassionate relapse protocol</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-bold text-white">Ohio Recovery Housing (ORH)</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {siteConfig.standards.orhDescription}
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li>• Aligned with Ohio Department of Mental Health & Addiction Services</li>
                <li>• Trauma-informed recovery culture with clear grievance process</li>
                <li>• Integration with local Ohio treatment centers and case managers</li>
                <li>• Regular peer leader training and continuing education</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white">
          Experience the Difference of Purpose-Driven Sober Living
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-base">
          Read about our inaugural home, Made for More, or submit an intake application for yourself or a referral.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/made-for-more"
            className="px-6 py-3 rounded-xl bg-phoenix-600 hover:bg-phoenix-500 text-white font-semibold text-sm transition"
          >
            Tour Made for More Residence
          </Link>
          <Link
            to="/admissions"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 font-semibold text-sm transition"
          >
            Apply for Residency
          </Link>
        </div>
      </section>
    </div>
  );
};
