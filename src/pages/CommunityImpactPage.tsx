import React, { useState, useEffect, useCallback } from 'react';
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
  ArrowRight,
  RefreshCw,
  Radio,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { StreetPrayerMap } from '../components/impact/StreetPrayerMap';
import { ResidentServicesImpact } from '../components/impact/ResidentServicesImpact';
import { ResidenceHouseBreakout } from '../components/impact/ResidenceHouseBreakout';
import { ImpactReportPublisher } from '../components/impact/ImpactReportPublisher';
import { 
  IMPACT_SEED_WALKS, 
  IMPACT_SEED_PINS, 
  IMPACT_SEED_HOUSES,
  IMPACT_SEED_RESIDENT_SERVICES 
} from '../data/communityImpactData';
import { WalkSession, EncounterPin, ResidentServiceRecord, RecoveryResidenceHouse } from '../types/communityImpact';

export const CommunityImpactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'report' | 'map' | 'residences' | 'services'>('report');
  const [walks, setWalks] = useState<WalkSession[]>(IMPACT_SEED_WALKS);
  const [pins, setPins] = useState<EncounterPin[]>(IMPACT_SEED_PINS);
  const [houses, setHouses] = useState<RecoveryResidenceHouse[]>(IMPACT_SEED_HOUSES);
  const [services, setServices] = useState<ResidentServiceRecord[]>(IMPACT_SEED_RESIDENT_SERVICES);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null);

  // Fetch live aggregated data from Netlify Serverless Sync Endpoint
  const fetchLiveImpact = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const res = await fetch('/api/impact-sync');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.walks) && Array.isArray(json.pins) && Array.isArray(json.services)) {
          // Safeguard: Merge with baseline seed data to GUARANTEE zero data loss
          setWalks(() => {
            const m = new Map<string, WalkSession>();
            IMPACT_SEED_WALKS.forEach((w) => m.set(w.id, w));
            json.walks.forEach((w: WalkSession) => {
              if (w?.id) m.set(w.id, w);
            });
            return Array.from(m.values());
          });

          setPins(() => {
            const m = new Map<string, EncounterPin>();
            IMPACT_SEED_PINS.forEach((p) => m.set(p.id, p));
            json.pins.forEach((p: EncounterPin) => {
              if (p?.id) m.set(p.id, p);
            });
            return Array.from(m.values());
          });

          if (Array.isArray(json.houses)) {
            setHouses(() => {
              const m = new Map<string, RecoveryResidenceHouse>();
              IMPACT_SEED_HOUSES.forEach((h) => m.set(h.id, h));
              json.houses.forEach((h: RecoveryResidenceHouse) => {
                if (h?.id) m.set(h.id, h);
              });
              return Array.from(m.values());
            });
          }

          setServices(() => {
            const m = new Map<string, ResidentServiceRecord>();
            IMPACT_SEED_RESIDENT_SERVICES.forEach((s) => m.set(s.id, s));
            json.services.forEach((s: ResidentServiceRecord) => {
              if (s?.id) m.set(s.id, s);
            });
            return Array.from(m.values());
          });

          setIsLiveConnected(true);
          setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch {
      // Retains existing verified records without interruption if offline
    } finally {
      if (isManual) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  }, []);

  // Poll for updates every 45 seconds while page is active
  useEffect(() => {
    fetchLiveImpact();
    const interval = setInterval(() => {
      fetchLiveImpact();
    }, 45000);
    return () => clearInterval(interval);
  }, [fetchLiveImpact]);

  return (
    <div className="space-y-16 py-12">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-phoenix-600/20 to-amber-600/20 border border-phoenix-500/30 text-xs font-semibold text-phoenix-400">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Consolidated Community Impact Dashboard & Report</span>
          </div>

          {/* Live Sync Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLiveConnected ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isLiveConnected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <span>{isLiveConnected ? 'Dynamic Cloud Sync Active' : 'Connecting Cloud Sync...'}</span>
            {lastSyncedTime && <span className="text-[10px] text-slate-400">({lastSyncedTime})</span>}
            <button
              type="button"
              onClick={() => fetchLiveImpact(true)}
              disabled={isRefreshing}
              title="Refresh live data from Hope Dealers & Push For Recovery"
              className="ml-1 p-0.5 text-slate-400 hover:text-white transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Quantifying Faith, Restoration & Community Transformation
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Combining the sidewalk encounters and prayer walks of the <strong>Hope Dealers</strong> outreach with the residential recovery living (NARR Standard 8) and non-resident coaching services of <strong>PUSH for Recovery</strong>.
        </p>
      </section>

      {/* Main 4-Tab Navigation */}
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
              <span>Hope Dealers Outreach & Map</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('residences')}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition ${
                activeTab === 'residences'
                  ? 'bg-gradient-to-r from-phoenix-600 to-amber-600 text-white shadow-lg shadow-phoenix-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Residences (By House)</span>
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
              <span>Non-Resident Services Hub</span>
            </button>
          </div>
        </div>
      </section>

      {/* Active Tab View */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'report' && (
          <ImpactReportPublisher
            walks={walks}
            pins={pins}
            services={services}
            houses={houses}
          />
        )}

        {activeTab === 'map' && (
          <StreetPrayerMap
            walks={walks}
            pins={pins}
          />
        )}

        {activeTab === 'residences' && (
          <ResidenceHouseBreakout
            houses={houses}
            services={services}
          />
        )}

        {activeTab === 'services' && (
          <ResidentServicesImpact
            services={services}
          />
        )}
      </section>

      {/* Partner with Community Impact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 print:hidden">
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
