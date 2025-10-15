import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function MapView({ incidents = [] }) {
  // Coordenadas fijas por barrio (aproximadas dentro de Barcelona)
  const neighborhoodCoords = {
    "Sants-Montjuïc": [41.363, 2.149],
    "Eixample": [41.392, 2.163],
    "Les Corts": [41.385, 2.125],
    "Ciutat Vella": [41.380, 2.173],
    "Sant Martí": [41.410, 2.208],
    "Sant Andreu": [41.435, 2.190],
    "Gràcia": [41.406, 2.153],
    "Horta-Guinardó": [41.430, 2.165],
    "Sarrià-Sant Gervasi": [41.400, 2.120],
    "Nou Barris": [41.445, 2.180],
  };

  // Datos por defecto (si no llegan incidents desde props)
  const defaultIncidents = [
    { neighborhood: "Sants-Montjuïc", lastReading: 240.8, deviation: 0, status: "critical" },
    { neighborhood: "Eixample", lastReading: 210.0, deviation: 5, status: "warning" },
    { neighborhood: "Les Corts", lastReading: 190.7, deviation: 0, status: "normal" },
    { neighborhood: "Ciutat Vella", lastReading: 180.1, deviation: 12, status: "critical" },
    { neighborhood: "Sant Martí", lastReading: 165.2, deviation: 3, status: "warning" },
    { neighborhood: "Sant Andreu", lastReading: 160.0, deviation: 0, status: "normal" },
    { neighborhood: "Gràcia", lastReading: 140.5, deviation: 7, status: "warning" },
    { neighborhood: "Horta-Guinardó", lastReading: 132.6, deviation: 0, status: "normal" },
    { neighborhood: "Sarrià-Sant Gervasi", lastReading: 125.3, deviation: 2, status: "normal" },
    { neighborhood: "Nou Barris", lastReading: 110.4, deviation: 15, status: "critical" },
  ];

  const data = incidents.length ? incidents : defaultIncidents;

  const mapRef = useRef(null);
  const mapDivRef = useRef(null);
  const markersRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current && mapDivRef.current) {
      mapRef.current = L.map(mapDivRef.current).setView([41.387, 2.170], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(mapRef.current);

      markersRef.current = L.layerGroup().addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;
    markersRef.current.clearLayers();

    data.forEach((incident) => {
      const coords = neighborhoodCoords[incident.neighborhood];
      if (!coords) return; // Evita error si falta alguna coordenada

      const color =
        incident.status === 'critical'
          ? 'red'
          : incident.status === 'warning'
          ? 'orange'
          : 'green';

      const markerHtml = `
        <div style="
          background-color: ${color};
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 6px rgba(0,0,0,0.3);
        "></div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: '',
        iconSize: [18, 18],
      });

      const popupContent = `
        <strong>${incident.neighborhood}</strong><br/>
        Estat: ${incident.status}<br/>
        Consum: ${incident.lastReading} L<br/>
        Desviació: ${incident.deviation > 0 ? '+' : ''}${incident.deviation}%
      `;

      L.marker(coords, { icon: customIcon }).addTo(markersRef.current).bindPopup(popupContent);
    });
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Mapa de Barcelona</h2>
      <div ref={mapDivRef} className="h-96 w-full rounded-lg"></div>

      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-gray-600">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-600">Atenció</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">Crític</span>
        </div>
      </div>
    </div>
  );
}
