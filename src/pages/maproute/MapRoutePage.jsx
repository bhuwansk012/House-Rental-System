import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { getPropertyById } from "../../service/publicService";
import { toast } from "react-toastify";

// Reliable Marker Icons
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const propertyIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Routing = ({ userPos, propertyPos }) => {
  const map = useMap();

  useEffect(() => {
    if (!userPos || !propertyPos) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userPos.lat, userPos.lon),
        L.latLng(propertyPos.lat, propertyPos.lon),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      show: true, // Shows the turn-by-turn instructions
      lineOptions: {
        styles: [{ color: "#6366f1", weight: 6 }],
      },
      createMarker: () => null, // We use our own custom Markers below
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [userPos, propertyPos, map]);

  return null;
};

const MapRoutePage = () => {
  const { id } = useParams();
  const [propertyPos, setPropertyPos] = useState(null);
  const [userPos, setUserPos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getPropertyById(id);
        const { tole, municipality, district } = res.data;

        // --- IMPROVED GEOCODING FALLBACK ---
        const queries = [
          `${tole}, ${municipality}, ${district}, Nepal`,
          `${municipality}, ${district}, Nepal`,
          `${district}, Nepal`
        ];

        let foundPos = null;
        for (const query of queries) {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
          );
          const data = await geoRes.json();
          if (data && data.length > 0) {
            foundPos = { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
            break;
          }
        }

        if (foundPos) setPropertyPos(foundPos);
        else toast.error("Property location not found on map.");

        // --- GEOLOCATION WITH ERROR HANDLING ---
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setUserPos({ lat: pos.coords.latitude, lon: pos.coords.longitude });
              setLoading(false);
            },
            (err) => {
              console.error(err);
              toast.warn("Location denied. Defaulting to Kathmandu.");
              setUserPos({ lat: 27.7172, lon: 85.3240 }); // Fallback center
              setLoading(false);
            }
          );
        }
      } catch (error) {
        toast.error("Error loading navigation details.");
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading || !propertyPos || !userPos) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 font-bold text-indigo-600 animate-pulse">
        Initializing GPS & Route...
      </div>
    );
  }

  return (
    <MapContainer
      center={[propertyPos.lat, propertyPos.lon]}
      zoom={14}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[userPos.lat, userPos.lon]} icon={userIcon} />
      <Marker position={[propertyPos.lat, propertyPos.lon]} icon={propertyIcon} />
      <Routing userPos={userPos} propertyPos={propertyPos} />
    </MapContainer>
  );
};

export default MapRoutePage;