import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LeafLetMap = ({ property }) => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const fetchCoords = async () => {
      const queries = [
        `${property.tole}, ${property.municipality}, ${property.district}, Nepal`,
        `${property.municipality}, ${property.district}, Nepal`,
        `${property.district}, Nepal`
      ];

      for (const query of queries) {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
          );
          const data = await res.json();
          if (data && data.length > 0) {
            setCoords({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) });
            return; // Exit loop once found
          }
        } catch (e) { console.error("Geocoding error", e); }
      }
    };

    if (property) fetchCoords();
  }, [property]);

  if (!coords) {
    return (
      <div className="h-112.5 flex items-center justify-center bg-slate-100 text-slate-400 font-black italic">
        MAP DATA UNAVAILABLE
      </div>
    );
  }

  return (
    <MapContainer
      center={[coords.lat, coords.lon]}
      zoom={15}
      style={{ height: "450px", width: "100%" }}
      scrollWheelZoom={false} // Better for UX inside a scrollable page
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[coords.lat, coords.lon]}>
        <Popup>
          <strong className="text-indigo-600">{property.title}</strong>
          <p className="m-0 text-xs text-slate-500">{property.tole}</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafLetMap;