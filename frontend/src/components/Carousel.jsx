import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
import { useEffect } from "react";
import { Link as LinkRouter } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/carousel.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import { CardContent, Typography } from "@mui/material";
import urlBack from "../urlBack";

export default function App() {
  const [carouselItems, setCarouselItems] = useState([]);
  useEffect(() => {
    axios
      .get(`${urlBack}/api/fiveproducts/random`)
      .then((res) => setCarouselItems(res.data.response));
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        slidesPerGroup={4}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          // dynamicBullets: true,
          clickable: true,
        }}
        breakpoints={{
          200: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10,
          },
          425: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20,
          },
          550: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 20,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {carouselItems.map((event, i) => (
          <SwiperSlide key={i} className="sliderCarousel">
            <Box
              className="sliderImg"
              sx={{
                backgroundImage: `url("${event.photo}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
            <Box>
              <Typography>{event.name}</Typography>
            </Box>
            <Box>
              <LinkRouter to={`/details/${event._id}`}>
                <Button sx={{ fontSize: 14, color: "black" }} size="medium">
                  See More
                </Button>
              </LinkRouter>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
