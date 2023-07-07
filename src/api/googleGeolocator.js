import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import styles from "../styles/Asset.module.css";
import axios from 'axios';
import haversine from 'haversine-distance';

function MyMapComponent({ location, onDistanceChange}) {
  const locations = location;
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [distances, setDistances] = useState([]);
  const tempMarkers = [];

  navigator.geolocation.getCurrentPosition(function (position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBmL-44Kf_8U00-Og2iLESQZed6Wgs_H-8',
  });

  React.useEffect(() => {
    if (locations && locations.length) {
      const tempDistances = [];
      Promise.all(
        locations.map((address) =>
          axios
            .get('https://maps.googleapis.com/maps/api/geocode/json', {
              params: {
                address: address,
                key: 'AIzaSyBmL-44Kf_8U00-Og2iLESQZed6Wgs_H-8',
              },
              withCredentials: false,
            })
            .then((response) => {
              const { lat, lng } = response.data.results[0].geometry.location;
              tempMarkers.push({ lat: lat, lng: lng });
              const distance = haversine(
                { latitude: Number(latitude), longitude: Number(longitude) },
                { latitude: lat, longitude: lng }
              );
              const roundedDistance = Math.ceil(distance);
              tempDistances.push({ address: address, distance: roundedDistance });
            })
        )
      ).then(() => {
        setLoaded(true);
        setMarkers(tempMarkers);
        onDistanceChange(tempDistances);
      });
    }
  }, [locations, latitude, longitude]);


  return (
    <div style={{ height: '400px', width: '100%' }}>
      {(!isLoaded && !loaded) ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName={styles.mapContainer}
          center={{ lat: Number(latitude), lng: Number(longitude) }}
          zoom={10}
        >
          <Marker position={{ lat: Number(latitude), lng: Number(longitude) }} />
          {markers.length && markers.map(({ lat, lng }, index) => {
            return <Marker key={index} position={{ lat: Number(lat), lng: Number(lng) }} />
          })}
        </GoogleMap>
      )}
      {/* {distances.length && (
        <ul>
          {distances.map((distance, index) => (
            <li key={index}>{`Distance ${index + 1}: ${distance} meters`}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default MyMapComponent;