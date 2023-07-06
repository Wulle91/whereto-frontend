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


function LocationPage(message, filter = "" ) {
  const {id} = useParams();
  const [location, setLocation] = useState({ results: [] });
  const [posts, setPosts] = useState({ results: [] });
  const [relatedPosts, setRelatedPosts] = useState({ results: [] });
  const [followers, setFollowers] = useState({ results: [] });
  const { pathname } = useLocation();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredFollowers, setFilteredFollowers] = useState([]);
  const {handleFollowLocation, handleUnfollowLocation } = useSetProfileData();
  const currentUser = useCurrentUser();
 

 
  const followedNames = filteredFollowers.filter((followers) => followers.owner === currentUser.username)
  const filteredId = followedNames.map(following_id => following_id.id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: locationData },
          { data: postsData },
          { data: followData }
        ] = await Promise.all([
          axiosReq.get(`/locations/${id}`),
          axiosReq.get(`/posts/`),
          axiosReq.get(`/follow/`),
        ]);
  
        const locationResults = [locationData];
        setLocation({ results: locationResults });

  
        const postNames = postsData.results.map((post) => post);
        setRelatedPosts({ results: postNames });
  
        const locationFollowers = followData.results.map((follower) => follower);
        setFollowers({ results: locationFollowers });
  
        const filteredPosts = postNames.filter((relatedPost) =>
          relatedPost.name === locationResults[0]?.name
        );
        setFilteredPosts(filteredPosts);
  
        const filteredFollowers = locationFollowers.filter(
          (follower) => follower.follow_location === locationResults[0]?.name
        );
        setFilteredFollowers(filteredFollowers);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, handleFollowLocation, handleUnfollowLocation]);
  

  const backgroundImageStyle = {
      backgroundImage: `url(${location.results[0]?.image_url})`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      height: "400px",
      width: "100%",
      border: "12px solid transparent",
      marginBottom: "12px"
    };
    

  return (
    <Row className="h-100 ">
      <Col className="py-2 p-0 p-lg-2 py-7" style={backgroundImageStyle} lg={8}>
        <p>popula</p>
      </Col>
        {/* <Location {...location.results[0]} setLocations={setLocation} LocationPage /> */}
        <Location
              style={{ width: "100%" }}
              {...location.results[0]}
              setLocations={setLocation}
              LocationPage
              filteredPosts={filteredPosts}
              filteredFollowers={filteredFollowers}
              filteredId={filteredId}
            />
        {filteredPosts.length ? (
            <InfiniteScroll
            children={filteredPosts
              .map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))}
            dataLength={filteredPosts.length}
            loader={<Asset spinner />}
            hasMore={false}
          />
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults}  />
            </Container>
          )}
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}
  
  export default LocationPage;