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

function LocationPage(message, filter = "" ) {
  const {id} = useParams();
  const [location, setLocation] = useState({ results: [] });
  const [posts, setPosts] = useState({ results: [] });
  const [relatedPosts, setRelatedPosts] = useState({ results: [] });
  const { pathname } = useLocation();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: locationData }, { data: postsData }] = await Promise.all([
          axiosReq.get(`/locations/${id}`),
          axiosReq.get(`/posts/`)
        ]);
        setLocation({ results: [locationData] });
        const postNames = postsData.results.map((post) => post);
        console.log(postNames)
        setRelatedPosts({ results: postNames })
        
      
        console.log(relatedPosts)
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchData();
    
  }, [id]);

  console.log(relatedPosts)
  useEffect(() => {
  
      const filtered = relatedPosts.results.map((relatedPost) => ({ ...relatedPost })) // Create a shallow copy of each post object
        .filter((relatedPost) => relatedPost.name === location.results[0]?.name);
      console.log(filtered)
      setFilteredPosts(filtered);
      
    
  }, [location, posts]);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: location }] = await Promise.all([
          axiosReq.get(`/locations/${id}`)
        ])
        setLocation({results: [location]})
        console.log(location.name)
      } catch (err) {
        console.log(err);
      }
    };

    // setHasLoaded(false);
    // const timer = setTimeout(() => {
    //   fetchPosts();
    // }, 1000);

    // return () => {
    //   clearTimeout(timer);
    // };
    handleMount()
  }, [id]);

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