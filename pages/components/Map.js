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

    const coordinatesSet1 = [
      [-121.9552, 37.3541],
      [-121.9527, 37.3575],
      [-121.9281, 37.366],
      [-121.9123, 37.3771],
      [-122.168861, 37.42823],
    ];

    const coordinatesSet2 = [
      [-121.9552, 37.3541],
      [-122.168861, 37.42823],
    ];

    const colors = ["#EC5F5F", "#5FEC5F", "#5F5FEC", "#ECA55F", "#A55FEC"];

    if (props.economy == true || props.economy == false) {
      const selectedCoordinates = props.economy
        ? coordinatesSet1
        : coordinatesSet2;

      selectedCoordinates.forEach((coord, index) => {
        const markerColor =
          index === 0
            ? "#FF0000"
            : index === selectedCoordinates.length - 1
            ? "#0000FF"
            : "#1E90FF";
        addToMap(map, coord, markerColor);
        if (index < selectedCoordinates.length - 1) {
          const color = colors[index % colors.length];
          addRouteToMap(
            map,
            coord,
            selectedCoordinates[index + 1],
            `route-${index}`,
            color
          );
        }
      });

      if (props.pickupCoordinates && props.dropoffCoordinates) {
        map.fitBounds(
          [
            [-121.9552, 37.3541],
            [-122.143, 37.4419],
          ],
          {
            padding: 60,
          }
        );
      }
    }
  }, [props.economy]);

  const addToMap = (map, coordinates, color) => {
    new mapboxgl.Marker({ color }).setLngLat(coordinates).addTo(map);
  };

  const addRouteToMap = async (map, start, end, routeId, color) => {
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

      if (map.getSource(routeId)) {
        map.getSource(routeId).setData(geojson);
      } else {
        map.addLayer({
          id: routeId,
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
            "line-color": color,
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
