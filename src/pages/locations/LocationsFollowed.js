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


function LocationsFollowed(message, filter = "") {
  const { id } = useParams();
  const [location, setLocation] = useState({ results: [] });
  const [allLocations, setAllLocation] = useState();
  const [posts, setPosts] = useState({ results: [] });
  const [relatedPosts, setRelatedPosts] = useState({ results: [] });
  const [followers, setFollowers] = useState({ results: [] });
  const { pathname } = useLocation();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filtFollowers, setFiltFollowers] = useState([]);
  const [currentUserFollowedLocations, setCurrentUserFollowedLocations] = useState([]);
  const { handleFollowLocation, handleUnfollowLocation } = useSetProfileData();
  const currentUser = useCurrentUser();
  const followedNames = filtFollowers.filter((followers) => followers.owner === currentUser.username)
  const filteredId = followedNames.map(following_id => following_id.id);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: locationData },
          { data: postsData },
          { data: followData }
        ] = await Promise.all([
          axiosReq.get(`/locations/`),
          axiosReq.get(`/posts/`),
          axiosReq.get(`/follow/`),
        ]);

        const locationResults = [locationData];
        setLocation({ results: locationResults });
        const locationsList = locationData.results.map((loc) => loc)
        setAllLocation(locationsList)
        console.log(allLocations)
        const postNames = postsData.results.map((post) => post);
        setRelatedPosts({ results: postNames });

        const locationFollowers = followData.results.map((follower) => follower);
        setFollowers({ results: locationFollowers });

        const filteredPosts = postNames.filter((relatedPost) =>
          relatedPost.name === locationResults[0]?.name
        );
        setFilteredPosts(filteredPosts);

        const filteredFollowers = locationFollowers.filter(
          (follower) => follower.follow_location === locationResults[0]?.owner
        );
        setFiltFollowers(filteredFollowers);
        console.log(filtFollowers)
        const filterFollow = followData.results
          .filter((follower) => follower.owner === currentUser.username)
          .map((follower) => follower.follow_location);
        setCurrentUserFollowedLocations(filterFollow);
        console.log(currentUserFollowedLocations)
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {hasLoaded ? (
          <>
            {location.results.length ? (
              <InfiniteScroll
                children={allLocations
                  .filter((locations) => currentUserFollowedLocations.includes(locations.name))
                  .map((locatio) => (
                    <Link to={`/locations/${locatio.id}`} key={locatio.id}>
                      <Location key={locatio.id} {...locatio} setLocations={setLocation} />
                    </Link>
                  ))}
                dataLength={location.results.length}
                loader={<Asset spinner />}
                hasMore={!!location.next}
                next={() => fetchMoreData(location, setLocation)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message="No results found." />
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