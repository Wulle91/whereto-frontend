import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import NoResults from "../../assets/no-results.png";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Location from "./Location"
import Post from "../posts/Post"
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../comonents/Asset";
import { fetchMoreData } from "../../utils/utils";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import PopularLocations from "./PopularLocations";



function LocationsFollowed({ message }) {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [location, setLocation] = useState();
  const [myLocations, setMyLocations] = useState();
  const { pathname } = useLocation();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const { handleFollowLocation, handleUnfollowLocation } = useSetProfileData();

  const fetchData = async () => {
    try {
      const [
        { data: locationData },
        { data: postsData },
        { data: followData },
      ] = await Promise.all([
        axiosReq.get(`/locations/`),
        axiosReq.get(`/posts/`),
        axiosReq.get(`/follow/`),
      ]);
      setHasLoaded(true);
      const locationResults = [locationData];
      setLocation(locationData);
      const postNames = postsData.results.map((post) => post);
      const locationFollowers = followData.results.map((follower) => follower);
      setMyLocations(
        locationData.results.filter((loc) =>
          followData.results
            .filter((follower) => follower.owner === currentUser?.username)
            .some((follower) => follower.follow_location === loc.name)
        )
      );
      setHasLoaded(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 2000); // Set the desired delay in milliseconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      <PopularLocations mobile />
        {myLocations && !hasLoaded ? (
          <>
            {myLocations.length ? (
              <InfiniteScroll
                children={myLocations.map((location) => (
                  <Location
                    key={location.id}
                    {...location}
                    setMyLocations={setLocation}
                    handleUnfollowLocation={handleUnfollowLocation}
                    showButton={false}
                  >
                    <Link to={`/locations/${location.id}`}>
                      <img src={location.imageUrl} alt={location.name} />
                    </Link>
                    
                  </Location>
                ))}
                dataLength={myLocations.length}
                loader={<Asset spinner />}
                hasMore={!!location.next}
                next={() => fetchMoreData(location, setLocation)}
              />
            ) : (
              <Container className={appStyles.Content}>
                {showSpinner ? (
                  <Asset spinner />
                ) : (
                  <Asset src={NoResults} message={message} />
                )}
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

export default LocationsFollowed;