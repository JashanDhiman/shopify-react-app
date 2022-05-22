import React from "react";
//import { useState } from "react";
import { Rating } from "react-simple-star-rating";

const StarRating = ({ rating }) => {
  //const [rating, setRating] = useState(0);

  //const handleRating = (rate: 4) => {
  //  setRating(rate);
  //};

  return (
    <span className="App">
      <Rating
        readonly={true}
        initialValue={rating}
        fillColor="#57b894"
        size="20"
      />
    </span>
  );
};
export default StarRating;
