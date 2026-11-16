import { 
  WalkSession, 
  EncounterPin, 
  ResidentServiceRecord, 
  RecoveryResidenceHouse,
  ImmediateNeedsSummary 
} from '../types/communityImpact';
import pushForRecoveryJson from './pushForRecoveryData.json';
import hopeDealersJson from './hopeDealersData.json';

// Normalize push service for frontend
function normalizeService(s: any): ResidentServiceRecord {
  const isResident = s.recipientType === 'resident';
  let cat = s.serviceCategory || 'other';
  if (cat === 'peer_support') cat = 'peer_recovery_support';
  if (cat === 'recreation_social') cat = 'recovery_recreation_social';

  const durationMin = Number(s.durationMinutes) || 60;
  const directHrs = Math.round((durationMin / 60) * 10) / 10;
  const providersCount = Array.isArray(s.providers) && s.providers.length > 0 ? s.providers.length : 1;
  const volHrs = s.volunteerHours ?? (Math.round((durationMin / 60) * providersCount * 10) / 10);

  return {
    id: s.id,
    recipientType: isResident ? 'resident' : 'community_member',
    recipientName: s.recipientName || 'Community Member',
    houseId: s.houseId,
    houseName: s.houseName || (s.location?.includes('Caldwell') ? 'Mens Made for More House' : ''),
    serviceCategory: cat,
    serviceTitle: s.serviceTitle || 'Community Service Activity',
    serviceDate: s.serviceDate || (s.createdAt ? s.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10)),
    durationMinutes: durationMin,
    directHours: directHrs,
    volunteerHours: volHrs,
    providerName: s.providerName || (Array.isArray(s.providers) ? s.providers.join(', ') : 'Rick Fannin'),
    fundingSource: s.fundingSource || 'Program Supported',
    outcomeStatus: s.outcomeStatus || 'completed',
    milestoneAchieved: s.milestoneAchieved,
    notes: s.notes,
    location: s.location || 'Mens Made for More House',
  };
}

// Normalize walk for frontend
function normalizeWalk(w: any): WalkSession {
  const durationMin = Number(w.durationMinutes) || 90;
  const members = Array.isArray(w.groupMembers) && w.groupMembers.length > 0 ? w.groupMembers : ['Rick Fannin'];
  const groupSize = Number(w.groupSize) || members.length;
  const volHrs = Number(w.volunteerHours) || Math.round((durationMin / 60) * groupSize * 10) / 10;

  return {
    id: w.id,
    date: w.date || (w.startTime ? w.startTime.slice(0, 10) : '2026-11-14'),
    startTime: w.startTime || '2026-11-14T10:00:00.000Z',
    endTime: w.endTime,
    durationMinutes: durationMin,
    recorderName: w.recorderName || 'Rick Fannin',
    groupMembers: members,
    groupSize: groupSize,
    volunteerHours: volHrs,
    milesWalked: Number(w.milesWalked) || 1.1,
    streetsWalked: Array.isArray(w.streetsWalked) ? w.streetsWalked : ['East 7th Street'],
    gpsPath: Array.isArray(w.gpsPath) ? w.gpsPath : [],
    interactionsCount: Number(w.interactionsCount) || 0,
    prayersCount: Number(w.prayersCount) || 0,
    serviceLinkagesCount: Number(w.serviceLinkagesCount) || 0,
    trashBagsCount: Number(w.trashBagsCount) || 0,
    trashWeightLbs: Number(w.trashWeightLbs) || 0,
    notes: w.notes,
  };
}

// Hope Dealers Live Field Baseline
export const IMPACT_SEED_WALKS: WalkSession[] = 
  (hopeDealersJson.walks && hopeDealersJson.walks.length > 0)
    ? (hopeDealersJson.walks as any[]).map(normalizeWalk)
    : [];

export const IMPACT_SEED_PINS: EncounterPin[] = 
  (hopeDealersJson.pins && hopeDealersJson.pins.length > 0)
    ? (hopeDealersJson.pins as any[])
    : [];

export const IMPACT_NEEDS_BREAKDOWN: ImmediateNeedsSummary = {
  foodWater: 0,
  shelterHousing: 0,
  detoxRecovery: 0,
  clothingHygiene: 0,
  medicalMental: 0,
  crisisSupport: 0,
  employmentId: 0,
};

// Life Recovery Residences (Made for More Houses)
export const IMPACT_SEED_HOUSES: RecoveryResidenceHouse[] = (pushForRecoveryJson.residences as unknown as RecoveryResidenceHouse[]) || [
  {
    id: 'res_hope_main',
    name: 'Mens Made for More House',
    shortName: 'Men\'s House',
    gender: 'mens',
    narrLevel: 'Level II',
    standard: 'NARR Std 8 & ORH',
    address: '190 Caldwell',
    city: 'Chillicothe',
    state: 'OH',
    capacityBeds: 8,
    currentResidents: 1,
    active: true,
    notes: 'Certified Level II monitored sober living with peer governance, random drug testing, and workforce coaching.',
  },
  {
    id: 'res_hope_womens',
    name: 'Womens Made for More House',
    shortName: 'Women\'s House',
    gender: 'womens',
    narrLevel: 'Level II',
    standard: 'NARR Std 8 & ORH',
    address: 'Chillicothe Community Corridor',
    city: 'Chillicothe',
    state: 'OH',
    capacityBeds: 6,
    currentResidents: 0,
    active: true,
    notes: 'Level II women\'s recovery living track under active community capital development and resident admissions intake.',
  },
];

// PUSH for Recovery Live Service Encounters (72 sessions including Vocational Training)
export const IMPACT_SEED_RESIDENT_SERVICES: ResidentServiceRecord[] = 
  Array.isArray(pushForRecoveryJson.services)
    ? (pushForRecoveryJson.services as any[]).map(normalizeService)
    : [];
