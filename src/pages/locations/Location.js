import React from "react";
import styles from "../../styles/Locations.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../comonents/Avatar";
import { Button } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


import { axiosRes } from "../../api/axiosDefaults";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import { useState } from "react";

const Location= (props) => {
  const {
    id,
    name,
    address,
    image_url,
    mobile,
    following_id,
    filteredFollowers,
    is_following,
    filteredPosts,
    filteredId,
  } = props;
  
  const currentUser = useCurrentUser();
  const {handleFollowLocation, handleUnfollowLocation } = useSetProfileData();


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
        <div className={`text-right ${!mobile && "ml-auto"}`}>
          {is_following ? (
            
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => {handleUnfollowLocation(props)}}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => {handleFollowLocation(props)}}
            >
              
              follow
            </Button>
          )}
          </div>
      </Card.Body>
    </Card>
  );
};

export default Location;