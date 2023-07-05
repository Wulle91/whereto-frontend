// LocationDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function LocationDetailPage() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [locationPosts, setLocationPosts] = useState([]);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const response = await axios.get(`/locations/${id}/`);
        setLocation(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPostsByLocation = async () => {
      try {
        const response = await axios.get(`/locations/${id}/posts/`);
        setLocationPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLocationDetails();
    fetchPostsByLocation();
  }, [id]);

  if (!location) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{location.name}</h1>
      <p>Address: {location.address}</p>

      <h2>Posts:</h2>
      {locationPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default LocationDetailPage;
