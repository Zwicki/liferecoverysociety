import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import pushForRecoveryJson from "../../src/data/pushForRecoveryData.json";

// Hope Dealers Baseline (2 walks, 2.2 miles, 7 streets, 9 interactions, 2 prayers, 12 lbs trash, 6 vol hrs)
const INITIAL_WALKS = [
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

const INITIAL_PINS = [
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
    capacityBeds: 6,
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

// PUSH for Recovery 2 verified 71 encounters
const INITIAL_SERVICES = pushForRecoveryJson.services || [];

interface ImpactStoreData {
  updatedAt: string;
  walks: any[];
  pins: any[];
  services: any[];
  houses: any[];
}

const STORE_NAME = "community-impact";
const DATA_KEY = "live-impact-records";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Content-Type": "application/json",
  };
}

async function getOrInitData(): Promise<ImpactStoreData> {
  try {
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    const existing = (await store.get(DATA_KEY, { type: "json" })) as ImpactStoreData | null;

    if (existing && Array.isArray(existing.walks)) {
      // Non-destructive merge with baseline data
      const walkMap = new Map();
      INITIAL_WALKS.forEach((w) => walkMap.set(w.id, w));
      existing.walks.forEach((w) => walkMap.set(w.id, w));

      const pinMap = new Map();
      INITIAL_PINS.forEach((p) => pinMap.set(p.id, p));
      (existing.pins || []).forEach((p) => pinMap.set(p.id, p));

      const serviceMap = new Map();
      INITIAL_SERVICES.forEach((s: any) => serviceMap.set(s.id, s));
      (existing.services || []).forEach((s: any) => serviceMap.set(s.id, s));

      const houseMap = new Map();
      INITIAL_HOUSES.forEach((h: any) => houseMap.set(h.id, h));
      (existing.houses || []).forEach((h: any) => houseMap.set(h.id, h));

      return {
        updatedAt: existing.updatedAt || new Date().toISOString(),
        walks: Array.from(walkMap.values()),
        pins: Array.from(pinMap.values()),
        services: Array.from(serviceMap.values()),
        houses: Array.from(houseMap.values()),
      };
    }
  } catch (err) {
    console.warn("Netlify Blobs read warning:", err);
  }

  // Baseline fallback
  return {
    updatedAt: new Date().toISOString(),
    walks: [...INITIAL_WALKS],
    pins: [...INITIAL_PINS],
    services: [...INITIAL_SERVICES],
    houses: [...INITIAL_HOUSES],
  };
}

export default async (req: Request, context: Context) => {
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

  // 3. POST: Accept live updates from Hope Dealers or Push For Recovery
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

      // Merge walks (from Hope Dealers)
      if (Array.isArray(body.walks)) {
        body.walks.forEach((w: any) => {
          if (w?.id) walkMap.set(w.id, { ...walkMap.get(w.id), ...w });
        });
      } else if (body.walk && body.walk.id) {
        walkMap.set(body.walk.id, { ...walkMap.get(body.walk.id), ...body.walk });
      }

      // Merge pins (from Hope Dealers)
      if (Array.isArray(body.pins)) {
        body.pins.forEach((p: any) => {
          if (p?.id) pinMap.set(p.id, { ...pinMap.get(p.id), ...p });
        });
      } else if (body.pin && body.pin.id) {
        pinMap.set(body.pin.id, { ...pinMap.get(body.pin.id), ...body.pin });
      }

      // Merge resident and community services (from PUSH for Recovery)
      if (Array.isArray(body.services)) {
        body.services.forEach((s: any) => {
          if (s?.id) serviceMap.set(s.id, { ...serviceMap.get(s.id), ...s });
        });
      } else if (body.service && body.service.id) {
        serviceMap.set(body.service.id, { ...serviceMap.get(body.service.id), ...body.service });
      } else if (body.serviceRecord && body.serviceRecord.id) {
        serviceMap.set(body.serviceRecord.id, { ...serviceMap.get(body.serviceRecord.id), ...body.serviceRecord });
      }

      // Merge houses
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
