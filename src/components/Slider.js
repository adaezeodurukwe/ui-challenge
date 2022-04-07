import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import UAParser from "ua-parser-js";
import SvgComponent from './SvgComponent';

const CustomRightArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType }
  } = rest;
  // onMove means if dragging or swiping in progress.
  return (
    <div
      style={{
        height: "340px",
        backgroundColor: "#ffffff",
        opacity: 0.5,
        width: "30px",
        position: "absolute",
        zIndex: "100",
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <button
        onClick={() => onClick()}
        className="cursor-pointer"
      >
        <SvgComponent width="6" height="12" name="arrow-right" />
      </button>
    </div>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType }
  } = rest;
  // onMove means if dragging or swiping in progress.
  return (
    <div
      style={{
        height: "340px",
        backgroundColor: "#ffffff",
        opacity: 0.5,
        width: "30px",
        position: "absolute",
        zIndex: "100",
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <button
        onClick={() => onClick()}
        className="cursor-pointer"
      >
        <SvgComponent width="6" height="12" name="arrow-left" />
      </button>
    </div>
  );
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 4 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const Slider = ({ deviceType }) => {
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={1000}
      containerClass="container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      partialVisible={false}
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
    >
      <img width="220" height="330" alt="" src="https://res.cloudinary.com/quidaxengineering/image/upload/v1611770304/feec/the-innovators-dilemma_ap1zo4.jpg" />
      <img width="220" height="330" alt="" src="https://res.cloudinary.com/quidaxengineering/image/upload/v1611741483/feec/the-effective-engineer-cover_bgj7u4.jpg" />
      <img width="220" height="330" alt="" src="https://res.cloudinary.com/quidaxengineering/image/upload/v1611769892/feec/how-to-win-friends_t1a2jn.webp" />
      <img width="220" height="330" alt="" src="https://res.cloudinary.com/quidaxengineering/image/upload/v1611770914/feec/blue-ocean-strategy_amjdl6.jpg" />
      <img width="220" height="330" alt="" src="https://res.cloudinary.com/quidaxengineering/image/upload/v1611770304/feec/the-innovators-dilemma_ap1zo4.jpg" />
      <img width="220" height="330" alt="" src="https://res.cloudinary.com/quidaxengineering/image/upload/v1611741483/feec/the-effective-engineer-cover_bgj7u4.jpg" />
      <img width="220" height="330" alt="" src="https://res.cloudinary.com/quidaxengineering/image/upload/v1611769892/feec/how-to-win-friends_t1a2jn.webp" />
      <img width="220" height="330" alt="" src="https://res.cloudinary.com/quidaxengineering/image/upload/v1611770914/feec/blue-ocean-strategy_amjdl6.jpg" />
    </Carousel>
  )
}

Slider.getInitialProps = ({ req }) => {
  let userAgent;
  if (req) {
    userAgent = req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }
  const parser = new UAParser();
  parser.setUA(userAgent);
  const result = parser.getResult();
  const deviceType = (result.device && result.device.type) || "desktop";
  return { deviceType };
};

export default Slider