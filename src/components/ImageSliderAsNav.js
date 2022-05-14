import React, { useState } from "react";

import Slider from "react-slick";

const ImageSliderAsNav = ({ data, settings }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  return (
    <div className="sliderMainDiv">
      <Slider
        asNavFor={nav2}
        arrows={false}
        fade={true}
        ref={(slider) => setNav1(slider)}
      >
        {data.map(({ h3, p }, index) => {
          return (
            <div key={index} className="content-div">
              <h3 className="title">{h3}</h3>
              <p className="desc">{p}</p>
              <a className="link" href="#id">
                LEARN MORE
              </a>
            </div>
          );
        })}
      </Slider>
      <Slider {...settings} asNavFor={nav1} ref={(slider) => setNav2(slider)}>
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
};

export default ImageSliderAsNav;
