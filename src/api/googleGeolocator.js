import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import styles from "../styles/Asset.module.css";

function MyMapComponent({ latitude, longitude, markers}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBmL-44Kf_8U00-Og2iLESQZed6Wgs_H-8',
  });

  return (
    <div style={{ height: '400px', width: '100%' }}>
      {!isLoaded ? (
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
    </div>
  );
}

export default MyMapComponent;