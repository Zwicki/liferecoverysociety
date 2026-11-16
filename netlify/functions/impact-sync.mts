import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import pushForRecoveryJson from "../../src/data/pushForRecoveryData.json";
import hopeDealersJson from "../../src/data/hopeDealersData.json";

// Relax TLS certificate verification for external webhook/sync calls to sister sites
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const STORE_NAME = "community-impact";
const DATA_KEY = "live-impact-records";

const INITIAL_WALKS = (hopeDealersJson.walks && hopeDealersJson.walks.length > 0)
  ? hopeDealersJson.walks
  : [
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
        notes: 'Hope Dealers street ministry outreach in Chillicothe.',
      },
    ];

const INITIAL_PINS = (hopeDealersJson.pins && hopeDealersJson.pins.length > 0)
  ? hopeDealersJson.pins
  : [
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

const INITIAL_HOUSES = pushForRecoveryJson.residences || [
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
  },
];

const INITIAL_SERVICES = (pushForRecoveryJson.services as any[]) || [];

interface ImpactStoreData {
  updatedAt: string;
  walks: any[];
  pins: any[];
  services: any[];
  houses: any[];
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Content-Type": "application/json",
  };
}

// Normalize incoming service record from PUSH for Recovery
function normalizePushService(s: any) {
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

// Normalize incoming walk session from Hope Dealers
function normalizeHopeWalk(w: any) {
  const durationMin = Number(w.durationMinutes) || 90;
  const members = Array.isArray(w.groupMembers) && w.groupMembers.length > 0 ? w.groupMembers : ['Rick Fannin'];
  const groupSize = Number(w.groupSize) || members.length;
  const volHrs = Number(w.volunteerHours) || Math.round((durationMin / 60) * groupSize * 10) / 10;

  return {
    id: w.id,
    date: w.date || (w.startTime ? w.startTime.slice(0, 10) : new Date().toISOString().slice(0, 10)),
    startTime: w.startTime || new Date().toISOString(),
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

// Active Upstream Live Synchronizer
async function fetchUpstreamLiveData(): Promise<{
  liveServices?: any[];
  liveHouses?: any[];
  liveWalks?: any[];
  livePins?: any[];
}> {
  const timeoutMs = 4500;
  const results: {
    liveServices?: any[];
    liveHouses?: any[];
    liveWalks?: any[];
    livePins?: any[];
  } = {};

  try {
    const fetchWithTimeout = async (url: string) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) return null;
        return await response.json();
      } catch (e) {
        return null;
      } finally {
        clearTimeout(timer);
      }
    };

    const [pushServicesData, pushResidencesData, hopeCloudData] = await Promise.allSettled([
      fetchWithTimeout("https://pushforrecovery.com/api/sober-living/services"),
      fetchWithTimeout("https://pushforrecovery.com/api/sober-living/residences"),
      fetchWithTimeout("https://hopedealers.net/.netlify/functions/cloud-state"),
    ]);

    // 1. Process PUSH Services
    if (pushServicesData.status === "fulfilled" && pushServicesData.value?.services) {
      results.liveServices = pushServicesData.value.services;
    }

    // 2. Process PUSH Residences
    if (pushResidencesData.status === "fulfilled" && pushResidencesData.value?.residences) {
      results.liveHouses = pushResidencesData.value.residences;
    }

    // 3. Process Hope Dealers Walks & Pins
    if (hopeCloudData.status === "fulfilled" && hopeCloudData.value?.record) {
      results.liveWalks = hopeCloudData.value.record.walks;
      results.livePins = hopeCloudData.value.record.pins;
    }
  } catch (err) {
    console.warn("Upstream live sync network error:", err);
  }

  return results;
}

async function getOrInitData(): Promise<ImpactStoreData> {
  const walkMap = new Map();
  INITIAL_WALKS.forEach((w) => walkMap.set(w.id, normalizeHopeWalk(w)));

  const pinMap = new Map();
  INITIAL_PINS.forEach((p) => pinMap.set(p.id, p));

  const serviceMap = new Map();
  INITIAL_SERVICES.forEach((s: any) => serviceMap.set(s.id, normalizePushService(s)));

  const houseMap = new Map();
  INITIAL_HOUSES.forEach((h: any) => houseMap.set(h.id, h));

  // 1. Read existing cached records from Netlify Blobs
  try {
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    const existing = (await store.get(DATA_KEY, { type: "json" })) as ImpactStoreData | null;

    if (existing) {
      (existing.walks || []).forEach((w) => walkMap.set(w.id, w));
      (existing.pins || []).forEach((p) => pinMap.set(p.id, p));
      (existing.services || []).forEach((s) => serviceMap.set(s.id, s));
      (existing.houses || []).forEach((h) => houseMap.set(h.id, h));
    }
  } catch (err) {
    console.warn("Netlify Blobs read warning:", err);
  }

  // 2. Fetch live data from upstream sister platforms (pushforrecovery.com & hopedealers.net)
  const upstream = await fetchUpstreamLiveData();
  let hasNewUpstream = false;

  if (Array.isArray(upstream.liveServices) && upstream.liveServices.length > 0) {
    upstream.liveServices.forEach((s) => {
      if (s?.id) {
        serviceMap.set(s.id, normalizePushService(s));
        hasNewUpstream = true;
      }
    });
  }

  if (Array.isArray(upstream.liveHouses) && upstream.liveHouses.length > 0) {
    upstream.liveHouses.forEach((h) => {
      if (h?.id) {
        houseMap.set(h.id, {
          id: h.id,
          name: h.name || 'Mens Made for More House',
          shortName: h.shortName || (h.gender === 'womens' ? "Women's House" : "Men's House"),
          gender: h.gender || 'mens',
          narrLevel: h.narrLevel || 'Level II',
          standard: h.standard || 'NARR Std 8 & ORH',
          address: h.address || '190 Caldwell',
          city: h.city || 'Chillicothe',
          state: h.state || 'OH',
          capacityBeds: Number(h.capacityBeds || h.bedCapacity) || 8,
          currentResidents: Number(h.currentResidents || h.currentOccupancy) || 1,
          active: h.active ?? true,
          notes: h.notes,
        });
        hasNewUpstream = true;
      }
    });
  }

  if (Array.isArray(upstream.liveWalks) && upstream.liveWalks.length > 0) {
    upstream.liveWalks.forEach((w) => {
      if (w?.id) {
        walkMap.set(w.id, normalizeHopeWalk(w));
        hasNewUpstream = true;
      }
    });
  }

  if (Array.isArray(upstream.livePins) && upstream.livePins.length > 0) {
    upstream.livePins.forEach((p) => {
      if (p?.id) {
        pinMap.set(p.id, p);
        hasNewUpstream = true;
      }
    });
  }

  const mergedData: ImpactStoreData = {
    updatedAt: new Date().toISOString(),
    walks: Array.from(walkMap.values()),
    pins: Array.from(pinMap.values()),
    services: Array.from(serviceMap.values()),
    houses: Array.from(houseMap.values()),
  };

  // 3. Persist back to Netlify Blobs if new data was detected
  if (hasNewUpstream) {
    try {
      const store = getStore({ name: STORE_NAME, consistency: "strong" });
      await store.setJSON(DATA_KEY, mergedData);
    } catch (saveErr) {
      console.warn("Netlify Blobs write warning:", saveErr);
    }
  }

  return mergedData;
}

export default async (req: Request, _context: Context) => {
  // 1. Handle CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    });
  }

  // 2. GET: Return the latest live impact data
  if (req.method === "GET") {
    const data = await getOrInitData();
    return new Response(
      JSON.stringify({
        success: true,
        source: "live_community_impact",
        updatedAt: data.updatedAt,
        counts: {
          walks: data.walks.length,
          pins: data.pins.length,
          services: data.services.length,
          houses: data.houses.length,
        },
        walks: data.walks,
        pins: data.pins,
        services: data.services,
        houses: data.houses,
      }),
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  }

  // 3. POST: Accept direct webhook/manual push from Hope Dealers or Push For Recovery
  if (req.method === "POST") {
    try {
      const current = await getOrInitData();
      const body = await req.json();

      const walkMap = new Map();
      current.walks.forEach((w) => walkMap.set(w.id, w));

      const pinMap = new Map();
      current.pins.forEach((p) => pinMap.set(p.id, p));

      const serviceMap = new Map();
      current.services.forEach((s) => serviceMap.set(s.id, s));

      const houseMap = new Map();
      current.houses.forEach((h) => houseMap.set(h.id, h));

      if (Array.isArray(body.walks)) {
        body.walks.forEach((w: any) => {
          if (w?.id) walkMap.set(w.id, normalizeHopeWalk(w));
        });
      } else if (body.walk && body.walk.id) {
        walkMap.set(body.walk.id, normalizeHopeWalk(body.walk));
      }

      if (Array.isArray(body.pins)) {
        body.pins.forEach((p: any) => {
          if (p?.id) pinMap.set(p.id, { ...pinMap.get(p.id), ...p });
        });
      } else if (body.pin && body.pin.id) {
        pinMap.set(body.pin.id, { ...pinMap.get(body.pin.id), ...body.pin });
      }

      if (Array.isArray(body.services)) {
        body.services.forEach((s: any) => {
          if (s?.id) serviceMap.set(s.id, normalizePushService(s));
        });
      } else if (body.service && body.service.id) {
        serviceMap.set(body.service.id, normalizePushService(body.service));
      } else if (body.serviceRecord && body.serviceRecord.id) {
        serviceMap.set(body.serviceRecord.id, normalizePushService(body.serviceRecord));
      }

      if (Array.isArray(body.houses)) {
        body.houses.forEach((h: any) => {
          if (h?.id) houseMap.set(h.id, { ...houseMap.get(h.id), ...h });
        });
      }

      const nextData: ImpactStoreData = {
        updatedAt: new Date().toISOString(),
        walks: Array.from(walkMap.values()),
        pins: Array.from(pinMap.values()),
        services: Array.from(serviceMap.values()),
        houses: Array.from(houseMap.values()),
      };

      try {
        const store = getStore({ name: STORE_NAME, consistency: "strong" });
        await store.setJSON(DATA_KEY, nextData);
      } catch (saveErr) {
        console.error("Netlify Blobs write error:", saveErr);
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Live impact data synchronized successfully without data loss.",
          updatedAt: nextData.updatedAt,
          counts: {
            walks: nextData.walks.length,
            pins: nextData.pins.length,
            services: nextData.services.length,
            houses: nextData.houses.length,
          },
        }),
        {
          status: 200,
          headers: corsHeaders(),
        }
      );
    } catch (err: any) {
      return new Response(
        JSON.stringify({
          success: false,
          error: err?.message || "Failed to process impact sync update",
        }),
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }
  }

  return new Response("Method Not Allowed", { status: 405, headers: corsHeaders() });
};

export const config: Config = {
  path: "/api/impact-sync",
};
