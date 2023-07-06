import { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { axiosReq } from "../api/axiosDefaults";



function MyMapComponent({ location }) {
    const locations = location
    const google = window.google = window.google ? window.google : {};
    const mapRef = useRef(null);
    const geocoderRef = useRef(null);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    console.log(location);
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  
    useEffect(() => {
      if (latitude !== undefined && longitude !== undefined) {
        const timer = setTimeout(() => {
          initializeMap();
        }, 1000); // Adjust the delay time as per your requirement
  
        return () => clearTimeout(timer);
      }
    }, [latitude, longitude]);
  
    function initializeMap() {
      const latlng = new window.google.maps.LatLng(latitude, longitude);
      const mapOptions = {
        zoom: 8,
        center: latlng
      };
  
      const mapElement = document.getElementById("map");
      mapRef.current = new window.google.maps.Map(mapElement, mapOptions);
      geocoderRef.current = new window.google.maps.Geocoder();
  
      locations.forEach((address) => {
        geocoderRef.current.geocode({ address }, function (results, status) {
          if (status === "OK") {
            const marker = new window.google.maps.Marker({
              map: mapRef.current,
              position: results[0].geometry.location
            });
          } else {
            console.log(`Geocode was not successful for the following reason: ${status}`);
          }
        });
      });
    }
  
    return (
      <div>
        <div id="map" style={{ width: "100%", height: "350px" }}></div>
      </div>
    );
  }
  
  export default MyMapComponent;