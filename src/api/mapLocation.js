import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import styles from "../styles/Map.module.css";



const MyMapApp = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBmL-44Kf_8U00-Og2iLESQZed6Wgs_H-8',
  });
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  navigator.geolocation.getCurrentPosition(function(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  return (
    <div className={styles.App}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap 
          mapContainerClassName={styles.mapcontainer}
          center={{ lat: latitude, lng: longitude}}
          zoom={10}>
          <Marker position={{ lat: latitude, lng: longitude}} />
          <Marker position={{ lat: 48.532135, lng: 9.27781}} />
        </GoogleMap>  
      )}
    </div>
  );
};

export default MyMapApp;