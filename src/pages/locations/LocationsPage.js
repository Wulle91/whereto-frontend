import React, { useEffect, useState } from "react";
import haversine from 'haversine-distance';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Location from "./Location";
import Asset from "../../comonents/Asset";
import { Link } from "react-router-dom";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import MyMapComponent from "../../api/googleGeolocator";
import PopularLocations from "./PopularLocations";

import axios from 'axios';

function LocationsPage({ message, filter = "" }) {
  const [locations, setLocations] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [distances, setDistances] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [markers, setMarkers] = useState([]);


  const fetchLocations = async () => {
    
    try {
      const tempDistances = [];
      const tempMarkers = [];
  
      axiosReq.get(`/locations/`).then(response => {
        setLocations(response.data);
        Promise.all(response.data.results.map(location =>
          axios
            .get('https://maps.googleapis.com/maps/api/geocode/json', {
              params: {
                address: location.address,
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
              tempDistances.push({ ...location, distance: roundedDistance });
            })
        )).then(() => {
          setDistances(tempDistances.sort((a, b) => a.distance - b.distance));
        });
      }).finally(() => {
        setMarkers(tempMarkers);
        setHasLoaded(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (latitude === 0 || longitude === 0) {
      navigator.geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
    if (locations.results.length === 0 && latitude !== 0 && longitude !== 0) {
      setHasLoaded(false);
      fetchLocations();
      
    }  
  }, [locations, latitude, longitude]);
  
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      <PopularLocations mobile />
        {hasLoaded && <MyMapComponent className={styles.Mao} latitude={latitude} longitude={longitude} markers={markers} />}
        
        {hasLoaded ? (
          <>
            {distances.length ? (
              <InfiniteScroll
                children={distances.map((location) => (
                    <Link to={`/locations/${location.id}`} key={location.id}>
                        <Location key={location.id} {...location} setloctions={setLocations} showButton={false}/>
                    </Link>  
              ))}
                dataLength={distances.length}
                loader={<Asset spinner />}
                hasMore={!!locations.next}
                next={() => fetchMoreData(locations, setLocations)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
      <PopularLocations />
      </Col>
      
    </Row>
  );
}

export default LocationsPage;