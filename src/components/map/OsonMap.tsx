import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Sparkles, Building2 } from 'lucide-react';
import { LocationItem } from '../../types';
import { OsonStorageService } from '../../services/storage';
import L from 'leaflet';

export const OsonMap: React.FC = () => {
  const locations = OsonStorageService.getLocations();
  const [selectedLocation, setSelectedLocation] = useState<LocationItem>(locations[0]);
  
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Avoid re-initialization if map already exists
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([41.311081, 69.279737], 12);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Custom Leaflet icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="background: linear-gradient(135deg, #4f46e5, #ec4899); width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; box-shadow: 0 0 15px rgba(99,102,241,0.6); border: 2px solid white;">🚀</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      // Add markers
      locations.forEach(loc => {
        const marker = L.marker([loc.latitude, loc.longitude], { icon: customIcon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family: sans-serif; font-size: 13px; color: #0f172a; padding: 4px;">
            <strong style="color: #4f46e5; font-size: 14px;">${loc.name}</strong><br/>
            <span style="color: #64748b; font-size: 11px;">${loc.address}</span><br/>
            <span style="color: #059669; font-weight: bold; font-size: 11px;">${loc.contact}</span>
          </div>
        `);

        marker.on('click', () => {
          setSelectedLocation(loc);
        });
      });
    }

    return () => {
      // Keep map alive or cleanup
    };
  }, [locations]);

  const handleFocusLocation = (loc: LocationItem) => {
    setSelectedLocation(loc);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([loc.latitude, loc.longitude], 14, { duration: 1.5 });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold">
          <MapPin className="w-3.5 h-3.5" />
          <span>OSON Offline Markazlari</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
          OSON Shahar Filiallari & Speaking Hublar
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Toshkent va Samarqand shaharlaridagi zamonaviy OSON o‘quv markazlariga tashrif buyuring, Speaking Clublar va imtihonlarga qatnashing.
        </p>
      </div>

      {/* Main Map & Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Map Viewer */}
        <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-slate-800 h-[480px] shadow-2xl relative">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

        {/* Right: Selected Location Detail Card */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="h-40 rounded-2xl overflow-hidden relative">
              <img
                src={selectedLocation.image}
                alt={selectedLocation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-emerald-400 text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Ochiq
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-white font-['Outfit']">
                {selectedLocation.name}
              </h3>
              <div className="flex items-start gap-2 text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{selectedLocation.address}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{selectedLocation.working_hours}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-bold">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{selectedLocation.contact}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
              {selectedLocation.description}
            </p>

            {/* Available courses badges */}
            <div>
              <div className="text-[11px] font-bold uppercase text-slate-400 mb-2">Mavjud yo‘nalishlar:</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedLocation.available_courses.map((c, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-bold text-indigo-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={`https://maps.google.com/?q=${selectedLocation.latitude},${selectedLocation.longitude}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition"
            >
              <Navigation className="w-4 h-4" /> Google Maps orqali marshrut
            </a>
          </div>

          {/* Quick list of other branches */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Barcha filiallar ({locations.length})
            </span>
            <div className="space-y-2">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleFocusLocation(loc)}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                    selectedLocation.id === loc.id
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-white font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span className="line-clamp-1">{loc.name}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 shrink-0">Ko‘rish</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
