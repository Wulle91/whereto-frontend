import React, { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Location from "./Location";
import Asset from "../../comonents/Asset";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import MyMapComponent from "../../api/googleGeolocator";
import PopularLocations from "./PopularLocations";




function LocationsPage({ message, filter = "" }) {
  const [location, setLocations] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [locationPosts, setLocationPosts] = useState({ results: [] });
  const [locationsNames, setLocationsNames] = useState()
  const { pathname } = useLocation();
   const { id } = useParams();
  const [query, setQuery] = useState("");
  const [distances, setDistances] = useState();
  const [locationsArray, setLocationsArray] = useState()
  const [count, setCount] = useState(0)
  


  const fetchLocations = async () => {
    try {
      
      const { data } = await axiosReq.get(`/locations/`);
      setLocations(data);
      const locationNames = data.results.map((locatio) => locatio)
      setLocationsArray(locationNames)
      const locNames = locationNames.map((loc) => loc.address)
      setLocationsNames(locNames)
      setHasLoaded(true);
      
      console.log('here')
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (location.results.length === 0) {
      setHasLoaded(false);
      fetchLocations();
    }  
  }, [location]);
  

  const handleDistancesChange = (newDistances) => {
    const newDistancesArray = newDistances.map((distance) => ({ ...distance }));
    setDistances(newDistancesArray);
  };

  console.log(locationsArray)
  console.log(distances)

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularLocations mobile />
        <MyMapComponent location={locationsNames} onDistanceChange={handleDistancesChange} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>
        
        {hasLoaded ? (
          <>
            {location.results.length ? (
              <InfiniteScroll
                children={location.results.map((location) => (
                    <Link to={`/locations/${location.id}`} key={location.id}>
                        <Location key={location.id} {...location} setloctions={setLocations} />
                    </Link>  
                ))}
                dataLength={location.results.length}
                loader={<Asset spinner />}
                hasMore={!!location.next}
                next={() => fetchMoreData(location, setLocations)}
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