import { 
  WalkSession, 
  EncounterPin, 
  ResidentServiceRecord, 
  RecoveryResidenceHouse,
  ImmediateNeedsSummary 
} from '../types/communityImpact';
import pushForRecoveryJson from './pushForRecoveryData.json';

// Hope Dealers Live Field Baseline (2 walks, 2.2 miles, 7 streets, 9 interactions, 2 prayers, 12 lbs trash, 6 vol hrs)
export const IMPACT_SEED_WALKS: WalkSession[] = [
  {
    id: 'walk-1',
    date: '2026-11-14',
    startTime: '2026-11-14T10:00:00.000Z',
    endTime: '2026-11-14T11:30:00.000Z',
    durationMinutes: 90,
    recorderName: 'Rick Fannin',
    groupMembers: ['Rick Fannin', 'Pastor John Hocker'],
    groupSize: 2,
    volunteerHours: 3.0,
    milesWalked: 1.1,
    streetsWalked: ['East 7th Street', 'South Hickory Street', 'East 5th Street'],
    gpsPath: [
      [39.32878, -82.9815],
      [39.32878, -82.9776],
      [39.3308, -82.9776],
      [39.3308, -82.9730],
    ],
    interactionsCount: 2,
    prayersCount: 1,
    serviceLinkagesCount: 0,
    trashBagsCount: 1,
    trashWeightLbs: 12,
    notes: 'Hope Dealers street ministry outreach in Chillicothe. Group of 2: Rick Fannin, Pastor John Hocker. 90 mins (3 Vol. Hrs). Streets: East 7th Street, South Hickory Street, East 5th Street. Greeted 2 neighbors, prayed with a friend on East 7th Street, and cleared 1 bag (12 lbs) of trash.',
  },
  {
    id: 'walk-2',
    date: '2026-11-15',
    startTime: '2026-11-15T13:30:00.000Z',
    endTime: '2026-11-15T15:00:00.000Z',
    durationMinutes: 90,
    recorderName: 'Rick Fannin',
    groupMembers: ['Rick Fannin', 'Pastor John Hocker'],
    groupSize: 2,
    volunteerHours: 3.0,
    milesWalked: 1.1,
    streetsWalked: ['Paint St', 'E Main St', 'Mulberry St', 'E 2nd St'],
    gpsPath: [
      [39.3331, -82.9824],
      [39.3333, -82.9780],
      [39.3350, -82.9786],
      [39.3348, -82.9772],
      [39.3331, -82.9824],
    ],
    interactionsCount: 7,
    prayersCount: 1,
    serviceLinkagesCount: 0,
    trashBagsCount: 0,
    trashWeightLbs: 0,
    notes: 'Downtown corridor walk connecting Paint St, Main St, Mulberry, and 2nd St. Checked in with 7 neighbors on the sidewalks, shared encouragement, and prayed together for family restoration.',
  },
];

export const IMPACT_SEED_PINS: EncounterPin[] = [
  {
    id: 'pin-1794736086077',
    walkId: 'walk-1',
    timestamp: '2026-11-14T10:45:00.000Z',
    lat: 39.32878,
    lng: -82.9776,
    streetName: 'East 7th Street',
    firstName: 'Friend (Anonymous)',
    description: 'Loss of leg, prayers for a family member.',
    type: 'prayer',
    needCategories: [],
    loggedByRecorder: 'Rick Fannin',
    groupMembers: ['Rick Fannin'],
  },
  {
    id: 'pin-1794736086078',
    walkId: 'walk-2',
    timestamp: '2026-11-15T14:15:00.000Z',
    lat: 39.3333,
    lng: -82.9824,
    streetName: 'Paint St & E Main St',
    firstName: 'Neighbor on Sidewalk',
    description: 'Offered personal prayer for spiritual renewal, inner peace, and family healing.',
    type: 'prayer',
    needCategories: [],
    loggedByRecorder: 'Rick Fannin',
    groupMembers: ['Rick Fannin', 'Pastor John Hocker'],
  },
];

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
export const IMPACT_SEED_HOUSES: RecoveryResidenceHouse[] = (pushForRecoveryJson.residences as RecoveryResidenceHouse[]) || [
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
    capacityBeds: 6,
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

// PUSH for Recovery 2 Live Service Encounters (71 sessions, 106 direct hrs, 211 vol hrs, 12 community members)
export const IMPACT_SEED_RESIDENT_SERVICES: ResidentServiceRecord[] = 
  (pushForRecoveryJson.services as unknown as ResidentServiceRecord[]) || [];
