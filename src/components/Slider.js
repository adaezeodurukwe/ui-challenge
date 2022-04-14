import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import UAParser from "ua-parser-js";
import RatingComponent from "./RatingComponent";
import SvgComponent from "./SvgComponent";

const CustomDot = ({ onClick, items, ...rest }) => {
  const { active } = rest;
  return (
    <div
      className={`dot ${active ? "active" : "inactive"}`}
      onClick={() => onClick()}
    />
  );
};

const CustomRightArrow = ({ onClick, ...rest }) => {
  return (
    <div
      style={{
        height: "340px",
        backgroundColor: "#ffffff",
        opacity: 0.5,
        width: "30px",
        position: "absolute",
        zIndex: "10",
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button onClick={() => onClick()} className="cursor-pointer">
        <SvgComponent width="6" height="12" name="arrow-right" />
      </button>
    </div>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
  return (
    <div
      style={{
        height: "340px",
        backgroundColor: "#ffffff",
        opacity: 0.5,
        width: "30px",
        position: "absolute",
        zIndex: "10",
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button onClick={() => onClick()} className="cursor-pointer">
        <SvgComponent width="6" height="12" name="arrow-left" />
      </button>
    </div>
  );
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 6, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 2, // optional, default to 1.
  },
};
const Slider = ({ deviceType, books }) => {
  return (
    <div className="slider-container-custom">
      <h4>Featured books</h4>
      <Carousel
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={1000}
        deviceType={deviceType}
        partialVisible={true}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
        customDot={<CustomDot />}
      >
        {books.map((book, index) => (
          <Image key={index} book={book} />
        ))}
      </Carousel>
    </div>
  );
};

const Image = ({ book }) => {
  const [onIt, setOnIt] = useState(false);
  return (
    <div
      className="relative"
      style={{
        width: "220px",
        height: "330px",
        marginRight: "auto",
        marginLeft: "auto"
      }}
    >
      <img
        className="image"
        width="220"
        height="330"
        alt=""
        src={book.image_url}
        onMouseOver={() => {
          setOnIt(true);
        }}
      />
      {onIt && (
        <div
          onMouseOut={() => setOnIt(false)}
          onMouseOver={() => {
            setOnIt(true);
          }}
          className="absolute slide-info p-4"
        >
          <div className="flex flex-col">
            <span className="text-xs text-green">Available</span>
            <b className="mt-4">{book.title}</b>
            <span className="my-2">{book.authors[0].name}</span>
            <div className="flex flex-col my-2">
              <b className="text-xs">Genre</b>
              <div>
                {book.genres.map((genre, index) => (
                  <span key={index} className="text-xs mr-2">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <b className="text-xs">Tags</b>
              <div>
                {book.tags.map((tag, index) => (
                  <span key={index} className="text-xs mr-2">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex my-2">
              <span className="flex">
                <span className="flex flex-col justify-center items-center text-white">
                  <SvgComponent name="people" width="24" height="24" />
                  {book.number_of_purchases}
                </span>
                <span className="flex flex-col justify-center items-center text-white">
                  <SvgComponent name="like" width="24" height="24" />
                  {book.likes}
                </span>
              </span>

              <span className="vertical-line mr-4 ml-4"></span>

              <div className="flex flex-col justify-center ">
                <span>Rating: {book.rating}</span>
                <RatingComponent book={book} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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

export default Slider;
