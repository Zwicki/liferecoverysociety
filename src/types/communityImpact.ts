export type NeedCategoryId =
  | 'food_water'
  | 'shelter_housing'
  | 'detox_recovery'
  | 'clothing_hygiene'
  | 'medical_mental'
  | 'crisis_support'
  | 'employment_id';

export interface NeedCategoryOption {
  id: NeedCategoryId;
  label: string;
  shortLabel: string;
  emoji: string;
  colorClass: string;
}

export const NEED_CATEGORIES: NeedCategoryOption[] = [
  {
    id: 'food_water',
    label: 'Food / Water / Hot Meal',
    shortLabel: 'Food & Water',
    emoji: '🍲',
    colorClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    id: 'shelter_housing',
    label: 'Shelter / Sober Living Placement',
    shortLabel: 'Shelter / Housing',
    emoji: '🏠',
    colorClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  },
  {
    id: 'detox_recovery',
    label: 'Detox / Addiction Recovery Linkage',
    shortLabel: 'Detox / Recovery',
    emoji: '❤️‍🩹',
    colorClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    id: 'clothing_hygiene',
    label: 'Clothing / Blankets / Hygiene Kits',
    shortLabel: 'Clothing & Hygiene',
    emoji: '👕',
    colorClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
  {
    id: 'medical_mental',
    label: 'Medical / Mental Health Aid',
    shortLabel: 'Medical / Mental',
    emoji: '🏥',
    colorClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  },
  {
    id: 'crisis_support',
    label: 'Immediate Crisis Support & De-escalation',
    shortLabel: 'Crisis Support',
    emoji: '🆘',
    colorClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  },
  {
    id: 'employment_id',
    label: 'Jobs / State ID / Transit Assistance',
    shortLabel: 'Jobs / ID / Transit',
    emoji: '💼',
    colorClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  },
];

export type EncounterType = 'prayer' | 'service' | 'both';

export interface EncounterPin {
  id: string;
  walkId: string;
  timestamp: string;
  lat: number;
  lng: number;
  streetName: string;
  firstName: string;
  description: string;
  type: EncounterType;
  needCategories: NeedCategoryId[];
  loggedByRecorder: string;
  groupMembers: string[];
}

export interface WalkSession {
  id: string;
  date: string;
  startTime: string;
  endTime?: string;
  durationMinutes: number;
  recorderName: string;
  groupMembers: string[];
  groupSize: number;
  volunteerHours: number;
  milesWalked: number;
  streetsWalked: string[];
  startPoint?: { lat: number; lng: number; streetName?: string };
  endPoint?: { lat: number; lng: number; streetName?: string };
  gpsPath: [number, number][];
  interactionsCount: number;
  prayersCount: number;
  serviceLinkagesCount: number;
  trashBagsCount: number;
  trashWeightLbs: number;
  notes?: string;
}

export type ResidentServiceCategory =
  | 'counseling_support_group'
  | 'computer_skills'
  | 'vocational_training'
  | 'ged_education'
  | 'community_service'
  | 'advocacy_case_mgmt'
  | 'transportation'
  | 'peer_support'
  | 'peer_recovery_support'
  | 'recovery_recreation_social'
  | 'food_essential_needs'
  | 'housing_navigation'
  | 'financial_literacy'
  | 'health_navigation'
  | 'other';

export interface ServiceCategoryMeta {
  id: ResidentServiceCategory;
  label: string;
  short: string;
  icon: string;
  color: string;
}

export const RESIDENT_SERVICE_CATEGORIES: ServiceCategoryMeta[] = [
  { id: 'counseling_support_group', label: 'Counseling & Support Groups', short: 'Counseling / Group', icon: 'HeartHandshake', color: 'from-violet-500 to-purple-600' },
  { id: 'peer_recovery_support', label: 'Peer Recovery Support & Mentorship', short: 'Peer Recovery Support', icon: 'Users', color: 'from-cyan-500 to-blue-600' },
  { id: 'recovery_recreation_social', label: 'Recovery Recreation & Social Connection', short: 'Recreation & Social', icon: 'Sparkles', color: 'from-lime-500 to-emerald-600' },
  { id: 'vocational_training', label: 'Vocational Training & Workforce Readiness', short: 'Vocational & Jobs', icon: 'Briefcase', color: 'from-emerald-500 to-teal-600' },
  { id: 'computer_skills', label: 'Basic Computer & Digital Skills Training', short: 'Computer Skills', icon: 'Laptop', color: 'from-indigo-500 to-blue-600' },
  { id: 'ged_education', label: 'GED Preparation & Adult Education', short: 'GED & Education', icon: 'GraduationCap', color: 'from-yellow-500 to-amber-600' },
  { id: 'community_service', label: 'Community Service Linkage & Restitution', short: 'Community Service', icon: 'Award', color: 'from-teal-500 to-emerald-600' },
  { id: 'advocacy_case_mgmt', label: 'Advocacy, Legal & Court Liaison', short: 'Advocacy & Legal', icon: 'Scale', color: 'from-purple-500 to-indigo-600' },
  { id: 'transportation', label: 'Transportation & Mobility Assistance', short: 'Transportation', icon: 'Car', color: 'from-blue-500 to-sky-600' },
  { id: 'food_essential_needs', label: 'Food, Clothing & Essential Needs Pantry', short: 'Food & Clothing', icon: 'ShoppingBag', color: 'from-rose-500 to-red-600' },
  { id: 'housing_navigation', label: 'Housing Navigation & Relocation Support', short: 'Housing Navigation', icon: 'Home', color: 'from-amber-500 to-orange-600' },
  { id: 'financial_literacy', label: 'Financial Literacy & Personal Budgeting', short: 'Financial Literacy', icon: 'DollarSign', color: 'from-green-500 to-emerald-600' },
  { id: 'health_navigation', label: 'Healthcare, Dental & Medical Navigation', short: 'Healthcare Nav', icon: 'Activity', color: 'from-sky-500 to-cyan-600' },
  { id: 'other', label: 'Other Recovery & Community Linkages', short: 'Other Service', icon: 'Sparkles', color: 'from-slate-500 to-slate-700' },
];

export interface ResidentServiceRecord {
  id: string;
  recipientType: 'resident' | 'community_member';
  recipientName: string;
  houseId?: string;
  houseName: string;
  serviceCategory: ResidentServiceCategory;
  serviceTitle: string;
  serviceDate: string;
  durationMinutes: number;
  directHours?: number;
  volunteerHours?: number;
  providerName: string;
  fundingSource: string;
  outcomeStatus: 'completed' | 'in_progress' | 'referred';
  milestoneAchieved?: string;
  notes?: string;
  location: string;
}

export interface RecoveryResidenceHouse {
  id: string;
  name: string;
  shortName: string;
  gender: 'mens' | 'womens' | 'coed';
  narrLevel: string;
  standard: string;
  address: string;
  city: string;
  state: string;
  capacityBeds: number;
  currentResidents: number;
  active: boolean;
  notes?: string;
}

export interface ImmediateNeedsSummary {
  foodWater: number;
  shelterHousing: number;
  detoxRecovery: number;
  clothingHygiene: number;
  medicalMental: number;
  crisisSupport: number;
  employmentId: number;
}

export const CHILLICOTHE_CENTER: [number, number] = [39.3331, -82.9824];
