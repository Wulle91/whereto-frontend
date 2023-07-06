import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Avatar from "../../comonents/Avatar";
import Location from "./Location";
import Asset from "../../comonents/Asset";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "../posts/Post";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function LocationsFollowed({ message, filter = "" }) {
  const [location, setLocations] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [locationPosts, setLocationPosts] = useState({ results: [] });
  const { pathname } = useLocation();
    const { id } = useParams();
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        
        const { data } = await axiosReq.get(`/locations/`);
        setLocations(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchLocations();
      const filteredLocations = location.filter((loc) => loc.is_following === true);

    console.log(filteredLocations)
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
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
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default LocationsFollowed;