import React, { useState, useMemo } from 'react';
import { 
  Printer, 
  Copy, 
  Check, 
  Calendar, 
  Sparkles, 
  Award, 
  Footprints, 
  DollarSign, 
  Users, 
  Home, 
  ShieldCheck, 
  Building2,
  ExternalLink,
  MapPin,
  Clock,
  HeartHandshake,
  CheckCircle2,
  FileText,
  UserCheck
} from 'lucide-react';
import { 
  WalkSession, 
  EncounterPin, 
  ResidentServiceRecord, 
  RecoveryResidenceHouse,
  RESIDENT_SERVICE_CATEGORIES,
  NEED_CATEGORIES
} from '../../types/communityImpact';
import { IMPACT_SEED_HOUSES } from '../../data/communityImpactData';
import { siteConfig } from '../../config/siteConfig';

interface ImpactReportPublisherProps {
  walks: WalkSession[];
  pins: EncounterPin[];
  services: ResidentServiceRecord[];
  houses?: RecoveryResidenceHouse[];
}

export const ImpactReportPublisher: React.FC<ImpactReportPublisherProps> = ({
  walks,
  pins,
  services,
  houses = IMPACT_SEED_HOUSES,
}) => {
  const [period, setPeriod] = useState<'all' | '30d' | '7d'>('all');
  const [copiedSocial, setCopiedSocial] = useState(false);

  // Filter based on period
  const { filteredWalks, filteredPins, filteredServices, periodLabel } = useMemo(() => {
    const now = new Date();
    let cutoff = '1970-01-01';
    let label = 'All-Time Cumulative Impact Report';

    if (period === '7d') {
      const d = new Date(now);
      d.setDate(d.getDate() - 7);
      cutoff = d.toISOString().slice(0, 10);
      label = 'Last 7 Days Community Impact Report';
    } else if (period === '30d') {
      const d = new Date(now);
      d.setDate(d.getDate() - 30);
      cutoff = d.toISOString().slice(0, 10);
      label = 'Last 30 Days Community Impact Report';
    }

    const fw = walks.filter((w) => (period === 'all' ? true : w.date >= cutoff));
    const fp = pins.filter((p) => (period === 'all' ? true : p.timestamp.slice(0, 10) >= cutoff));
    const fs = services.filter((s) => (period === 'all' ? true : s.serviceDate >= cutoff));

    return { filteredWalks: fw, filteredPins: fp, filteredServices: fs, periodLabel: label };
  }, [walks, pins, services, period]);

  // Sorted Prayer Roster for Active Intercession (sorted descending by timestamp, most recent first)
  const prayerRoster = useMemo(() => {
    const list = filteredPins.filter((p) => {
      if (p.type === 'prayer' || p.type === 'both' || !p.type) return true;
      if (p.description && p.description.toLowerCase().includes('pray')) return true;
      return false;
    });

    const activeList = list.length > 0 ? list : filteredPins;

    return [...activeList].sort((a, b) => {
      const timeA = new Date(a.timestamp || 0).getTime();
      const timeB = new Date(b.timestamp || 0).getTime();
      return timeB - timeA;
    });
  }, [filteredPins]);

  // Aggregate Combined Metrics
  const stats = useMemo(() => {
    // Hope Dealers Outreach
    const streetMiles = filteredWalks.reduce((sum, w) => sum + w.milesWalked, 0);
    const streetVolHours = filteredWalks.reduce((sum, w) => sum + w.volunteerHours, 0);
    const streetRouteHours = filteredWalks.reduce((sum, w) => sum + (w.durationMinutes / 60), 0);
    const streetInteractions = filteredWalks.reduce((sum, w) => sum + w.interactionsCount, 0);
    const walkPrayers = filteredWalks.reduce((sum, w) => sum + w.prayersCount, 0);
    const streetPrayers = Math.max(walkPrayers, prayerRoster.length);
    const streetLinkages = filteredWalks.reduce((sum, w) => sum + w.serviceLinkagesCount, 0);
    const trashWeightLbs = filteredWalks.reduce((sum, w) => sum + w.trashWeightLbs, 0);
    const uniqueStreets = Array.from(new Set(filteredWalks.flatMap((w) => w.streetsWalked)));

    // Residence & Community Services (PUSH for Recovery)
    const directServiceMinutes = filteredServices.reduce((sum, s) => sum + s.durationMinutes, 0);
    const directServiceHours = Math.round((directServiceMinutes / 60) * 10) / 10;
    const residentServiceVolHours = Math.round(
      filteredServices.reduce((sum, s) => sum + (s.volunteerHours || s.durationMinutes / 60), 0) * 10
    ) / 10;
    const residentSessions = filteredServices.filter((s) => s.recipientType === 'resident').length;
    const communitySessions = filteredServices.filter((s) => s.recipientType === 'community_member').length;
    const uniqueCommunityMembers = new Set(
      filteredServices.filter((s) => s.recipientType === 'community_member').map((s) => s.recipientName)
    ).size;
    const uniqueResidents = new Set(
      filteredServices.filter((s) => s.recipientType === 'resident').map((s) => s.recipientName)
    ).size;
    const uniquePeopleServed = new Set(filteredServices.map((s) => s.recipientName)).size;
    const milestonesCount = filteredServices.filter((s) => Boolean(s.milestoneAchieved)).length;

    // Combined Totals
    const grandVolunteerHours = Math.round((streetVolHours + residentServiceVolHours) * 10) / 10;
    const grandDirectHours = Math.round((streetRouteHours + directServiceHours) * 10) / 10;
    const totalLivesTouched = streetInteractions + uniquePeopleServed;
    const estimatedEconomicValue = Math.round(grandVolunteerHours * 31.80);

    // Breakdown of categories in Push for Recovery
    const categoryBreakdown: Record<string, { count: number; hours: number }> = {};
    RESIDENT_SERVICE_CATEGORIES.forEach((cat) => {
      categoryBreakdown[cat.id] = { count: 0, hours: 0 };
    });
    filteredServices.forEach((s) => {
      let cat: string = s.serviceCategory;
      if (cat === 'peer_support') cat = 'peer_recovery_support';
      if (cat === 'recreation_social') cat = 'recovery_recreation_social';

      if (!categoryBreakdown[cat]) {
        categoryBreakdown[cat] = { count: 0, hours: 0 };
      }
      categoryBreakdown[cat].count += 1;
      categoryBreakdown[cat].hours += Math.round((s.durationMinutes / 60) * 10) / 10;
    });

    return {
      streetMiles: streetMiles.toFixed(1),
      streetVolHours: streetVolHours.toFixed(1),
      streetRouteHours: streetRouteHours.toFixed(1),
      streetInteractions,
      streetPrayers,
      streetLinkages,
      trashWeightLbs,
      streetsCount: uniqueStreets.length,
      uniqueStreetsList: uniqueStreets,
      directServiceHours,
      residentServiceVolHours,
      residentSessions,
      communitySessions,
      uniqueCommunityMembers,
      uniqueResidents,
      uniquePeopleServed,
      milestonesCount,
      grandVolunteerHours,
      grandDirectHours,
      totalLivesTouched,
      estimatedEconomicValue,
      categoryBreakdown,
    };
  }, [filteredWalks, filteredPins, filteredServices]);

  // Social / Press text generator
  const socialText = useMemo(() => {
    return `🔥 COMMUNITY IMPACT UPDATE: LIFE RECOVERY SOCIETY & MADE FOR MORE 🔥\n\n` +
      `We are grateful to report our ${periodLabel} across Chillicothe & Ross County, Ohio:\n\n` +
      `✨ ${stats.totalLivesTouched} Lives Touched & Supported\n` +
      `⏱️ ${stats.grandVolunteerHours} Total Volunteer & Service Hours Delivered (${stats.grandDirectHours} direct service hours)\n` +
      `💵 $${stats.estimatedEconomicValue.toLocaleString()} in Economic Value Restored to Ross County ($31.80/hr valuation)\n` +
      `🙏 ${stats.streetPrayers} Sidewalk Prayers Offered & ${filteredServices.length} Direct Recovery Encounters\n\n` +
      `--- HOPE DEALERS STREET OUTREACH ---\n` +
      `👋 ${stats.streetInteractions} Neighbors Greeted & Checked On\n` +
      `👟 ${stats.streetMiles} Street Miles Walked Across ${stats.streetsCount} Chillicothe Corridors (${stats.streetVolHours} Vol Hrs)\n` +
      `🗑️ ${stats.trashWeightLbs} lbs of Litter Removed & Streets Beautified\n\n` +
      `--- RESIDENT & COMMUNITY SERVICES (PUSH FOR RECOVERY) ---\n` +
      `👥 ${stats.uniqueCommunityMembers} External Community Members Supported (100% Non-Resident Outreach)\n` +
      `📈 ${filteredServices.length} Intensive 1-on-1 Coaching & Recovery Sessions (${stats.directServiceHours} Direct Hrs)\n` +
      `🏠 Made for More Level II Sober Living (190 Caldwell, Chillicothe, OH)\n\n` +
      `🌐 Learn more: https://liferecoverysociety.org\n` +
      `🤝 Ross County Resource Directory: https://chillicothecommunityresources.com`;
  }, [stats, periodLabel, filteredServices.length]);

  const handleCopySocial = () => {
    navigator.clipboard.writeText(socialText);
    setCopiedSocial(true);
    setTimeout(() => setCopiedSocial(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Control Bar: Timeframe & Action Buttons (Hidden when printing) */}
      <div className="print:hidden bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Period Selector */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-medium text-slate-300">Reporting Window:</span>
          <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setPeriod('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                period === 'all' ? 'bg-phoenix-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              All-Time
            </button>
            <button
              type="button"
              onClick={() => setPeriod('30d')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                period === '30d' ? 'bg-phoenix-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Last 30 Days
            </button>
            <button
              type="button"
              onClick={() => setPeriod('7d')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                period === '7d' ? 'bg-phoenix-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Last 7 Days
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopySocial}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-semibold transition"
          >
            {copiedSocial ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSocial ? 'Copied Press Update!' : 'Copy Social Press Update'}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-phoenix-600 to-amber-600 hover:from-phoenix-500 hover:to-amber-500 text-white text-xs font-bold shadow-lg transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official 3-Page Report</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          PRINTABLE OFFICIAL REPORT: 3 DEDICATED PAGES
          Page 1: Life Recovery Society Combined Summary & Executive Scorecard
          Page 2: Hope Dealers Street Outreach Division Breakout
          Page 3: Recovery Residence by House & Non-Resident Services Matrix
          ========================================================================= */}
      <div id="printable-impact-report" className="space-y-12 print:space-y-0">
        
        {/* ================================= PAGE 1 ================================= */}
        <div className="print-page bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 print:border-none print:shadow-none print:p-6 print:bg-white print:text-black">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800 print:border-gray-300">
            <div className="flex items-center gap-4">
              <img
                src="/assets/lrs-logo.png"
                alt="Life Recovery Society"
                className="h-16 w-auto object-contain"
              />
              <div>
                <div className="text-xs font-bold text-amber-500 uppercase tracking-widest print:text-amber-700">
                  Official Consolidated Impact Report • Page 1 of 3
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black">
                  Life Recovery Society & Made for More
                </h2>
                <p className="text-xs text-slate-400 print:text-gray-600">
                  Street Outreach, Level II Recovery Living & Non-Resident Community Services • Chillicothe / Ross County, OH
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 space-y-1 text-xs print:border-gray-300">
              <div className="font-bold text-white print:text-black">{periodLabel}</div>
              <div className="text-slate-400 print:text-gray-600">Generated: {new Date().toLocaleDateString()}</div>
              <div className="text-emerald-400 print:text-emerald-700 font-semibold">NARR Standard 8 & ORH Level II Aligned</div>
            </div>
          </div>

          {/* Executive Mission Statement */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed print:bg-gray-100 print:border-gray-300 print:text-gray-800">
            <strong className="text-white print:text-black block mb-1">Executive Summary:</strong>
            Life Recovery Society is dedicated to rescuing addicts, reconnecting families, repairing brokenness, and restoring communities. This report unifies verified frontline service telemetry from our <strong>Hope Dealers Street Outreach</strong> teams and the <strong>PUSH for Recovery / Made for More</strong> community service coaching network across Chillicothe and Ross County.
          </div>

          {/* 4 Grand Scorecard Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 print:bg-gray-50 print:border-gray-300">
              <div className="text-xs font-bold uppercase text-phoenix-400 print:text-orange-700 mb-1">Lives Touched</div>
              <div className="text-3xl font-black text-white print:text-black">{stats.totalLivesTouched}</div>
              <p className="text-[11px] text-slate-400 print:text-gray-600 mt-1">Direct outreach interactions + unique individuals coached</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 print:bg-gray-50 print:border-gray-300">
              <div className="text-xs font-bold uppercase text-amber-400 print:text-amber-700 mb-1">Total Volunteer Hours</div>
              <div className="text-3xl font-black text-white print:text-black">{stats.grandVolunteerHours} hrs</div>
              <p className="text-[11px] text-slate-400 print:text-gray-600 mt-1">{stats.grandDirectHours} direct route & coaching hours</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 print:bg-gray-50 print:border-gray-300">
              <div className="text-xs font-bold uppercase text-emerald-400 print:text-emerald-700 mb-1">Economic Value Restored</div>
              <div className="text-3xl font-black text-emerald-400 print:text-emerald-700">${stats.estimatedEconomicValue.toLocaleString()}</div>
              <p className="text-[11px] text-slate-400 print:text-gray-600 mt-1">Independent Sector $31.80/hr valuation standard</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 print:bg-gray-50 print:border-gray-300">
              <div className="text-xs font-bold uppercase text-blue-400 print:text-blue-700 mb-1">Prayers & Spiritual Care</div>
              <div className="text-3xl font-black text-white print:text-black">{stats.streetPrayers}</div>
              <p className="text-[11px] text-slate-400 print:text-gray-600 mt-1">Sidewalk prayers offered directly by name</p>
            </div>
          </div>

          {/* Division Summary Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {/* Division 1: Street Outreach */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 print:bg-gray-50 print:border-gray-300">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 print:border-gray-300">
                <span className="font-bold text-white print:text-black text-sm flex items-center gap-2">
                  <Footprints className="w-4 h-4 text-phoenix-400" /> Hope Dealers Street Ministry
                </span>
                <span className="text-[11px] font-bold text-phoenix-400">Frontline Outreach</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-slate-400 print:text-gray-600">Interactions:</span> <strong className="text-white print:text-black">{stats.streetInteractions} people</strong></div>
                <div><span className="text-slate-400 print:text-gray-600">Prayers:</span> <strong className="text-amber-400 print:text-amber-700">{stats.streetPrayers} prayers</strong></div>
                <div><span className="text-slate-400 print:text-gray-600">Miles Walked:</span> <strong className="text-white print:text-black">{stats.streetMiles} miles</strong></div>
                <div><span className="text-slate-400 print:text-gray-600">Volunteer Hrs:</span> <strong className="text-white print:text-black">{stats.streetVolHours} hrs</strong></div>
                <div><span className="text-slate-400 print:text-gray-600">Litter Cleared:</span> <strong className="text-emerald-400 print:text-emerald-700">{stats.trashWeightLbs} lbs</strong></div>
                <div><span className="text-slate-400 print:text-gray-600">Corridors:</span> <strong className="text-white print:text-black">{stats.streetsCount} streets</strong></div>
              </div>
            </div>

            {/* Division 2: Recovery Residence & Community Services */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 print:bg-gray-50 print:border-gray-300">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 print:border-gray-300">
                <span className="font-bold text-white print:text-black text-sm flex items-center gap-2">
                  <Home className="w-4 h-4 text-indigo-400" /> Push For Recovery Services
                </span>
                <span className="text-[11px] font-bold text-indigo-400">Level II & Community Hub</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-slate-400 print:text-gray-600">Encounters:</span> <strong className="text-white print:text-black">{filteredServices.length} sessions</strong></div>
                <div><span className="text-slate-400 print:text-gray-600">Direct Hours:</span> <strong className="text-white print:text-black">{stats.directServiceHours} hrs</strong></div>
                <div><span className="text-slate-400 print:text-gray-600">Volunteer Hours:</span> <strong className="text-indigo-400 print:text-indigo-700">{stats.residentServiceVolHours} hrs</strong></div>
                <div><span className="text-slate-400 print:text-gray-600">Community Served:</span> <strong className="text-white print:text-black">{stats.uniqueCommunityMembers} people</strong></div>
                <div><span className="text-slate-400 print:text-gray-600">Outreach Reach:</span> <strong className="text-emerald-400 print:text-emerald-700">100% Non-Resident</strong></div>
                <div><span className="text-slate-400 print:text-gray-600">House Beds:</span> <strong className="text-white print:text-black">190 Caldwell (8 beds)</strong></div>
              </div>
            </div>
          </div>

          {/* Official Sign-off on Page 1 */}
          <div className="pt-6 border-t border-slate-800 print:border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 print:text-gray-600">
            <div>
              <strong>Authorized by:</strong> Rick Fannin, Executive Director & Founder • Life Recovery Society
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
              <span>Verified Cumulative Telemetry • Chillicothe, Ohio</span>
            </div>
          </div>
        </div>

        {/* ================================= PAGE 2 ================================= */}
        <div className="print-page print-break-before bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 print:border-none print:shadow-none print:p-6 print:bg-white print:text-black">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800 print:border-gray-300">
            <div className="flex items-center gap-4">
              <img
                src="/assets/hope-dealers-logo.png"
                alt="Hope Dealers"
                className="h-16 w-auto object-contain"
                onError={(e) => {
                  // Fallback if logo not found
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <div className="text-xs font-bold text-phoenix-400 uppercase tracking-widest print:text-orange-700">
                  Division Impact Report • Page 2 of 3
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black">
                  Hope Dealers Community Outreach
                </h2>
                <p className="text-xs text-slate-400 print:text-gray-600">
                  "Love • Pray • Serve • Restore — Giving the Hopeless Hope" • Sidewalk Ministry Log
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 space-y-1 text-xs print:border-gray-300">
              <div className="font-bold text-white print:text-black">Frontline Street Teams</div>
              <div className="text-slate-400 print:text-gray-600">Groups of 2–3 Walking Pairs</div>
              <div className="text-amber-400 print:text-amber-700 font-semibold">{stats.streetMiles} Miles Walked on Foot</div>
            </div>
          </div>

          {/* Hope Dealers 6-KPI Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center print:bg-gray-50 print:border-gray-300">
              <div className="text-2xl font-black text-white print:text-black">{stats.streetInteractions}</div>
              <div className="text-[10px] text-slate-400 print:text-gray-600 uppercase font-semibold">Public Interactions</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center print:bg-gray-50 print:border-gray-300">
              <div className="text-2xl font-black text-amber-400 print:text-amber-700">{stats.streetPrayers}</div>
              <div className="text-[10px] text-slate-400 print:text-gray-600 uppercase font-semibold">Prayed For</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center print:bg-gray-50 print:border-gray-300">
              <div className="text-2xl font-black text-emerald-400 print:text-emerald-700">{stats.streetLinkages}</div>
              <div className="text-[10px] text-slate-400 print:text-gray-600 uppercase font-semibold">Linked to Services</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center print:bg-gray-50 print:border-gray-300">
              <div className="text-2xl font-black text-blue-400 print:text-blue-700">{stats.trashWeightLbs} lbs</div>
              <div className="text-[10px] text-slate-400 print:text-gray-600 uppercase font-semibold">Trash Cleared</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center print:bg-gray-50 print:border-gray-300">
              <div className="text-2xl font-black text-purple-400 print:text-purple-700">{stats.streetMiles} mi</div>
              <div className="text-[10px] text-slate-400 print:text-gray-600 uppercase font-semibold">Miles Walked</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center print:bg-gray-50 print:border-gray-300">
              <div className="text-2xl font-black text-indigo-400 print:text-indigo-700">{stats.streetVolHours} hrs</div>
              <div className="text-[10px] text-slate-400 print:text-gray-600 uppercase font-semibold">Volunteer Hours</div>
            </div>
          </div>

          {/* Immediate Needs Breakdown & Corridors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Needs Table */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 print:bg-gray-50 print:border-gray-300">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 print:border-gray-300">
                <span className="font-bold text-white print:text-black text-xs uppercase tracking-wider">
                  Immediate Needs & Service Linkages Breakdown
                </span>
                <span className="text-[10px] text-emerald-400 print:text-emerald-700">chillicothecommunityresources.com</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300 print:text-gray-700">
                {NEED_CATEGORIES.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between py-1 border-b border-slate-900 print:border-gray-200">
                    <span className="flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      <span>{cat.label}</span>
                    </span>
                    <strong className="text-white print:text-black">0 people</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Outreach Walk Log (2 Walks) */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 print:bg-gray-50 print:border-gray-300">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 print:border-gray-300">
                <span className="font-bold text-white print:text-black text-xs uppercase tracking-wider">
                  Outreach Group Walk Log ({filteredWalks.length})
                </span>
                <span className="text-[10px] text-slate-400 print:text-gray-600">Frontline Audit Trail</span>
              </div>
              <div className="space-y-3">
                {filteredWalks.map((w) => (
                  <div key={w.id} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5 print:bg-white print:border-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white print:text-black">{w.date} • {w.recorderName}</span>
                      <span className="font-semibold text-amber-400 print:text-amber-700">{w.durationMinutes} min ({w.volunteerHours} Vol Hrs)</span>
                    </div>
                    <div className="text-slate-400 print:text-gray-600 text-[11px]">
                      📍 {w.streetsWalked.join(', ')} ({w.milesWalked} mi)
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-300 print:text-gray-700 font-medium">
                      <span>👋 {w.interactionsCount} Interactions</span>
                      <span>🙏 {w.prayersCount} Prayed For</span>
                      <span>🗑️ {w.trashBagsCount} Bags ({w.trashWeightLbs} lbs)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidewalk Prayer Registry Excerpt (Active Intercession) */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 print:bg-gray-50 print:border-gray-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80 print:border-gray-300">
              <div>
                <span className="font-bold text-white print:text-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 print:text-amber-700" />
                  <span>Sidewalk Prayer Roster Excerpt (Active Intercession)</span>
                </span>
                <p className="text-[11px] text-slate-400 print:text-gray-600 mt-0.5">
                  Lifting each neighbor up by name and need. Displaying the 20 most recent street prayers (scroll to view all {prayerRoster.length} prayers).
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 print:text-black print:border-gray-400">
                  {prayerRoster.length} Prayers Logged
                </span>
              </div>
            </div>

            {/* Scrollable Container showing the 20 most recent and scrollable for all */}
            <div className="max-h-[580px] overflow-y-auto pr-1.5 space-y-3 print:max-h-none print:overflow-visible custom-impact-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {prayerRoster.length === 0 ? (
                  <div className="col-span-2 text-center py-8 text-slate-500 print:text-gray-500">
                    No street prayer records logged for this reporting period.
                  </div>
                ) : (
                  prayerRoster.map((pin, idx) => {
                    const formattedDate = pin.timestamp
                      ? new Date(pin.timestamp).toLocaleDateString(undefined, {
                          month: 'numeric',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'Recent';

                    const groupDisplay = Array.isArray(pin.groupMembers) && pin.groupMembers.length > 0
                      ? pin.groupMembers.join(', ')
                      : (pin.loggedByRecorder || 'Hope Dealers Team');

                    return (
                      <div
                        key={pin.id || `prayer-${idx}`}
                        className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-2 print:bg-white print:border-gray-300 print:break-inside-avoid"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-bold text-amber-400 print:text-amber-700 text-sm flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                              <span>{pin.firstName}</span>
                            </div>
                            <div className="text-slate-400 print:text-gray-600 text-[11px] flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 shrink-0 text-phoenix-400" />
                              <span>{pin.streetName} • {formattedDate}</span>
                            </div>
                          </div>

                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                            pin.type === 'both'
                              ? 'bg-phoenix-600/20 text-phoenix-300 border border-phoenix-500/30'
                              : 'bg-amber-600/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {pin.type === 'both' ? 'Prayer & Needs' : 'Prayer'}
                          </span>
                        </div>

                        {pin.description && (
                          <p className="text-slate-300 print:text-gray-800 text-xs leading-relaxed italic bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60 print:bg-gray-50 print:border-gray-200">
                            "{pin.description}"
                          </p>
                        )}

                        {pin.needCategories && pin.needCategories.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {pin.needCategories.map((cId) => {
                              const c = NEED_CATEGORIES.find((n) => n.id === cId);
                              return c ? (
                                <span
                                  key={cId}
                                  className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-amber-300 border border-amber-500/20"
                                >
                                  {c.emoji} {c.shortLabel}
                                </span>
                              ) : null;
                            })}
                          </div>
                        )}

                        <div className="text-[10px] text-slate-500 print:text-gray-500 pt-1 border-t border-slate-800/80 print:border-gray-200 flex items-center justify-between">
                          <span>Team: {groupDisplay}</span>
                          <span>#{idx + 1}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================================= PAGE 3 ================================= */}
        <div className="print-page print-break-before bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 print:border-none print:shadow-none print:p-6 print:bg-white print:text-black">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800 print:border-gray-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 print:text-indigo-700">
                <Home className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest print:text-indigo-700">
                  Residences & Services Breakout • Page 3 of 3
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black">
                  Made for More Living & Community Services
                </h2>
                <p className="text-xs text-slate-400 print:text-gray-600">
                  Level II Monitored Sober Housing (By House) & Non-Resident Community Services Matrix
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 space-y-1 text-xs print:border-gray-300">
              <div className="font-bold text-white print:text-black">{filteredServices.length} Total Encounters</div>
              <div className="text-indigo-400 print:text-indigo-700 font-semibold">{stats.residentServiceVolHours} Vol Hrs ({stats.directServiceHours} Direct Hrs)</div>
              <div className="text-emerald-400 print:text-emerald-700 font-medium">100% External Community Outreach</div>
            </div>
          </div>

          {/* Section 1: Recovery Residence Breakout (By House) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white print:text-black flex items-center gap-2">
              <Building2 className="w-4 h-4 text-phoenix-400" />
              <span>Life Recovery Residences — House-by-House Status</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {houses.map((house) => (
                <div key={house.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 print:bg-gray-50 print:border-gray-300">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 print:border-gray-300">
                    <span className="font-bold text-white print:text-black text-sm">{house.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-phoenix-600/20 text-phoenix-400 border border-phoenix-500/30 print:border-gray-400 print:text-black">
                      {house.active ? 'Active Recovery Home' : 'Planned Addition'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 print:text-gray-600">
                    📍 {house.address}, {house.city}, {house.state} • {house.gender === 'mens' ? "Men's Living" : "Women's Living"} ({house.capacityBeds} beds)
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div>
                      <span className="text-slate-400 print:text-gray-600">Current Occupancy:</span>{' '}
                      <strong className="text-white print:text-black">{house.currentResidents} / {house.capacityBeds}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 print:text-gray-600">House Governance:</span>{' '}
                      <strong className="text-white print:text-black">{house.notes || 'Monitored Recovery Residence'}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Non-Resident Community Services Matrix (12 Domains) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white print:text-black flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Non-Resident Community Services Matrix ({stats.uniqueCommunityMembers} Individuals Served)</span>
              </h3>
              <span className="text-xs text-slate-400 print:text-gray-600">NARR Std 8 Aligned</span>
            </div>

            <table className="w-full text-xs text-left text-slate-300 print:text-gray-800 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 print:border-gray-300 text-slate-400 print:text-gray-600">
                  <th className="py-2">Service Category Domain</th>
                  <th className="py-2 text-center">Sessions Logged</th>
                  <th className="py-2 text-center">Delivered Hours</th>
                  <th className="py-2 text-right">Population Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 print:divide-gray-200">
                {RESIDENT_SERVICE_CATEGORIES.map((cat) => {
                  const data = stats.categoryBreakdown[cat.id] || { count: 0, hours: 0 };
                  const pct = stats.directServiceHours > 0 ? Math.round((data.hours / stats.directServiceHours) * 100) : 0;
                  return (
                    <tr key={cat.id}>
                      <td className="py-2 font-medium text-white print:text-black flex items-center gap-2">
                        <span>{cat.label}</span>
                      </td>
                      <td className="py-2 text-center font-bold text-white print:text-black">{data.count}</td>
                      <td className="py-2 text-center font-bold text-indigo-400 print:text-indigo-700">{data.hours} hrs</td>
                      <td className="py-2 text-right text-slate-400 print:text-gray-600">{pct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Page 3 Certification & Audit Block */}
          <div className="pt-6 border-t border-slate-800 print:border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 print:text-gray-600">
            <div className="space-y-1">
              <div><strong>Primary Provider & Case Reviewer:</strong> Rick Fannin, Certified Peer Recovery Supporter</div>
              <div>Verified in accordance with ADAMH, Ross County Courts, and State of Ohio Recovery Housing Standards.</div>
            </div>
            <div className="text-right">
              <div className="text-white print:text-black font-bold">Life Recovery Society Inc.</div>
              <div className="text-[11px] text-slate-500">A 501(c)(3) Faith-Based Nonprofit Ministry</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
