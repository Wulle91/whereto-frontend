import React from "react";
import styles from "../../styles/Locations.module.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../comonents/Avatar";
import { Button } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PopularLocations from "./PopularLocations";
import { useSetProfileData } from "../../contexts/ProfileDataContext";


const Location = (props) => {
  const {
    id,
    name,
    address,
    image_url,
    mobile,
    filteredFollowers,
    is_following,
    filteredPosts,
    showButton = true,
    distance,
  } = props;

  const { handleFollowLocation, handleUnfollowLocation } = useSetProfileData();

  const renderFollowButton = () => {
    if (showButton) {
      if (is_following) {
        return (
          <Button
            className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
            onClick={() => handleUnfollowLocation(props)}
          >
            Unfollow
          </Button>
        );
      } else {
        return (
          <Button
            className={`${btnStyles.Button} ${btnStyles.Black}`}
            onClick={() => handleFollowLocation(props)}
          >
            Follow
          </Button>
        );
      }
    }
    return null;
  };


  return (
  
        <Card className={styles.Post}>
          <Card.Body >
            <Link className="align-self-center" to={`/locations/${id}`}>
              <Avatar src={image_url} height={100} />
            </Link>
            {name && <Card.Title className="text-center">{name}</Card.Title>}
            {address && <Card.Text>{address}</Card.Text>}
            {filteredPosts && (
              <Row className="justify-content-center no-gutters">
                <Col xs={3} className="my-2">
                  <div>{filteredPosts.length}</div>
                  <div>posts</div>
                </Col>
                <Col xs={3} className="my-2">
                  <div>{filteredFollowers.length}</div>
                  <div>followers</div>
                </Col>
              </Row>
            )}
            {distance &&<span>{`Distance ${distance}m`}</span>}
            <div className={`text-right ${!mobile && "ml-auto"}`}>
            {renderFollowButton()} 
            </div>
          </Card.Body>
        </Card>
   
  );
};

export default Location;