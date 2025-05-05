import mapboxgl from "!mapbox-gl";
import { useEffect } from "react";
import tw from "tailwind-styled-components";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamVzd2FudGh2IiwiYSI6ImNtOTVneTBhNDBwZ3YybG9nbmJ5aXN0anMifQ.5jFOhci0rrXKzqM-CF5nZg";

export const Map = (props) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
      center: [-99.29011, 39.39172],
      zoom: 3,
    });

    if (props.pickupCoordinates) {
      addToMap(map, props.pickupCoordinates);
    }

    if (props.dropoffCoordinates) {
      addToMap(map, props.dropoffCoordinates);
    }

    if (props.pickupCoordinates && props.dropoffCoordinates) {
      map.fitBounds([props.pickupCoordinates, props.dropoffCoordinates], {
        padding: 60,
      });

      addRouteToMap(map, props.pickupCoordinates, props.dropoffCoordinates);
    }
  }, [props.pickupCoordinates, props.dropoffCoordinates]);

  const addToMap = (map, coordinates) => {
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  };

  const addRouteToMap = async (map, start, end) => {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
    );
    const data = await query.json();

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0].geometry.coordinates;

      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };

      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
      } else {
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#EC5F5F",
            "line-width": 5,
          },
        });
      }
    } else {
      console.error("No routes found in the API response.");
    }
  };

  return <Wrapper id="map"></Wrapper>;
};

export default Map;

const Wrapper = tw.div`
    flex-1 h-1/2
`;
