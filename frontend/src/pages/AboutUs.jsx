import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../styles/aboutUs.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Patagonia from "../assets/Patagonia-Logo.png";
import Nestle from "../assets/Nestle-Logo.png";
import Amazon from "../assets/Amazon-logo.png";
import Verizon from "../assets/Verizon-Logo.png";
import { useEffect } from "react";

export default function AboutUs() {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  const itemData = [
    {
      img: Patagonia,
      title: "Patagonia",
    },
    {
      img: Nestle,
      title: "Nestle",
    },
    {
      img: Amazon,
      title: "Amazon",
    },
    {
      img: Verizon,
      title: "Verizon",
    },
  ];
  return (
    <div>
      <div className="fondoImagen h-fit">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="h-[50%] w-[90%] flex items-center">
            <h2 className="text-4xl sm:text-6xl text-white font-bold text-center">
              "The sustainable solution to your daily needs"
            </h2>
          </div>
          <div className="h-[50%] flex items-start w-[90%]">
            <p className="text-xl sm:text-2xl text-white font-bold">
              Greeneable is a digital eco-platform, a web environment created by
              web developers from the MindHub 28 cohort, which serves as a
              marketing and distribution channel for sustainable products and
              services for human eco-development in an integral way. It is a
              virtual commercial meeting point, a digital shopping mall for
              products and services from the organic, natural, biological and
              sustainable world with an international reach.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-green-800 bg-opacity-50 flex flex-wrap justify-evenly items-center w-full h-fit p-4 gap-y-2">
        <div>
          <Card sx={{ maxWidth: 400, minHeight: 300 }}>
            <CardContent>
              <Typography
                sx={{ display: "flex", justifyContent: "center" }}
                gutterBottom
                variant="h5"
                component="div"
              >
                Mission
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage the micro-segmented marketing, distribution, promotion
                and dissemination of products, services and projects from the
                sustainable, ecological, organic and natural world. Direct
                efforts in a specialized way to people who seek to achieve an
                increasingly healthy lifestyle in an integral way, at a psychic,
                physical and eco-social level, more responsible and civic, in
                pursuit of sustainable local development.
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card sx={{ maxWidth: 400, minHeight: 300 }}>
            <CardContent>
              <Typography
                sx={{ display: "flex", justifyContent: "center" }}
                gutterBottom
                variant="h5"
                component="div"
              >
                Vision
              </Typography>
              <Typography
                sx={{ fontSize: "18px" }}
                variant="body2"
                color="text.secondary"
              >
                To be the digital ecoportal of international reference
                specialized in the sustainable world and to obtain the key to
                comprehensive sustainability year after year. Greeneable guides
                its vocation of service to the client-provider and the
                client-user with a sincere, close and personalized treatment.
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card sx={{ maxWidth: 400 }}>
            <CardContent>
              <Typography
                sx={{ display: "flex", justifyContent: "center" }}
                gutterBottom
                variant="h5"
                component="div"
              >
                Values
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Greeneable offers solutions for a gradual, wise transition, with
                professionals who accompany the eco-evolution of our users. The
                axiological pillars of Greeneable are based on the
                professionalism and integrity of its providers, who assume the
                responsibility of acting with ethical, honest and dignified
                behavior that generates credibility and trust in the quality of
                the products it offers, innovation, transparency in management,
                communication with our stakeholders, respect for people and the
                environment, and commitment to local development.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="fondoImagen2">
        <div className="flex justify-center items-center h-[20vh]">
          <h2 className="p-3 text-6xl font-bold text-white">Our Partners:</h2>
        </div>
        <div className="flex flex-wrap justify-evenly">
          {itemData.map((item) => (
            <div key={item.img}>
              <img
                className="w-[300px]"
                src={`${item.img}`}
                srcSet={`${item.img}`}
                alt={item.title}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// style={{ maxWidth: "45vw", paddingInline: "5rem", paddingTop: "30vh", fontSize: "38px", color: "white", display: "flex", marginBottom: "2rem", justifyContent: "center" }}

// style={{ maxWidth: "45vw", paddingInline: "3rem", color: "white", display: "flex", justifyContent: "center", fontSize: "28px" }}

// style={{ backgroundColor: "#e7eee8", display: "flex", justifyContent: "space-evenly", alignItems: "center", padding: "3rem", paddingTop: "7rem", paddingBottom: "7rem" }}

// style={{ display: "flex", justifyContent: "center", fontSize: "38px", marginTop: "7rem" }}

// style={{ flexWrap: "wrap", display: "flex", justifyContent: "center", marginTop: "4rem" }}

// <div sx={{ width: "100%", height: "fit-content" }} cols={4} rowHeight={164}>

// ?w=164&h=164&fit=crop&auto=format
// ?w=164&h=164&fit=crop&auto=format&dpr=2 2x
