import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import styles from "../styles/Map.module.css";


const MyMapApp = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  return (
    <div className={styles.App}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap 
          mapContainerClassName={styles.mapcontainer}
          center={center}
          zoom={10}>
          <Marker position={center} />
        </GoogleMap>  
      )}
    </div>
  );
};

export default MyMapApp;