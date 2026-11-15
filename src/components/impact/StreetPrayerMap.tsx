import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  Filter, 
  MapPin, 
  Footprints, 
  HeartHandshake, 
  Trash2, 
  Sparkles, 
  Layers,
  CheckCircle2,
  Calendar,
  User,
  Compass
} from 'lucide-react';
import { 
  WalkSession, 
  EncounterPin, 
  NeedCategoryId, 
  NEED_CATEGORIES, 
  CHILLICOTHE_CENTER 
} from '../../types/communityImpact';

// Custom Map Marker Icons using Leaflet divIcon
function createPinIcon(type: 'prayer' | 'service' | 'both') {
  const bg =
    type === 'both'
      ? 'linear-gradient(135deg, #f97316, #dc2626)'
      : type === 'prayer'
      ? 'linear-gradient(135deg, #f59e0b, #d97706)'
      : 'linear-gradient(135deg, #10b981, #0284c7)';

  const symbol = type === 'both' ? '✝️' : type === 'prayer' ? '🙏' : '🤝';

  return L.divIcon({
    className: 'custom-hope-pin',
    html: `<div style="
      width: 32px;
      height: 32px;
      border-radius: 9999px;
      background: ${bg};
      border: 2px solid #ffffff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      cursor: pointer;
    ">${symbol}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

interface StreetPrayerMapProps {
  walks: WalkSession[];
  pins: EncounterPin[];
}

export const StreetPrayerMap: React.FC<StreetPrayerMapProps> = ({ walks, pins }) => {
  const [selectedCategory, setSelectedCategory] = useState<NeedCategoryId | 'all'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'prayer' | 'service' | 'both'>('all');
  const [activePin, setActivePin] = useState<EncounterPin | null>(null);

  // Filtered Pins
  const filteredPins = useMemo(() => {
    return pins.filter((pin) => {
      if (selectedType !== 'all' && pin.type !== selectedType) return false;
      if (selectedCategory !== 'all' && !pin.needCategories.includes(selectedCategory)) return false;
      return true;
    });
  }, [pins, selectedType, selectedCategory]);

  // Aggregate Metrics for Map
  const mapStats = useMemo(() => {
    const totalMiles = walks.reduce((acc, w) => acc + w.milesWalked, 0);
    const totalHours = walks.reduce((acc, w) => acc + w.volunteerHours, 0);
    const totalPrayers = walks.reduce((acc, w) => acc + w.prayersCount, 0);
    const totalService = walks.reduce((acc, w) => acc + w.serviceLinkagesCount, 0);
    const totalTrashLbs = walks.reduce((acc, w) => acc + w.trashWeightLbs, 0);
    const uniqueStreets = Array.from(new Set(walks.flatMap((w) => w.streetsWalked)));

    return {
      totalMiles: totalMiles.toFixed(1),
      totalHours: totalHours.toFixed(1),
      totalPrayers,
      totalService,
      totalTrashLbs,
      streetsCount: uniqueStreets.length,
      uniqueStreets,
    };
  }, [walks]);

  // Colors for route polylines
  const routeColors = ['#f97316', '#e11d48', '#3b82f6', '#10b981'];

  return (
    <div className="space-y-6">
      {/* Map Header & Filter Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-phoenix-500/10 border border-phoenix-500/30 text-xs font-semibold text-phoenix-400 mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Hope Dealers Outreach Initiative</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Chillicothe Street, Outreach & Prayer Map
            </h3>
            <p className="text-xs text-slate-300">
              Interactive GPS routes, prayer encounters, and emergency physical linkages delivered on the sidewalks of Chillicothe & Ross County.
            </p>
          </div>

          {/* Quick Metrics Badge Strip */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
              <Footprints className="w-3.5 h-3.5 text-phoenix-400" />
              <strong>{mapStats.totalMiles}</strong> miles walked
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <strong>{mapStats.totalPrayers}</strong> {Number(mapStats.totalPrayers) === 1 ? 'prayer' : 'prayers'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              <strong>{mapStats.totalService}</strong> physical linkages
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
              <Trash2 className="w-3.5 h-3.5 text-blue-400" />
              <strong>{mapStats.totalTrashLbs}</strong> lbs trash cleaned
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Encounter Type Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Type:</span>
            {(['all', 'prayer', 'service', 'both'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-lg border font-semibold transition capitalize ${
                  selectedType === type
                    ? 'bg-phoenix-600 text-white border-phoenix-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {type === 'all' ? 'All Pins' : type === 'both' ? 'Prayer & Service' : type}
              </button>
            ))}
          </div>

          {/* Need Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg border font-semibold transition shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-amber-600 text-white border-amber-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              All Needs
            </button>
            {NEED_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg border font-semibold transition shrink-0 flex items-center gap-1 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white border-amber-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Map Box */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-[560px] bg-slate-950">
        <MapContainer
          center={CHILLICOTHE_CENTER}
          zoom={14}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
          style={{ height: '100%', width: '100%', background: '#0b1120' }}
        >
          {/* CartoDB Dark Matter tiles */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CartoDB</a> OpenStreetMap contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* Route Polylines */}
          {walks.map((walk, idx) => (
            <Polyline
              key={walk.id}
              positions={walk.gpsPath}
              pathOptions={{
                color: routeColors[idx % routeColors.length],
                weight: 4.5,
                opacity: 0.85,
                dashArray: '8, 6',
              }}
            >
              <Popup>
                <div className="text-xs space-y-1 p-1">
                  <div className="font-bold text-white text-sm">Outreach Walk ({walk.date})</div>
                  <div className="text-slate-300"><strong>Team:</strong> {walk.groupMembers.join(', ')}</div>
                  <div className="text-slate-300"><strong>Distance:</strong> {walk.milesWalked} miles ({walk.volunteerHours} volunteer hrs)</div>
                  <div className="text-slate-300"><strong>Streets:</strong> {walk.streetsWalked.join(', ')}</div>
                  <div className="text-amber-400 font-semibold">{walk.prayersCount} Prayers • {walk.serviceLinkagesCount} Needs Linked</div>
                </div>
              </Popup>
            </Polyline>
          ))}

          {/* Encounter Markers */}
          {filteredPins.map((pin) => (
            <Marker
              key={pin.id}
              position={[pin.lat, pin.lng]}
              icon={createPinIcon(pin.type)}
              eventHandlers={{
                click: () => setActivePin(pin),
              }}
            >
              <Popup>
                <div className="text-xs space-y-2 p-1 max-w-[260px]">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-700">
                    <span className="font-bold text-white text-sm">{pin.firstName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-phoenix-600/30 text-phoenix-300 border border-phoenix-500/30">
                      {pin.type === 'both' ? 'Prayer & Service' : pin.type}
                    </span>
                  </div>
                  <div className="text-amber-400 font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{pin.streetName}</span>
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    "{pin.description}"
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {pin.needCategories.map((catId) => {
                      const cat = NEED_CATEGORIES.find((c) => c.id === catId);
                      return cat ? (
                        <span key={catId} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                          {cat.emoji} {cat.shortLabel}
                        </span>
                      ) : null;
                    })}
                  </div>
                  <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                    Logged by {pin.loggedByRecorder} • {pin.timestamp.slice(0, 10)}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend Overlay in Map Corner */}
        <div className="absolute top-4 right-4 z-10 bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl p-3 shadow-2xl text-[11px] space-y-2 max-w-[190px] hidden sm:block">
          <div className="font-bold text-white flex items-center gap-1.5 pb-1 border-b border-slate-800">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Map Legend</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 border border-white"></span>
            <span className="text-slate-300">Prayer & Service Pin</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 border border-white"></span>
            <span className="text-slate-300">Prayer Encounter</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-sky-600 border border-white"></span>
            <span className="text-slate-300">Service Linkage</span>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-slate-800 text-[10px] text-slate-400">
            <span className="w-4 h-0.5 bg-orange-500 border-dashed"></span>
            <span>Outreach Walk Path</span>
          </div>
        </div>

        {/* Active Pin Detailed Sidebar when clicked */}
        {activePin && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-10 bg-slate-900/95 border border-phoenix-500/50 backdrop-blur-md rounded-2xl p-4 shadow-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-phoenix-600/20 text-phoenix-400 flex items-center justify-center font-bold text-xs border border-phoenix-500/40">
                  {activePin.firstName.charAt(0).toUpperCase()}
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm">{activePin.firstName}</h4>
                  <p className="text-[10px] text-amber-400">{activePin.streetName}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActivePin(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed italic">
              "{activePin.description}"
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              {activePin.needCategories.map((cId) => {
                const c = NEED_CATEGORIES.find((n) => n.id === cId);
                return c ? (
                  <span key={cId} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-amber-300 border border-amber-500/30">
                    {c.emoji} {c.label}
                  </span>
                ) : null;
              })}
            </div>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 flex items-center justify-between">
              <span>Team: {activePin.groupMembers.join(', ')}</span>
              <span>{activePin.timestamp.slice(0, 10)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Streets Covered in Chillicothe */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-phoenix-500" />
          <span>Active Chillicothe Street Coverage ({mapStats.streetsCount} Neighborhood Corridors)</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {mapStats.uniqueStreets.map((street) => (
            <span
              key={street}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-medium hover:border-slate-700 transition"
            >
              {street}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
