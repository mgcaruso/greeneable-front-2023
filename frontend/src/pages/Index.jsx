import React from "react";
import "../styles/home.css";
import back from "../assets/parallax/back.jpg";
import center from "../assets/parallax/center.png";
import front from "../assets/parallax/front.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import Carousel from "../components/Carousel";
import Button from "@mui/material/Button";
import { Link as LinkRouter } from "react-router-dom";
import { RiLeafFill } from "react-icons/ri";
import { motion } from "framer-motion"
import urlBack from "../urlBack";

export default function Index() {
  const [threeLampRandom, setThreeLampRandom] = useState([]);
  const [threeToysRandom, setThreeToysRandom] = useState([]);

  const [firstLeaf, setFirstLeaf] = useState(true);
  const [secondLeaf, setSecondLeaf] = useState(true);
  const [thirdLeaf, setThirdLeaf] = useState(true);
  const [fourthLeaf, setFourthLeaf] = useState(true);
  const [fifthLeaf, setFifthLeaf] = useState(true);
  const [noLeaf, setNoLeaf] = useState(false);

  // console.log(firstLeaf);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);
  useEffect(() => {
    axios
      .get(
        `${urlBack}/api/threelampproducts/random`
      )
      .then((res) => setThreeLampRandom(res.data.response));
  }, []);
  useEffect(() => {
    axios
      .get(`${urlBack}/api/threetoyproducts/random`)
      .then((res) => setThreeToysRandom(res.data.response));
  }, []);
  useEffect(() => {
    let A = document.getElementById("back");
    let B = document.getElementById("center");
    let C = document.getElementById("front");
    let D = document.getElementById("titleHeader");

    window.addEventListener("scroll", function () {
      let value = window.scrollY;
      A.style.top = value * 0.8 + "px";
      B.style.top = value * 1 + "px";
      C.style.top = value * 0.5 + "px";
      D.style.marginTop = value * 1.6 + "px";
      // console.log(B.style.display)

      if (window.scrollY <= 800) {
        B.style.display = "block";
      } else {
        B.style.display = "none";
      }
    });
  }, []);

  return (
    <div className="bodyPrueba">
      <div className="section">
        <img className="sectionImg" src={back} id="back" alt="" />
        <img src={center} id="center" alt="" />
        <div id="titleHeader">
          <h2>Greeneable</h2>
          <h3>Breaking the pollution barriers.</h3>
        </div>
        <img className="sectionImg" src={front} id="front" alt="" />
      </div>
      <div className="contenedorDeTodo">
        <div className="leaves">
          <div className="topLeaves">
            <h1>Our sustainability project:</h1>
            <p>
              We are Greeneable, an ecological e-commerce deeply committed to
              protecting the environment, and we are aware of the serious
              deforestation problems that affect the Amazon rainforest (the lung
              of the world). For this reason, we offer an innovative rating
              system, based on scores from 1 to 5, which represent the
              sustainability levels of our products. Every 500 points achieved,
              we will donate 1 tree for reforestation projects.
            </p>
          </div>
          <div className="leavesImg">
            <div


            >
              {/* <RiLeafFill size={100} width="100%" height={100} color="green" /> */}
              <motion.img
                animate={{ rotateY: !firstLeaf || !secondLeaf || !thirdLeaf || !fourthLeaf || !fifthLeaf ? 0 : 180 }}
                transition={{ duration: 0.7 }}
                className={!firstLeaf || !secondLeaf || !thirdLeaf || !fourthLeaf || !fifthLeaf ? 'saturate-10' : 'saturate-50'}
                onMouseOver={() => {
                  setNoLeaf(true);
                  setFirstLeaf(false);
                }}
                onMouseOut={() => {
                  setNoLeaf(false);
                  setFirstLeaf(true);
                }

                }

                src="https://i.imgur.com/nzz99vK.png"
                alt=""
              />
            </div>
            <div
              onMouseOver={() => {
                setNoLeaf(true);
                setSecondLeaf(false);
              }}
              onMouseOut={() => {
                setNoLeaf(false);
                setSecondLeaf(true);
              }}

            >
              {/* <RiLeafFill size={100} width="100%" height={100} color="green" /> */}
              <motion.img
                className={!secondLeaf || !thirdLeaf || !fourthLeaf || !fifthLeaf ? 'saturate-10' : 'saturate-50'}
                animate={{ rotateY: !secondLeaf || !thirdLeaf || !fourthLeaf || !fifthLeaf ? 0 : 180 }}
                transition={{ duration: 0.7 }}
                src="https://i.imgur.com/nzz99vK.png"
                alt="..."
              />
            </div>
            <div

              onMouseOver={() => {
                setNoLeaf(true);
                setThirdLeaf(false);
              }}
              onMouseOut={() => {
                setNoLeaf(false);
                setThirdLeaf(true);
              }}
            // className={
            //   !thirdLeaf || !fourthLeaf || !fifthLeaf
            //     ? "h-full flex items-center saturate-200"
            //     : "h-full flex items-center hover:saturate-100"
            // }
            >
              {/* <RiLeafFill size={100} width="100%" height={100} color="green" /> */}
              <motion.img
                className={ !thirdLeaf || !fourthLeaf || !fifthLeaf ? 'saturate-10 transition-all' : 'saturate-50'}
                animate={{ rotateY: !thirdLeaf || !fourthLeaf || !fifthLeaf ? 0 : 180 }}
                transition={{ duration: 0.7 }}
                // className="leafImg"
                src="https://i.imgur.com/nzz99vK.png"
                alt=""
              />
            </div>
            <div
              onMouseOver={() => {
                setNoLeaf(true);
                setFourthLeaf(false);
              }}
              onMouseOut={() => {
                setNoLeaf(false);
                setFourthLeaf(true);
              }}
            // className={
            //   !fifthLeaf
            //     ? "h-full flex items-center mix-blend-hard-light"
            //     : "h-full flex items-center hover:mix-blend-hard-light"
            // }
            >
              {/* <RiLeafFill size={100} width="100%" height={100} color="green" /> */}
              <motion.img
                className={!fourthLeaf || !fifthLeaf ? 'saturate-10' : 'saturate-50'}
                animate={{ rotateY: !fourthLeaf || !fifthLeaf ? 0 : 180 }}
                transition={{ duration: 0.7 }}
                src="https://i.imgur.com/nzz99vK.png"
                alt=""
              />
            </div>
            <div
              onMouseOver={() => {
                setNoLeaf(true);
                setFifthLeaf(false);
              }}
              onMouseOut={() => {
                setNoLeaf(false);
                setFifthLeaf(true);
              }}
            // className="h-full   flex items-center hover:mix-blend-hard-light"
            >
              {/* <RiLeafFill size={100} width="100%" height={100} color="green" /> */}
              <motion.img
                className={!fifthLeaf ? 'saturate-10' : 'saturate-50'}
                animate={{ rotateY: !fifthLeaf ? 0 : 180 }}
                transition={{ duration: 0.7 }}

                src="https://i.imgur.com/nzz99vK.png"
                alt=""
              />
            </div>
          </div>

          <div className="leavesText">
            <motion.h2
              // initial={{ opacity: !firstLeaf && 0, scale: !firstLeaf && 0.5 }}
              transition={{ opacity: [0,2], scale: 1 }}
              hidden={firstLeaf}
              
              >

              <span>Level 1</span>: Substitute traditional products for others
              with less impact.
            </motion.h2>
            <h2 hidden={secondLeaf}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: firstLeaf && 1, scale: firstLeaf && 1 }}
              transition={{ duration: 0.7 }}
            >
              <span>Level 2</span>: They consume less energy when used.
            </h2>
            <h2 hidden={thirdLeaf}>
              <span>Level 3</span>: They do not use aggressive products or
              processes for the environment in their production process.
            </h2>
            <h2 hidden={fourthLeaf}>
              <span>Level 4</span>: Its raw materials come from well-used
              natural resources that are recovered over a period of time.
            </h2>
            <h2 hidden={fifthLeaf}>
              <span>Level 5</span>: Contribute to solving an environmental
              problem.
            </h2>
            <h2 hidden={noLeaf}>
              Hover over the leaves to obtein info about the sustainability
              levels.
            </h2>
            {/* <h2>
              { !firstLeaf ? "Level 1: Substitute traditional products for others with less impact."
            :
              !secondLeaf ? "Level 2: They consume less energy when used."
            :
            !thirdLeaf ? "Level 3: They do not use aggressive products or processes for the environment in their production process."
            :
            !fourthLeaf ? "Level 4: Its raw materials come from well-used natural resources that are recovered over a period of time."
            :
            !fifthLeaf ? "Level 5: Contribute to solving an environmental problem."
            :
            "Hover over the leaves to obtein info about the sustainability levels."
          }
            </h2> */}
          </div>
        </div>

        <div className="line">
          <div className="lineA">
            <div className="lineA-A"></div>
          </div>
          <div className="lineB">
            <LinkRouter to={"/products/"}>
              <Button variant="contained" className="btnHome">
                All Products
              </Button>
            </LinkRouter>
          </div>
          <div className="lineC">
            <div className="lineC-A"></div>
          </div>
        </div>
        <div className="carouselHome">
          <Carousel />
        </div>

        <div className="firstContent">
          {threeLampRandom.length && (
            <div className="firstContentA">
              <div className="A">
                <img src={threeLampRandom[0].photo} alt="" />
                <div className="itemName">
                  <h3>{threeLampRandom[0].name}</h3>
                </div>
                <LinkRouter to={`/details/${threeLampRandom[0]._id}`}>
                  <div className="buyMe">
                    <h3>MORE INFO</h3>
                  </div>
                </LinkRouter>
              </div>
              <div className="B">
                <div className="B-1">
                  <img src={threeLampRandom[1].photo} alt="" />
                  <div className="itemName">
                    <h3>{threeLampRandom[1].name}</h3>
                  </div>
                  <LinkRouter to={`/details/${threeLampRandom[1]._id}`}>
                    <div className="buyMe">
                      <h3>MORE INFO</h3>
                    </div>
                  </LinkRouter>
                </div>
                <div className="B-2">
                  <img src={threeLampRandom[2].photo} alt="" />
                  <div className="itemName">
                    <h3>{threeLampRandom[2].name}</h3>
                  </div>
                  <LinkRouter to={`/details/${threeLampRandom[2]._id}`}>
                    <div className="buyMe">
                      <h3>MORE INFO</h3>
                    </div>
                  </LinkRouter>
                </div>
              </div>
            </div>
          )}

          <div className="firstContentB">
            <h3 style={{ fontSize: "42px" }}>Eco-Lamps</h3>
            <Typography>
              Are you one of those who look for the latest design trends in the
              market and also love the concept of being friendly to the
              environment?
            </Typography>
            <Typography>
              Get to know our eco friendly lamps, with some of the best
              eco-designs in the world, among which you will find sustainable
              ceiling, floor, table, wall lamps and lighting accessories.
            </Typography>
          </div>
        </div>
        <div className="line2">
          <div className="line2A">
            <div className="line2A-A"></div>
          </div>
          <div className="lineBtn">
            <h3 variant="contained" className="sustainable">
              Sustainable
            </h3>
          </div>
        </div>
        <div className="separator"></div>
        <div className="line3">
          <div className="lineBtn">
            <h3 variant="contained" className="sustainable">
              Sustainable
            </h3>
          </div>
          <div className="line3A">
            <div className="line3A-A"></div>
          </div>
        </div>
        <div className="secondContent">
          <div className="secondContentA">
            <h3 style={{ fontSize: "42px" }}>Eco-Toys</h3>
            <Typography>
              In our store you will find a complete catalog of educational toys
              specially designed with natural materials. A range of games
              designed so that the little ones can have fun in an original and
              unique way.
            </Typography>
            <Typography>
              Our ecological games and toys stimulate the senses and help in the
              learning process and development of motor skills.
            </Typography>
          </div>
          {threeToysRandom.length && (
            <div className="secondContentB">
              <div className="B">
                <div className="B-1">
                  <img src={threeToysRandom[0].photo} alt="" />
                  <div className="itemName">
                    <h3>{threeToysRandom[0].name}</h3>
                  </div>
                  <LinkRouter to={`/details/${threeToysRandom[0]._id}`}>
                    <div className="buyMe">
                      <h3>MORE INFO</h3>
                    </div>
                  </LinkRouter>
                </div>
                <div className="B-2">
                  <img src={threeToysRandom[1].photo} alt="" />
                  <div className="itemName">
                    <h3>{threeToysRandom[1].name}</h3>
                  </div>
                  <LinkRouter to={`/details/${threeToysRandom[1]._id}`}>
                    <div className="buyMe">
                      <h3>MORE INFO</h3>
                    </div>
                  </LinkRouter>
                </div>
              </div>
              <div className="A">
                <img src={threeToysRandom[2].photo} alt="" />
                <div className="itemName">
                  <h3>{threeToysRandom[2].name}</h3>
                </div>
                <LinkRouter to={`/details/${threeToysRandom[2]._id}`}>
                  <div className="buyMe">
                    <h3>MORE INFO</h3>
                  </div>
                </LinkRouter>
              </div>
            </div>
          )}
        </div>
        <div className="line4">
          <div className="line4A"></div>
        </div>
        <div className="twoCalls">
          <div className="firstCall">
            <img
              src="https://images.pexels.com/photos/6417967/pexels-photo-6417967.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <div className="text">
              <h1>No more laboratory tests based on animal suffering</h1>
            </div>
          </div>
          <div className="secondCall">
            <img
              src="https://images.pexels.com/photos/6706901/pexels-photo-6706901.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <div className="text">
              <h1>
                Try our totally cruelty free personal hygiene and beauty
                products
              </h1>
            </div>
          </div>
        </div>
        <div className="line">
          <div className="lineA">
            <div className="lineA-A"></div>
          </div>
          <div className="lineB">
            <LinkRouter to={"/products/"}>
              <Button variant="contained" className="btnHome">
                Shop Now
              </Button>
            </LinkRouter>
          </div>
          <div className="lineC">
            <div className="lineC-A"></div>
          </div>
        </div>
        <div className="lastImage">
          <div className="lastImage-A"></div>
          <div className="lastImage-B">
            <Typography sx={{ fontSize: 50 }}>Be sustainable</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
