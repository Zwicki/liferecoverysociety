import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  MapPin, 
  Users, 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck, 
  Footprints, 
  Home, 
  DollarSign, 
  Award,
  ArrowRight
} from 'lucide-react';
import { StreetPrayerMap } from '../components/impact/StreetPrayerMap';
import { ResidentServicesImpact } from '../components/impact/ResidentServicesImpact';
import { ImpactReportPublisher } from '../components/impact/ImpactReportPublisher';
import { 
  IMPACT_SEED_WALKS, 
  IMPACT_SEED_PINS, 
  IMPACT_SEED_RESIDENT_SERVICES 
} from '../data/communityImpactData';

export const CommunityImpactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'report' | 'map' | 'services'>('report');

  return (
    <div className="space-y-16 py-12">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-phoenix-600/20 to-amber-600/20 border border-phoenix-500/30 text-xs font-semibold text-phoenix-400">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Consolidated Community Impact Dashboard & Report</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Quantifying Faith, Restoration & Community Transformation
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Combining the sidewalk encounters and prayer walks of the <strong>Hope Dealers</strong> outreach with the residential milestones and workforce readiness of the <strong>Made for More Recovery Residence</strong> (NARR Standard 8).
        </p>
      </section>

      {/* Main Tab Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('report')}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition ${
                activeTab === 'report'
                  ? 'bg-gradient-to-r from-phoenix-600 to-amber-600 text-white shadow-lg shadow-phoenix-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Impact Dashboard & Report</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('map')}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition ${
                activeTab === 'map'
                  ? 'bg-gradient-to-r from-phoenix-600 to-amber-600 text-white shadow-lg shadow-phoenix-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Street & Prayer Map</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition ${
                activeTab === 'services'
                  ? 'bg-gradient-to-r from-phoenix-600 to-amber-600 text-white shadow-lg shadow-phoenix-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Resident & Community Services</span>
            </button>
          </div>
        </div>
      </section>

      {/* Active Tab View */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'report' && (
          <ImpactReportPublisher
            walks={IMPACT_SEED_WALKS}
            pins={IMPACT_SEED_PINS}
            services={IMPACT_SEED_RESIDENT_SERVICES}
          />
        )}

        {activeTab === 'map' && (
          <StreetPrayerMap
            walks={IMPACT_SEED_WALKS}
            pins={IMPACT_SEED_PINS}
          />
        )}

        {activeTab === 'services' && (
          <ResidentServicesImpact
            services={IMPACT_SEED_RESIDENT_SERVICES}
          />
        )}
      </section>

      {/* Partner with Community Impact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400">
            <HeartHandshake className="w-4 h-4" />
            <span>Multiply Our Community Impact</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Help Us Expand Hope in Ross County & Beyond
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether through prayer walking on the streets, sponsoring a bed scholarship for a resident at Made for More, or providing second-chance employment, your partnership saves lives.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/partner"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-phoenix-600 to-amber-600 hover:from-phoenix-500 hover:to-amber-500 text-white font-bold text-sm shadow-xl transition"
            >
              <span>Partner as a Church or Business</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition"
            >
              <span>Submit Resident Intake</span>
            </Link>

            <a
              href="https://chillicothecommunityresources.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-semibold text-sm transition"
            >
              <span>Chillicothe Community Directory</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
