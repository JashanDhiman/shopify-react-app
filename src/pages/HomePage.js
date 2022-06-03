import React, { useContext, useEffect } from "react";
import CollectionSlider from "../components/CollectionSlider";
import ImageSlider from "../components/ImageSlider";
import ImageSliderAsNav from "../components/ImageSliderAsNav";
//import { Link } from "react-router-dom";
//import Loading from "../components/Loading";
import { ShopContext } from "../contexts/ShopContext";
import "../styles/homepage.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Layout from "../components/Layout";

const HomePage = () => {
  const { productsList, fetchAll } = useContext(ShopContext);
  //const { productsList, addItemToCart, isAdding, fetchAll } =
  //  useContext(ShopContext);
  /*eslint-disable */
  useEffect(() => {
    fetchAll();
  }, []);
  /*eslint-enable */
  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <FaAngleLeft />
      </div>
    );
  };
  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <FaAngleRight />
      </div>
    );
  };
  const imageSlider1Data = [
    {
      src: "https://cdn.shopify.com/s/files/1/1380/2059/files/Summer-Sale.jpg?v=1649830354",
      alt: "Summer Sale",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/1380/2059/files/trending.jpg?v=1643871182",
      alt: "Microgreen kit",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/1380/2059/files/green.jpg?v=1643871182",
      alt: "Seed Kits",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/1380/2059/files/Gardening.jpg?v=1643696654",
      alt: "Gardening Supplies",
    },
  ];
  const imageSlider1Settings = {
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const imageSlider2Settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const collectionSlider1Settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    speed: 500,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const collectionSlider2Settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    speed: 500,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const imageSlider2Data = [
    {
      src: "//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/Feat_Image-Winter.jpg?v=38306313702620041851632138889",
      alt: "Winter Vegetables",
      h3: "Start Planning your Terrace Garden Today",
      p: "The Easy Checklist for Home Gardeners",
    },
    {
      src: "//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/new_blog_slide.jpg?v=53909414955417045321610950624",
      alt: "Home Garden",
      h3: "How To Buy Seeds Online",
      p: "Choose Seeds That Are Right Your Garden",
    },
    {
      src: "//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/online_seeds.jpg?v=95929064584807887831631163482",
      alt: "Buy Seeds Online",
      h3: "Winter Vegetables",
      p: "Find Best Vegetables To Grow In Winter",
    },
  ];
  return (
    <Layout showFooter={true} showHeader={true} showCart={true}>
      <div className="homePage">
        <div className="layout_center">
          <ImageSlider
            data={imageSlider1Data}
            settings={imageSlider1Settings}
          />
        </div>
        <div className="layout_center">
          <div className="seed_slider-cont" role="toolbar">
            <h2 className="bestSellers h1">
              BUY SEEDS FOR A MICROGREEN GARDEN
            </h2>
            <h4 className="coll_desc" style={{ textAlign: "center" }}>
              <span>Now Is The Time To Grow Your Own Superfood</span>
            </h4>
            <div className="sliderOut">
              <CollectionSlider
                data={productsList}
                settings={collectionSlider1Settings}
              />
            </div>
          </div>
        </div>
        <div className="layout_center">
          <ImageSliderAsNav
            data={imageSlider2Data}
            settings={imageSlider2Settings}
          />
        </div>
        <div className="layout_center">
          <div className="seed_slider">
            <h2>What's New At AllThatGrows</h2>
            <h4 className="coll_desc" style={{ textAlign: "center" }}>
              Find Everything you need for a thriving home garden
            </h4>
            <div className="sliderOut">
              <CollectionSlider
                data={productsList}
                settings={collectionSlider2Settings}
              />
            </div>
          </div>
        </div>
        <div
          id="shopify-section-testimonials"
          className="shopify-section index-section cb-testimonials"
        >
          <div className="layout_center">
            <h2>Testimonials</h2>
            <div
              className="cb-testimonial-blocks slick-initialized slick-slider"
              role="toolbar"
            >
              <div aria-live="polite" className="slick-list draggable">
                <div
                  className="slick-track"
                  style={{
                    opacity: "1",
                    width: "1182px",
                    transform: "translate3d(0px, 0px, 0px)",
                  }}
                  role="listbox"
                >
                  <div
                    className="cb-testimonial-block-item slick-slide slick-current slick-active"
                    style={{ width: "394px" }}
                    tabIndex="-1"
                    aria-describedby="slick-slide00"
                    data-slick-index="0"
                    aria-hidden="false"
                  >
                    <div className="cb-testimonial-rate">
                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>

                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>

                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>

                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>

                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>
                    </div>
                    <p>
                      Good Seller. Seeds haven't sow yet but buying experience
                      was satisfactory. Delievery and response was perfect. No
                      regret and hoping that plant come out when I saw it.
                    </p>
                    <div className="cb-testimonial-user">
                      <img
                        src="//cdn.shopify.com/s/files/1/1380/2059/files/unnamed_130x130.webp?v=1653630575"
                        alt="review"
                      />
                      <h3>Gautam Johar</h3>
                    </div>
                  </div>
                  <div
                    className="cb-testimonial-block-item slick-slide slick-active"
                    style={{ width: "394px" }}
                    tabIndex="-1"
                    aria-describedby="slick-slide01"
                    data-slick-index="1"
                    aria-hidden="false"
                  >
                    <div className="cb-testimonial-rate">
                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>

                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>

                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>

                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>

                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>
                    </div>
                    <p>
                      I have been ordering from them since last year. Mostly,
                      seeds germinate but there are some which doesn't. But it's
                      due to temperature etc.
                    </p>
                    <div className="cb-testimonial-user">
                      <img
                        src="//cdn.shopify.com/s/files/1/1380/2059/files/AOh14GgUYj-pru1I1PcM_HpeFxDK2keHeojZTtdh5kgo_s50-k-rwu-cc_1_130x130.png?v=1653393181"
                        alt="review"
                      />
                      <h3>Riya Mitra</h3>
                    </div>
                  </div>
                  <div
                    className="cb-testimonial-block-item slick-slide slick-active"
                    style={{ width: "394px" }}
                    tabIndex="-1"
                    aria-describedby="slick-slide02"
                    data-slick-index="2"
                    aria-hidden="false"
                  >
                    <div className="cb-testimonial-rate">
                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>

                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>

                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>

                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>

                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36051 11.4538L2.81187 14L3.82762 8.88705L0 5.34771L5.1768 4.73374L7.36051 0L9.54422 4.73374L14.721 5.34771L10.8934 8.88705L11.9092 14L7.36051 11.4538Z"
                          fill="#2EA380"
                        ></path>
                      </svg>
                    </div>
                    <p>
                      Good product and they sent extra samples with the product
                      , fully satisfied didnot expect
                    </p>
                    <div className="cb-testimonial-user">
                      <img
                        src="//cdn.shopify.com/s/files/1/1380/2059/files/unnamed_1_130x130.webp?v=1653631242"
                        alt="review"
                      />
                      <h3>Jagirdar Chandrakanth</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="https://customerreviews.google.com/v/merchant?q=allthatgrows.in&amp;c=IN&amp;v=17&amp;hl=en"
              className="hv_a_que"
            >
              View All Testimonials
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
