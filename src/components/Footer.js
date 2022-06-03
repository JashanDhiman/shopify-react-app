import React from "react";
import "../styles/footer.css";
import { ImFacebook, ImTwitter, ImYoutube } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";
import { FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer_section display-block">
      <div className="layout_center">
        <div className="foot-wrap display-block">
          <div className="block-4 customer_service">
            <h3 className="ftitle">Customer services</h3>
            <ul className="fpages">
              <li>
                <a href="/pages/shipping">Shipping Policy</a>
              </li>

              <li>
                <a href="/pages/privacy">Privacy Policy</a>
              </li>

              <li>
                <a href="/pages/return-policy">Returns &amp; Cancellation</a>
              </li>

              <li>
                <a href="/pages/terms-conditions">Terms &amp; Conditions</a>
              </li>

              <li>
                <a href="/pages/faq">FAQs</a>
              </li>

              <li>
                <a href="https://www.allthatgrows.in/apps/shipway_track">
                  Track Your Order
                </a>
              </li>
            </ul>

            <span className="foot-logo">
              <img
                src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/leaf.png?v=99331424205049980601610950595"
                data-src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/leaf.png?v=99331424205049980601610950595"
                alt="AllThatGrows"
                className=" ls-is-cached lazyloaded"
              />
            </span>
          </div>
          <div className="block-4 contact_details">
            <h3 className="ftitle">Connect with us</h3>

            <ul className="fpages">
              <li>
                <a href="/pages/contact">Contact</a>
              </li>

              <li>
                <a href="/pages/about-us">About Us</a>
              </li>

              <li>
                <a href="/blogs/posts">Our Blog</a>
              </li>

              <li>
                <a href="/pages/career">Careers</a>
              </li>
            </ul>

            <ul className="connect-icons">
              <li className="fb-ico">
                <a href="https://www.facebook.com/allthatgrows.in">
                  <ImFacebook />
                </a>
              </li>
              <li className="twi-ico">
                <a href="https://twitter.com/allthatgrows0" title="Twitter">
                  <ImTwitter />
                </a>
              </li>
              <li className="inst-ico">
                <a
                  href="https://www.instagram.com/allthatgrows.in"
                  title="Instagram"
                >
                  <BsInstagram />
                </a>
              </li>
              <li className="pin-ico">
                <a
                  href="https://www.pinterest.com/allthatgrows"
                  title="Pinterest"
                >
                  <FaPinterestP />
                </a>
              </li>
              <li className="yt-ico">
                <a
                  href="https://www.youtube.com/channel/UC3hpRL1LYptLVya3esMYLfw"
                  title="YouTube"
                >
                  <ImYoutube />
                </a>
              </li>
            </ul>
          </div>
          <div className="block-4 newsletter_box">
            <h3 className="ftitle">Subscribe To Newsletter</h3>

            <form
              method="post"
              action="//allthatgrows.us13.list-manage.com/subscribe/post?u=2b7b5f7b5c17ab01a096d7721&amp;id=209eed0b25"
              id="mc-embedded-subscribe-form1"
              name="mc-embedded-subscribe-form1"
              className="validate display-block"
              noValidate=""
            >
              <input
                name="EMAIL"
                id="newsletter_1493"
                title="Sign up for our newsletter"
                className="email with-postfix input-text email-mobile"
                type="email"
                required=""
                datarequired="true"
                dataparsleyrequiredmessage="Email address is required"
                dataparsleytypemessage="Email address must be valid"
                placeholder="ENTER YOUR EMAIL ID"
                dataparsleyid="128"
              />
              <button
                type="submit"
                title="Subscribe"
                className="button cb-button-mobile"
                id="mc-embedded-subscribe"
              >
                Submit
              </button>
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  name="b_4663e7d56408acce3b27bc6d9_bac82d9e31"
                  tabIndex="-1"
                  type="text"
                  dataparsleyid="130"
                />
              </div>
            </form>

            <div className="ftext display-block">
              <img
                alt="imagehai"
                src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/signup-img.png?v=98384164471567640631610950671"
                datasrc="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/signup-img.png?v=98384164471567640631610950671"
                className=" lazyloaded"
              />
              <span>
                &amp; ENJOY 10% OFF <br></br>YOUR FIRST ORDER
              </span>
            </div>
          </div>
        </div>
        <div className="fcopy display-block">
          <span>Copyright 2022 © AllThatGrows. All rights reserved</span>
          <span>
            Design by
            <a href="https://blimp.agency"> Blimp.agency </a>
            &amp; Shopify Development by
            <a href=" https://www.cueblocks.com/shopify.php"> CueBlocks</a>.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
