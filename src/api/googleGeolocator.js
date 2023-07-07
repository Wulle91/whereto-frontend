
import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import styles from "../styles/Asset.module.css";
import axios from 'axios';

function MyMapComponent({ location }) {
    const locations = location;
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [markers, setMarkers] = useState([]);
    const [loaded, setLoaded] = useState(false);
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
        locations.map((address) => {
          axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
              params: {
                address: address,
                key: 'AIzaSyBmL-44Kf_8U00-Og2iLESQZed6Wgs_H-8',
              },
              withCredentials: false,
          })
          .then((response) => {
              const { lat, lng } = response.data.results[0].geometry.location;
              tempMarkers.push({ lat: lat, lng: lng });
          })
        });
      }
      locations && tempMarkers.length === locations.length && setLoaded(true);
      setMarkers(tempMarkers);
    }, [locations])
  
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
            { markers.length && markers.map(({ lat, lng }, index) => {
              return <Marker key={index} position={{ lat: Number(lat), lng: Number(lng) }} />
            })}
          </GoogleMap>
        )}
      </div>
    );
  }
  
  export default MyMapComponent;