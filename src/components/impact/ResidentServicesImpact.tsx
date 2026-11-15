import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  HeartHandshake, 
  Users, 
  Home, 
  DollarSign, 
  Laptop, 
  GraduationCap, 
  Award, 
  Scale, 
  Car, 
  ShoppingBag, 
  Activity,
  CheckCircle2,
  Filter,
  Search,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import { 
  ResidentServiceRecord, 
  RESIDENT_SERVICE_CATEGORIES, 
  ResidentServiceCategory 
} from '../../types/communityImpact';

// Helper icon resolver
function getCategoryIcon(catId: ResidentServiceCategory) {
  switch (catId) {
    case 'counseling_support_group': return <HeartHandshake className="w-5 h-5" />;
    case 'vocational_training': return <Briefcase className="w-5 h-5" />;
    case 'peer_support': return <Users className="w-5 h-5" />;
    case 'housing_navigation': return <Home className="w-5 h-5" />;
    case 'financial_literacy': return <DollarSign className="w-5 h-5" />;
    case 'computer_skills': return <Laptop className="w-5 h-5" />;
    case 'ged_education': return <GraduationCap className="w-5 h-5" />;
    case 'community_service': return <Award className="w-5 h-5" />;
    case 'advocacy_case_mgmt': return <Scale className="w-5 h-5" />;
    case 'transportation': return <Car className="w-5 h-5" />;
    case 'food_essential_needs': return <ShoppingBag className="w-5 h-5" />;
    case 'health_navigation': return <Activity className="w-5 h-5" />;
    default: return <Sparkles className="w-5 h-5" />;
  }
}

interface ResidentServicesImpactProps {
  services: ResidentServiceRecord[];
}

export const ResidentServicesImpact: React.FC<ResidentServicesImpactProps> = ({ services }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRecipientType, setSelectedRecipientType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Independent sector volunteer & service hour valuation (current national benchmark)
  const HOURLY_ECONOMIC_VALUE = 31.80;

  // Filtered Services
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      if (selectedCategory !== 'all' && s.serviceCategory !== selectedCategory) return false;
      if (selectedRecipientType !== 'all' && s.recipientType !== selectedRecipientType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = s.recipientName.toLowerCase().includes(q);
        const matchTitle = s.serviceTitle.toLowerCase().includes(q);
        const matchNotes = (s.notes || '').toLowerCase().includes(q);
        const matchMilestone = (s.milestoneAchieved || '').toLowerCase().includes(q);
        if (!matchName && !matchTitle && !matchNotes && !matchMilestone) return false;
      }
      return true;
    });
  }, [services, selectedCategory, selectedRecipientType, searchQuery]);

  // Aggregated Analytics
  const analytics = useMemo(() => {
    const totalMinutes = services.reduce((acc, s) => acc + s.durationMinutes, 0);
    const totalHours = Math.round((totalMinutes / 60) * 10) / 10;
    const totalEncounters = services.length;
    const uniqueIndividuals = new Set(services.map((s) => s.recipientName)).size;
    const totalEconomicValue = Math.round(totalHours * HOURLY_ECONOMIC_VALUE);

    const residentCount = services.filter((s) => s.recipientType === 'resident').length;
    const communityCount = services.filter((s) => s.recipientType === 'community_member').length;

    const milestonesCount = services.filter((s) => Boolean(s.milestoneAchieved)).length;

    // Category hour sums
    const categoryTotals: Record<string, { count: number; hours: number }> = {};
    services.forEach((s) => {
      if (!categoryTotals[s.serviceCategory]) {
        categoryTotals[s.serviceCategory] = { count: 0, hours: 0 };
      }
      categoryTotals[s.serviceCategory].count += 1;
      categoryTotals[s.serviceCategory].hours += Math.round((s.durationMinutes / 60) * 10) / 10;
    });

    return {
      totalHours,
      totalEncounters,
      uniqueIndividuals,
      totalEconomicValue,
      residentCount,
      communityCount,
      milestonesCount,
      categoryTotals,
    };
  }, [services]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>NARR Standard 8 & Level II Residence Quality</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Resident & Community Services Impact Hub
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Tracking holistic recovery capital and workforce readiness across 12 core domains for Made for More residents and Ross County community members.
            </p>
          </div>

          {/* High-Level KPI Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <div className="text-2xl font-black text-white">{analytics.totalHours}</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Service Hours</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <div className="text-2xl font-black text-amber-400">{analytics.uniqueIndividuals}</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Individuals Served</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <div className="text-2xl font-black text-emerald-400">${analytics.totalEconomicValue.toLocaleString()}</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Economic Value</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <div className="text-2xl font-black text-phoenix-400">{analytics.milestonesCount}</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Key Milestones</div>
            </div>
          </div>
        </div>

        {/* Dual Recipient Breakdown Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-phoenix-600/20 text-phoenix-400 flex items-center justify-center font-bold">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Recovery House Residents</h4>
                <p className="text-xs text-slate-400">Made for More Men's & Women's Wings</p>
              </div>
            </div>
            <span className="text-xl font-extrabold text-phoenix-400">
              {analytics.residentCount} {analytics.residentCount === 1 ? 'record' : 'records'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Community Outreach Members</h4>
                <p className="text-xs text-slate-400">Ross County street outreach & referrals</p>
              </div>
            </div>
            <span className="text-xl font-extrabold text-amber-400">
              {analytics.communityCount} {analytics.communityCount === 1 ? 'record' : 'records'}
            </span>
          </div>
        </div>
      </div>

      {/* 12 Core Domains Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            <span>12 Comprehensive Service Domains</span>
          </h4>
          <span className="text-xs text-slate-400">Aligned with NARR Standard 8</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {RESIDENT_SERVICE_CATEGORIES.map((cat) => {
            const data = analytics.categoryTotals[cat.id] || { count: 0, hours: 0 };
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={`text-left p-4 rounded-2xl border transition-all text-xs space-y-2.5 ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500 ring-2 ring-emerald-500/30'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-md`}>
                    {getCategoryIcon(cat.id)}
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800">
                    {data.hours} hrs
                  </span>
                </div>
                <div>
                  <div className="font-bold text-white text-sm line-clamp-1">{cat.label}</div>
                  <div className="text-[11px] text-slate-400">{data.count} sessions delivered</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Service Records Feed & Filter */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h4 className="text-lg font-bold text-white">Service Encounter Log</h4>
            <p className="text-xs text-slate-400">Detailed records of coaching, job placement, and recovery milestones.</p>
          </div>

          {/* Search & Recipient Type Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipient, title, milestone..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <select
              value={selectedRecipientType}
              onChange={(e) => setSelectedRecipientType(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Recipients</option>
              <option value="resident">Residents Only</option>
              <option value="community_member">Community Members</option>
            </select>

            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold"
              >
                Clear Category Filter ✕
              </button>
            )}
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-3">
          {filteredServices.map((record) => {
            const cat = RESIDENT_SERVICE_CATEGORIES.find((c) => c.id === record.serviceCategory);

            return (
              <div
                key={record.id}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-emerald-400">
                    {getCategoryIcon(record.serviceCategory)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white text-sm">{record.serviceTitle}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        record.recipientType === 'resident'
                          ? 'bg-phoenix-600/20 text-phoenix-300 border border-phoenix-500/30'
                          : 'bg-amber-600/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {record.recipientType === 'resident' ? 'Resident' : 'Community Member'}
                      </span>
                      <span className="text-slate-400 text-[11px]">• {record.serviceDate}</span>
                    </div>

                    <div className="text-slate-300">
                      <strong>Recipient:</strong> {record.recipientName} ({record.houseName}) • <strong>Provider:</strong> {record.providerName} ({record.durationMinutes} min)
                    </div>

                    {record.milestoneAchieved && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Milestone: {record.milestoneAchieved}</span>
                      </div>
                    )}

                    {record.notes && (
                      <p className="text-slate-400 text-[11px] italic pt-0.5">
                        "{record.notes}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-right space-y-1">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800 font-medium">
                    {record.fundingSource || 'Program Supported'}
                  </span>
                  <div className="text-[10px] text-slate-500">{record.location}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
