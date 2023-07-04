import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Location from "./Location"

import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../comonents/Asset";
import { fetchMoreData } from "../../utils/utils";

function LocationPage() {
    const {id} = useParams();
    const [location, setLocation] = useState({ results: [] });
  
    useEffect(() => {
      const handleMount = async () => {
        try {
          const [{ data: location }] = await Promise.all([
            axiosReq.get(`/locations/${id}`)
          ])
          setLocation({results: [location]})
          console.log(location)
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
        marginBottom: "12px",
      };
      
  
    return (
      <Row className="h-100 ">
        <Col className="py-2 p-0 p-lg-2 py-7" style={backgroundImageStyle} lg={8}>
          <p>popula</p>
        </Col>
          {/* <Location {...location.results[0]} setLocations={setLocation} LocationPage /> */}
          <InfiniteScroll
            children={location.results.map((loc) => (
              <Location
                style={{ width: "100%" }}
                {...location.results[0]}
                setLocations={setLocation}
                LocationPage
              />
            ))}
            dataLength={location.results.length}
            loader={<Asset spinner />}
            hasMore={!!location.next}
            next={() => fetchMoreData(location, setLocation)}
          />
          
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
          Popular profiles for desktop
        </Col>
      </Row>
    );
  }
  
  export default LocationPage;