import React from "react";
import { geocode } from "geolib";

function AddressToCoordinates({ address }) {
  const coordinates = geocode(address);

  return (
    <div>
      Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
    </div>
  );
}

export default AddressToCoordinates;