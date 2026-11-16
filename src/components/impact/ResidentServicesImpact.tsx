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
  Search,
  Sparkles,
  ShieldCheck,
  Clock,
  UserCheck,
  TrendingUp,
  FileCheck2,
  Calendar,
  Building2,
  HeartHandshake as HeartHandshakeIcon,
  Smile,
  Zap
} from 'lucide-react';
import { 
  ResidentServiceRecord, 
  RESIDENT_SERVICE_CATEGORIES, 
  ResidentServiceCategory 
} from '../../types/communityImpact';

// Helper icon resolver
function getCategoryIcon(catId: ResidentServiceCategory | string) {
  switch (catId) {
    case 'counseling_support_group': return <HeartHandshake className="w-4 h-4 text-purple-400" />;
    case 'peer_support':
    case 'peer_recovery_support': return <Users className="w-4 h-4 text-blue-400" />;
    case 'recreation_social':
    case 'recovery_recreation_social': return <Smile className="w-4 h-4 text-pink-400" />;
    case 'computer_skills': return <Laptop className="w-4 h-4 text-cyan-400" />;
    case 'vocational_training': return <Briefcase className="w-4 h-4 text-amber-400" />;
    case 'ged_education': return <GraduationCap className="w-4 h-4 text-indigo-400" />;
    case 'community_service': return <Award className="w-4 h-4 text-yellow-400" />;
    case 'advocacy_case_mgmt': return <Scale className="w-4 h-4 text-orange-400" />;
    case 'transportation': return <Car className="w-4 h-4 text-red-400" />;
    case 'food_essential_needs': return <ShoppingBag className="w-4 h-4 text-rose-400" />;
    case 'housing_navigation': return <Home className="w-4 h-4 text-emerald-400" />;
    case 'financial_literacy': return <DollarSign className="w-4 h-4 text-teal-400" />;
    case 'health_navigation': return <Activity className="w-4 h-4 text-green-400" />;
    default: return <Sparkles className="w-4 h-4 text-amber-400" />;
  }
}

interface ResidentServicesImpactProps {
  services: ResidentServiceRecord[];
}

export const ResidentServicesImpact: React.FC<ResidentServicesImpactProps> = ({ services }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRecipientType, setSelectedRecipientType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Independent sector volunteer & service hour valuation ($31.80/hr benchmark)
  const HOURLY_ECONOMIC_VALUE = 31.80;

  // Filtered Services
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      if (selectedCategory !== 'all') {
        const sCat = s.serviceCategory as string;
        const normalizedCat = sCat === 'peer_support' ? 'peer_recovery_support' :
                              sCat === 'recreation_social' ? 'recovery_recreation_social' :
                              sCat;
        if (normalizedCat !== selectedCategory) return false;
      }
      if (selectedRecipientType !== 'all' && s.recipientType !== selectedRecipientType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = s.recipientName.toLowerCase().includes(q);
        const matchTitle = s.serviceTitle.toLowerCase().includes(q);
        const matchNotes = (s.notes || '').toLowerCase().includes(q);
        const matchMilestone = (s.milestoneAchieved || '').toLowerCase().includes(q);
        const matchProvider = (s.providerName || '').toLowerCase().includes(q);
        if (!matchName && !matchTitle && !matchNotes && !matchMilestone && !matchProvider) return false;
      }
      return true;
    });
  }, [services, selectedCategory, selectedRecipientType, searchQuery]);

  // Aggregated Analytics
  const analytics = useMemo(() => {
    const totalMinutes = services.reduce((acc, s) => acc + s.durationMinutes, 0);
    const directHours = Math.round((totalMinutes / 60) * 10) / 10;
    
    // Sum volunteer hours if present, otherwise direct hours
    const totalVolHours = Math.round(
      services.reduce((acc, s) => acc + (s.volunteerHours || s.durationMinutes / 60), 0) * 10
    ) / 10;

    const totalEncounters = services.length;
    const uniqueIndividuals = new Set(services.map((s) => s.recipientName)).size;
    const totalEconomicValue = Math.round(totalVolHours * HOURLY_ECONOMIC_VALUE);

    const residentServices = services.filter((s) => s.recipientType === 'resident');
    const communityServices = services.filter((s) => s.recipientType === 'community_member');

    const residentHours = Math.round(
      residentServices.reduce((acc, s) => acc + s.durationMinutes, 0) / 60 * 10
    ) / 10;
    const communityHours = Math.round(
      communityServices.reduce((acc, s) => acc + s.durationMinutes, 0) / 60 * 10
    ) / 10;

    const residentUnique = new Set(residentServices.map((s) => s.recipientName)).size;
    const communityUnique = new Set(communityServices.map((s) => s.recipientName)).size;

    const residentHoursPct = directHours > 0 ? Math.round((residentHours / directHours) * 100) : 0;
    const communityHoursPct = directHours > 0 ? Math.round((communityHours / directHours) * 100) : 100;

    const milestonesCount = services.filter((s) => Boolean(s.milestoneAchieved)).length;

    // Category hour sums & counts
    const categoryTotals: Record<string, { count: number; hours: number; pct: number }> = {};
    RESIDENT_SERVICE_CATEGORIES.forEach((cat) => {
      categoryTotals[cat.id] = { count: 0, hours: 0, pct: 0 };
    });

    services.forEach((s) => {
      let cat: string = s.serviceCategory;
      if (cat === 'peer_support') cat = 'peer_recovery_support';
      if (cat === 'recreation_social') cat = 'recovery_recreation_social';

      if (!categoryTotals[cat]) {
        categoryTotals[cat] = { count: 0, hours: 0, pct: 0 };
      }
      categoryTotals[cat].count += 1;
      categoryTotals[cat].hours += Math.round((s.durationMinutes / 60) * 10) / 10;
    });

    // Compute percentages
    Object.keys(categoryTotals).forEach((k) => {
      categoryTotals[k].pct = directHours > 0 ? Math.round((categoryTotals[k].hours / directHours) * 100) : 0;
    });

    return {
      directHours,
      totalVolHours,
      totalEncounters,
      uniqueIndividuals,
      totalEconomicValue,
      residentHours,
      communityHours,
      residentUnique,
      communityUnique,
      residentHoursPct,
      communityHoursPct,
      milestonesCount,
      categoryTotals,
    };
  }, [services]);

  return (
    <div className="space-y-8">
      {/* Quick Log Service Shortcuts Header (Matches PUSH for Recovery 2 design) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Quick Log Service Shortcuts & Core Disciplines</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {[
            { id: 'counseling_support_group', title: 'Counseling / Group', sub: 'Therapy, groups, support', icon: HeartHandshake, color: 'text-purple-400' },
            { id: 'peer_recovery_support', title: 'Peer Recovery', sub: 'Mentorship, 1-on-1', icon: Users, color: 'text-blue-400' },
            { id: 'recovery_recreation_social', title: 'Recreation & Social', sub: 'Sober events', icon: Smile, color: 'text-pink-400' },
            { id: 'computer_skills', title: 'Computer Skills', sub: 'Email, job search', icon: Laptop, color: 'text-cyan-400' },
            { id: 'vocational_training', title: 'Vocational & Jobs', sub: 'Resumes, hiring', icon: Briefcase, color: 'text-amber-400' },
            { id: 'ged_education', title: 'GED / Education', sub: 'Math, literacy', icon: GraduationCap, color: 'text-indigo-400' },
            { id: 'community_service', title: 'Community Service', sub: 'Court linkage', icon: Award, color: 'text-yellow-400' },
            { id: 'advocacy_case_mgmt', title: 'Advocacy & Legal', sub: 'Letters, probation', icon: Scale, color: 'text-orange-400' },
            { id: 'transportation', title: 'Transportation', sub: 'Medical, court', icon: Car, color: 'text-red-400' },
          ].map((sc) => {
            const Icon = sc.icon;
            const isSelected = selectedCategory === sc.id;
            return (
              <button
                type="button"
                key={sc.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : sc.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected 
                    ? 'bg-slate-800 border-amber-500 shadow-lg ring-1 ring-amber-500/50' 
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${sc.color}`} />
                <div className="font-bold text-white text-xs line-clamp-1">{sc.title}</div>
                <div className="text-[10px] text-slate-400 line-clamp-1">{sc.sub}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Top Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Volunteer & Direct Hours */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Volunteer Hours</span>
            <Clock className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl sm:text-4xl font-black text-white">{analytics.totalVolHours}</div>
            <span className="text-sm font-semibold text-slate-400">vol hrs</span>
            <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {analytics.directHours} direct hrs
            </span>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            {analytics.residentHours} hrs residents • {analytics.communityHours} hrs community
          </div>
        </div>

        {/* Individuals Served */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Individuals Served</span>
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl sm:text-4xl font-black text-white">{analytics.uniqueIndividuals}</div>
            <span className="text-sm font-semibold text-slate-400">people</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
              🏠 {analytics.residentUnique} Residents
            </span>
            <span className="px-2 py-0.5 rounded-md bg-indigo-950/60 border border-indigo-800 text-indigo-300 font-medium">
              🌐 {analytics.communityUnique} Community
            </span>
          </div>
        </div>

        {/* Total Encounters */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Encounters</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl sm:text-4xl font-black text-white">{analytics.totalEncounters}</div>
            <span className="text-sm font-semibold text-slate-400">sessions</span>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            Direct linkage, coaching & training activities logged
          </div>
        </div>

        {/* Key Milestones */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Milestones</span>
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl sm:text-4xl font-black text-amber-400">{analytics.milestonesCount}</div>
            <span className="text-sm font-semibold text-slate-400">achieved</span>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            GED, job placements, hours fulfilled & certifications
          </div>
        </div>
      </div>

      {/* Two-Column Middle Section: Population Reach & Impact by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Population Reach & Distribution */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-400" />
              <h4 className="text-base font-bold text-white">Population Reach & Distribution</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dual organization mission serving both recovery house residents and broader Chillicothe community members.
            </p>

            <div className="space-y-4 pt-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Home className="w-4 h-4 text-phoenix-400" /> Resident Support
                  </span>
                  <span className="text-slate-400">{analytics.residentHours} hrs ({analytics.residentHoursPct}%)</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-phoenix-500 to-amber-500 rounded-full" 
                    style={{ width: `${analytics.residentHoursPct}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-400" /> Non-Resident Community Outreach
                  </span>
                  <span className="text-indigo-400">{analytics.communityHours} hrs ({analytics.communityHoursPct}%)</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" 
                    style={{ width: `${analytics.communityHoursPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Funder Highlight Callout */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed mt-4">
            <div className="font-bold flex items-center gap-1.5 text-amber-400 mb-1">
              <span>💡 Grant & Funder Highlight</span>
            </div>
            Demonstrates to ADAMH, city, and philanthropic partners that Life Recovery Society actively serves external recovery-seeking community members alongside resident housing beds.
          </div>
        </div>

        {/* Right: Impact by Service Category Breakdown */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Impact by Service Category</span>
              </h4>
              <p className="text-xs text-slate-400">
                Breakdown of total delivered service hours across specialized life skills, education, and community linkages.
              </p>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">12 Domains</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
            {RESIDENT_SERVICE_CATEGORIES.map((cat) => {
              const data = analytics.categoryTotals[cat.id] || { count: 0, hours: 0, pct: 0 };
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                  className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                    isSelected 
                      ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500/50' 
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-750'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                      {getCategoryIcon(cat.id)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs line-clamp-1">{cat.label}</div>
                      <div className="text-[10px] text-slate-400">{data.count} sessions</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-extrabold text-white">{data.hours} hrs</div>
                    <div className="text-[10px] text-slate-500">{data.pct}%</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Service Encounter Log & Search Feed */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h4 className="text-lg font-bold text-white">Service Encounter Log</h4>
            <p className="text-xs text-slate-400">
              Showing {filteredServices.length} of {services.length} logged service records with provider verification.
            </p>
          </div>

          {/* Search & Recipient Type Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search participant, title, provider..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={selectedRecipientType}
              onChange={(e) => setSelectedRecipientType(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Populations</option>
              <option value="resident">Residents Only</option>
              <option value="community_member">Non-Resident Community</option>
            </select>

            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="px-2.5 py-1.5 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-semibold"
              >
                Clear Category Filter ✕
              </button>
            )}
          </div>
        </div>

        {/* Records Table / Cards */}
        <div className="space-y-3">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No service records match your current filters.
            </div>
          ) : (
            filteredServices.map((record) => (
              <div
                key={record.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    {getCategoryIcon(record.serviceCategory)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white text-sm">{record.serviceTitle}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        record.recipientType === 'resident'
                          ? 'bg-phoenix-600/20 text-phoenix-300 border border-phoenix-500/30'
                          : 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      }`}>
                        {record.recipientType === 'resident' ? '🏠 Resident' : '🌐 Community Member'}
                      </span>
                      <span className="text-slate-400 text-[11px]">• {record.serviceDate}</span>
                    </div>

                    <div className="text-slate-300">
                      <strong>Participant:</strong> {record.recipientName} {record.houseName ? `(${record.houseName})` : ''} • <strong>Duration:</strong> {record.durationMinutes} min ({Math.round(record.durationMinutes / 60 * 10) / 10} hr)
                    </div>

                    {record.notes && (
                      <p className="text-slate-400 text-[11px] italic pt-0.5">
                        "{record.notes}"
                      </p>
                    )}

                    {record.milestoneAchieved && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Milestone: {record.milestoneAchieved}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-left md:text-right space-y-1 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800 font-medium">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified by {record.providerName}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {record.fundingSource || 'Program Supported'} • {record.location || 'Chillicothe, OH'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
