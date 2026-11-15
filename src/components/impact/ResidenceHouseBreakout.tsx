import React from 'react';
import { 
  Home, 
  ShieldCheck, 
  Users, 
  Award, 
  Clock, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Building2,
  HeartHandshake,
  Sparkles
} from 'lucide-react';
import { RecoveryResidenceHouse, ResidentServiceRecord } from '../../types/communityImpact';

interface ResidenceHouseBreakoutProps {
  houses: RecoveryResidenceHouse[];
  services: ResidentServiceRecord[];
}

export const ResidenceHouseBreakout: React.FC<ResidenceHouseBreakoutProps> = ({ houses, services }) => {
  // Compute metrics per house
  const houseStats = houses.map((house) => {
    const houseServices = services.filter((s) => s.houseId === house.id || s.location.includes(house.name));
    const residentServices = houseServices.filter((s) => s.recipientType === 'resident');
    const directHours = houseServices.reduce((sum, s) => sum + (s.directHours || s.durationMinutes / 60), 0);
    const volunteerHours = houseServices.reduce((sum, s) => sum + (s.volunteerHours || s.durationMinutes / 60), 0);
    const uniqueResidents = new Set(residentServices.map((s) => s.recipientName)).size;
    const milestones = houseServices.filter((s) => Boolean(s.milestoneAchieved)).length;

    return {
      ...house,
      totalEncounters: houseServices.length,
      residentEncounters: residentServices.length,
      directHours: Math.round(directHours * 10) / 10,
      volunteerHours: Math.round(volunteerHours * 10) / 10,
      uniqueResidents,
      milestones,
    };
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>NARR Standard 8 & Level II Certified Operations</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Life Recovery Residences: House-by-House Breakout
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Monitored sober living environments providing peer accountability, drug testing, mandatory 12-Step participation, and structured workforce re-entry in Chillicothe, Ohio.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center min-w-[120px]">
              <div className="text-2xl font-black text-white">{houses.length}</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Active Houses</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center min-w-[120px]">
              <div className="text-2xl font-black text-amber-400">
                {houses.reduce((sum, h) => sum + h.capacityBeds, 0)}
              </div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Bed Capacity</div>
            </div>
          </div>
        </div>
      </div>

      {/* House Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {houseStats.map((house) => {
          const isMens = house.gender === 'mens';
          const badgeColor = isMens ? 'from-phoenix-600 to-amber-600' : 'from-rose-500 to-pink-600';
          const occupancyRate = house.capacityBeds > 0 
            ? Math.round((house.currentResidents / house.capacityBeds) * 100) 
            : 0;

          return (
            <div
              key={house.id}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 hover:border-slate-700 transition"
            >
              <div className="space-y-4">
                {/* House Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${badgeColor} text-white flex items-center justify-center font-bold shadow-lg shadow-black/40`}>
                      <Home className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg sm:text-xl font-bold text-white">{house.name}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                          {house.narrLevel}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-phoenix-500 shrink-0" />
                        <span>{house.address}, {house.city}, {house.state}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                    house.currentResidents > 0 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                      : 'bg-amber-950 text-amber-300 border border-amber-800/60'
                  }`}>
                    {house.currentResidents > 0 ? 'Active Residence' : 'Intake Pipeline'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {house.notes}
                </p>

                {/* Capacity & Occupancy Bar */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Bed Occupancy Status:</span>
                    <span className="font-bold text-white">
                      {house.currentResidents} of {house.capacityBeds} Beds Filled ({occupancyRate}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${badgeColor}`}
                      style={{ width: `${Math.max(occupancyRate, 8)}%` }}
                    ></div>
                  </div>
                </div>

                {/* KPI Metrics Sub-Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-center">
                    <div className="text-lg font-black text-white">{house.capacityBeds}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Beds</div>
                  </div>
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-center">
                    <div className="text-lg font-black text-amber-400">{house.residentEncounters}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Resident Sessions</div>
                  </div>
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-center">
                    <div className="text-lg font-black text-emerald-400">{house.directHours} hrs</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Service Hours</div>
                  </div>
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-center">
                    <div className="text-lg font-black text-phoenix-400">{house.milestones}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Milestones</div>
                  </div>
                </div>
              </div>

              {/* Operating Standards Footer */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Standard 8 Monitored Sober Living</span>
                </span>
                <span className="text-slate-500">Curfew & Weekly House Meeting Enforced</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* House Operating Standards Highlights */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Building2 className="w-4 h-4 text-amber-500" />
          <span>Level II Monitored Recovery Residence Standards</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-bold text-white">Peer Governance & Accountability</div>
            <p className="text-slate-400 text-[11px]">
              Elected senior peer leadership, mandatory weekly Sunday house meetings, daily chore verification, and structured peer accountability.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-bold text-white">Randomized Toxicology & Breathalyzers</div>
            <p className="text-slate-400 text-[11px]">
              100% zero-tolerance environment with regular and for-cause drug screens ensuring absolute safety and recovery integrity.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-bold text-white">Second-Chance Workforce Coaching</div>
            <p className="text-slate-400 text-[11px]">
              Integrated resume preparation, interview coaching, and direct linkages with second-chance partner employers across Ross County.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
