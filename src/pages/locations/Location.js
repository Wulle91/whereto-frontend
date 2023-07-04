import React from "react";
import styles from "../../styles/Locations.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../comonents/Avatar";
import { Button } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";


import { axiosRes } from "../../api/axiosDefaults";

const Location= (props) => {
  const {
    id,
    name,
    address,
    image_url,
    mobile,
    following_id,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();

//   const handleLike = async () => {
//     try {
//       const { data } = await axiosRes.post("/likes/", { post: id });
//       setPosts((prevPosts) => ({
//         ...prevPosts,
//         results: prevPosts.results.map((post) => {
//           return post.id === id
//             ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
//             : post;
//         }),
//       }));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleUnlike = async () => {
//     try {
//       await axiosRes.delete(`/likes/${like_id}/`);
//       setPosts((prevPosts) => ({
//         ...prevPosts,
//         results: prevPosts.results.map((post) => {
//           return post.id === id
//             ? { ...post, likes_count: post.likes_count - 1, like_id: null }
//             : post;
//         }),
//       }));
//     } catch (err) {
//       console.log(err);
//     }
//   };

  return (
    <Card className={styles.Post}>
      <Card.Body >
          <Link className="align-self-center" to={`/locations/${id}`}>
            <Avatar src={image_url} height={100} />
          </Link>
        {name && <Card.Title className="text-center">{name}</Card.Title>}
        {address && <Card.Text>{address}</Card.Text>}
        <div className={`text-right ${!mobile && "ml-auto"}`}>
          {following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => {}}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => {}}
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