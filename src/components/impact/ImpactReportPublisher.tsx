import React, { useState, useMemo } from 'react';
import { 
  Printer, 
  Share2, 
  Copy, 
  Check, 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Footprints, 
  HeartHandshake, 
  Trash2, 
  DollarSign, 
  Users, 
  Home, 
  ShieldCheck, 
  Building2,
  ExternalLink
} from 'lucide-react';
import { WalkSession, EncounterPin, ResidentServiceRecord, NEED_CATEGORIES } from '../../types/communityImpact';
import { siteConfig } from '../../config/siteConfig';

interface ImpactReportPublisherProps {
  walks: WalkSession[];
  pins: EncounterPin[];
  services: ResidentServiceRecord[];
}

export const ImpactReportPublisher: React.FC<ImpactReportPublisherProps> = ({
  walks,
  pins,
  services,
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

  // Aggregate Combined Metrics
  const combinedStats = useMemo(() => {
    // Street Outreach
    const streetMiles = filteredWalks.reduce((sum, w) => sum + w.milesWalked, 0);
    const streetVolunteerHours = filteredWalks.reduce((sum, w) => sum + w.volunteerHours, 0);
    const streetInteractions = filteredWalks.reduce((sum, w) => sum + w.interactionsCount, 0);
    const streetPrayers = filteredWalks.reduce((sum, w) => sum + w.prayersCount, 0);
    const streetLinkages = filteredWalks.reduce((sum, w) => sum + w.serviceLinkagesCount, 0);
    const trashWeightLbs = filteredWalks.reduce((sum, w) => sum + w.trashWeightLbs, 0);
    const uniqueStreets = Array.from(new Set(filteredWalks.flatMap((w) => w.streetsWalked)));

    // Residence & Community Services
    const serviceMinutes = filteredServices.reduce((sum, s) => sum + s.durationMinutes, 0);
    const serviceHours = Math.round((serviceMinutes / 60) * 10) / 10;
    const residentCount = filteredServices.filter((s) => s.recipientType === 'resident').length;
    const communityMemberCount = filteredServices.filter((s) => s.recipientType === 'community_member').length;
    const uniquePeopleServed = new Set(filteredServices.map((s) => s.recipientName)).size;
    const milestonesCount = filteredServices.filter((s) => Boolean(s.milestoneAchieved)).length;

    // Combined Totals
    const grandTotalHours = Math.round((streetVolunteerHours + serviceHours) * 10) / 10;
    const totalLivesTouched = streetInteractions + uniquePeopleServed;
    const estimatedEconomicValue = Math.round(grandTotalHours * 31.80);

    return {
      streetMiles: streetMiles.toFixed(1),
      streetVolunteerHours: streetVolunteerHours.toFixed(1),
      streetInteractions,
      streetPrayers,
      streetLinkages,
      trashWeightLbs,
      streetsCount: uniqueStreets.length,
      serviceHours,
      residentCount,
      communityMemberCount,
      uniquePeopleServed,
      milestonesCount,
      grandTotalHours,
      totalLivesTouched,
      estimatedEconomicValue,
    };
  }, [filteredWalks, filteredPins, filteredServices]);

  // Social / Press text generator
  const socialText = useMemo(() => {
    return `🔥 COMMUNITY IMPACT UPDATE: LIFE RECOVERY SOCIETY & MADE FOR MORE 🔥\n\n` +
      `We are grateful to report our ${periodLabel} across Chillicothe & Ross County, Ohio:\n\n` +
      `✨ ${combinedStats.totalLivesTouched} Lives Touched & Supported\n` +
      `🙏 ${combinedStats.streetPrayers} Sidewalk & Home Prayers Offered\n` +
      `🤝 ${combinedStats.streetLinkages + filteredServices.length} Physical Service & Recovery Linkages\n` +
      `⏱️ ${combinedStats.grandTotalHours} Total Volunteer & Service Hours Delivered\n` +
      `💵 $${combinedStats.estimatedEconomicValue.toLocaleString()} in Value Restored to our Community\n` +
      `📍 ${combinedStats.streetMiles} Miles Walked Across ${combinedStats.streetsCount} Chillicothe Corridors\n` +
      `🗑️ ${combinedStats.trashWeightLbs} lbs of Litter Removed & Streets Beautified\n` +
      `🎯 ${combinedStats.milestonesCount} Key Sobriety & Workforce Milestones Achieved\n\n` +
      `Operating Level II sober living at Made for More with separate Men’s & Women’s housing meeting NARR and Ohio Recovery Housing standards.\n\n` +
      `🌐 Learn more: https://liferecoverysociety.org\n` +
      `🤝 Ross County Services Directory: https://chillicothecommunityresources.com`;
  }, [combinedStats, periodLabel]);

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
      {/* Control Bar: Timeframe & Action Buttons */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Period Selector */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-medium text-slate-300">Reporting Window:</span>
          <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setPeriod('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                period === 'all'
                  ? 'bg-phoenix-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All-Time
            </button>
            <button
              type="button"
              onClick={() => setPeriod('30d')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                period === '30d'
                  ? 'bg-phoenix-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Last 30 Days
            </button>
            <button
              type="button"
              onClick={() => setPeriod('7d')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                period === '7d'
                  ? 'bg-phoenix-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
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
            <span>Print Official Report</span>
          </button>
        </div>
      </div>

      {/* Official Printable Report Card */}
      <div id="printable-impact-report" className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <img
              src="/assets/lrs-logo.png"
              alt="Life Recovery Society"
              className="h-16 w-auto object-contain"
            />
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Official Consolidated Report
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Life Recovery Society & Made for More
              </h2>
              <p className="text-xs text-slate-400">
                Community Outreach & Level II Recovery Residence Impact • Chillicothe / Ross County, OH
              </p>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 space-y-1 text-xs">
            <div className="font-bold text-white">{periodLabel}</div>
            <div className="text-slate-400">Generated: {new Date().toLocaleDateString()}</div>
            <div className="text-emerald-400 font-medium">NARR Standard 8 & ORH Level II Aligned</div>
          </div>
        </div>

        {/* 4 Grand Total Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-phoenix-400">Lives Touched</span>
              <Users className="w-4 h-4 text-phoenix-400" />
            </div>
            <div className="text-3xl font-black text-white">{combinedStats.totalLivesTouched}</div>
            <p className="text-[11px] text-slate-400 mt-1">Direct outreach interactions & individuals served</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-amber-400">Volunteer & Service Hours</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-white">{combinedStats.grandTotalHours} hrs</div>
            <p className="text-[11px] text-slate-400 mt-1">Street walking teams + residential life skills coaching</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-emerald-400">Economic Value Restored</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">${combinedStats.estimatedEconomicValue.toLocaleString()}</div>
            <p className="text-[11px] text-slate-400 mt-1">Based on independent sector $31.80/hr valuation</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-blue-400">Prayers & Spiritual Care</span>
              <Sparkles className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-white">{combinedStats.streetPrayers}</div>
            <p className="text-[11px] text-slate-400 mt-1">Offered directly on sidewalks & recovery meetings</p>
          </div>
        </div>

        {/* Detailed Breakdown Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section 1: Street Outreach & Prayer Impact */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Footprints className="w-5 h-5 text-phoenix-500" />
                <h3 className="font-bold text-white text-base">Hope Dealers Street Outreach</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-phoenix-950 text-phoenix-300 border border-phoenix-800">
                Chillicothe Sidewalks
              </span>
            </div>

            <table className="w-full text-xs text-left text-slate-300">
              <tbody className="divide-y divide-slate-800/80">
                <tr>
                  <td className="py-2 text-slate-400">Total Miles Walked on Foot:</td>
                  <td className="py-2 text-right font-bold text-white">{combinedStats.streetMiles} miles</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400">Neighborhood Corridors Covered:</td>
                  <td className="py-2 text-right font-bold text-white">{combinedStats.streetsCount} streets</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400">Sidewalk Encounters & Check-ins:</td>
                  <td className="py-2 text-right font-bold text-white">{combinedStats.streetInteractions} people</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400">Personal Prayers Offered:</td>
                  <td className="py-2 text-right font-bold text-amber-400">{combinedStats.streetPrayers} prayers</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400">Emergency Needs / Sober Living Links:</td>
                  <td className="py-2 text-right font-bold text-emerald-400">{combinedStats.streetLinkages} linkages</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400">Litter Removed & Neighborhood Cleaned:</td>
                  <td className="py-2 text-right font-bold text-blue-400">{combinedStats.trashWeightLbs} lbs trash</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2: Made for More Residence & Recovery Services */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-white text-base">Made for More Recovery Residence</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                Level II NARR Std 8
              </span>
            </div>

            <table className="w-full text-xs text-left text-slate-300">
              <tbody className="divide-y divide-slate-800/80">
                <tr>
                  <td className="py-2 text-slate-400">Dedicated Service Hours Delivered:</td>
                  <td className="py-2 text-right font-bold text-white">{combinedStats.serviceHours} hours</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400">Residents Supported (Men's & Women's):</td>
                  <td className="py-2 text-right font-bold text-white">{combinedStats.residentCount} sessions</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400">Community Outreach Members Supported:</td>
                  <td className="py-2 text-right font-bold text-white">{combinedStats.communityMemberCount} sessions</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400">Unique Individuals Coached:</td>
                  <td className="py-2 text-right font-bold text-amber-400">{combinedStats.uniquePeopleServed} individuals</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400">Workforce & Sobriety Milestones:</td>
                  <td className="py-2 text-right font-bold text-emerald-400">{combinedStats.milestonesCount} milestones</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400">Direct Partner Employer Job Placements:</td>
                  <td className="py-2 text-right font-bold text-phoenix-400">100% Employed or in Training</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Narrative Mission Summary */}
        <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs text-slate-300 leading-relaxed">
          <div className="font-bold text-white text-sm">Biblical Collaborative Model Statement</div>
          <p>
            Life Recovery Society is dedicated to rescuing addicts, reconnecting families, repairing brokenness, and restoring communities. By integrating volunteer street outreach (Hope Dealers) with structured Level II monitored sober living (Made for More), we build a replicable, self-sustaining ecosystem where faith, dignity, and economic empowerment walk hand-in-hand.
          </p>
          <div className="pt-2 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800">
            <span>Website: <strong>liferecoverysociety.org</strong></span>
            <span>Ross County Services: <strong>chillicothecommunityresources.com</strong></span>
            <span>Phone: <strong>{siteConfig.contact.phoneFormatted}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
