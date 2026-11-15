import { WalkSession, EncounterPin, ResidentServiceRecord } from '../types/communityImpact';

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
    notes: 'Hope Dealers street ministry outreach in Chillicothe. Group of 2: Rick Fannin, Pastor John Hocker. 90 mins (3 Vol. Hrs). Streets (1.05 mi): East 7th Street, South Hickory Street, East 5th Street. Greeted 2 neighbors, prayed with a friend on East 7th Street, and cleared 1 bag (12 lbs) of trash.',
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
];

export const IMPACT_SEED_RESIDENT_SERVICES: ResidentServiceRecord[] = [
  {
    id: 'svc-1',
    recipientType: 'community_member',
    recipientName: 'Kristina Taffin',
    houseName: 'Community Member (Non-Resident)',
    serviceCategory: 'counseling_support_group',
    serviceTitle: 'Grief Counseling',
    serviceDate: '2026-11-07',
    durationMinutes: 120,
    providerName: 'Rick Fannin',
    fundingSource: 'Verified by Rick Fannin',
    outcomeStatus: 'completed',
    milestoneAchieved: '',
    notes: 'Grief Counseling Support Group',
    location: 'Chillicothe Community Outreach',
  },
];

