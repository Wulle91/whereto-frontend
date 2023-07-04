import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Location from "./Location"

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
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
  
    return (
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" style={backgroundImageStyle} lg={8}>
          <p>Popular profiles for mobile</p>
          <Location {...location.results[0]} setLocations={setLocation} LocationPage />
          <Container className={appStyles.Content}>
            Comments
          </Container>
        </Col>
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
          Popular profiles for desktop
        </Col>
      </Row>
    );
  }
  
  export default LocationPage;