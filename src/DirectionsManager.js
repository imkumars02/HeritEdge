import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

const DirectionsManager = ({ userLocation, selectedNode }) => {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !selectedNode) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(selectedNode.coords[0], selectedNode.coords[1]),
      ],
      routeWhileDragging: true,
      showAlternatives: true,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }],
      },
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, userLocation, selectedNode]);

  return null;
};

export default DirectionsManager;
