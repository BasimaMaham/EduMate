import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { StudyGroup } from '../App';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

type StudyGroupMapProps = {
  groups: StudyGroup[];
  onGroupSelect: (group: StudyGroup) => void;
};

export function StudyGroupMap({ groups, onGroupSelect }: StudyGroupMapProps) {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
  }, []);

  // Filter only in-person groups with coordinates
  const inPersonGroups = groups.filter(
    (group) => group.type === 'in-person' && group.coordinates
  );

  if (inPersonGroups.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground">No in-person study groups nearby</p>
          <p className="text-sm text-muted-foreground mt-2">
            Create or join an online group instead
          </p>
        </div>
      </div>
    );
  }

  if (!mapReady) {
    return (
      <div className="bg-card rounded-xl border border-border overflow-hidden h-96 flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden h-96">
      <MapContainer
        center={[31.5204, 74.3587]}
        zoom={15}
        className="h-full w-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {inPersonGroups.map((group) => {
          const coords = group.coordinates!;
          return (
            <Marker key={group.id} position={[coords.lat, coords.lng]}>
              <Popup>
                <div className="p-2 min-w-max text-sm">
                  <p className="font-semibold text-card-foreground mb-1">
                    {group.title}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {group.location}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    {group.participants.length}/{group.maxParticipants} participants
                  </p>
                  <button
                    onClick={() => onGroupSelect(group)}
                    className="w-full px-3 py-1 bg-primary text-primary-foreground text-xs rounded hover:bg-primary/90 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
