import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/imageSlider.css";

const ImageSlider = ({ data, settings }) => {
  if (data) {
    return (
      <div className="slider">
        <Slider {...settings}>
          {data.map(({ src, alt }, index) => {
            return (
              <div key={index}>
                <img src={src} alt={alt} />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
  return null;
};

export default ImageSlider;
