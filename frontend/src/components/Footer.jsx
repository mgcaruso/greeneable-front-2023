import React from "react";
import "../styles/footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
// import Logo from '../assets/logo-lighter.png'
import { Link as LinkRouter } from "react-router-dom";
import Logo from "../assets/logo-effect3.png";
import { AiOutlineHome } from "react-icons/ai";
import { BiStore } from "react-icons/bi";
import { BiInfoCircle } from "react-icons/bi";

function Footer() {
  return (
    <footer className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-around md:justify-center sm:flex-row gap-3 md:gap-20 py-3">
          <div className="flex justify-center sm:hidden pt-2">
            <LinkRouter to="/">
              <img src={Logo} className="w-20 justify-start" />
            </LinkRouter>
          </div>

          <div className="flex gap-5 sm:gap-10 md:gap-15 lg:gap-20 justify-center py-2">
            <LinkRouter to={"/"} className="flex items-center">
              <AiOutlineHome /> Home
            </LinkRouter>
            <LinkRouter to={"/products/"} className="flex items-center">
              <BiStore /> Products
            </LinkRouter>
            <LinkRouter to={"/aboutUs/"} className="flex items-center">
              <BiInfoCircle /> About Us
            </LinkRouter>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-around gap-3 my-3">
          <div className="flex justify-center">
            <p>Phone: (+54) 11 345 2167</p>
          </div>
          <div className="flex gap-5 items-center justify-center">
            <InstagramIcon />
            <FacebookIcon />
            <TwitterIcon />
          </div>
          <div className="flex justify-center">
            Contact:
            <a href="mailto:info@greeneable.com">info@greeneable.com</a>
          </div>
        </div>
      </div>
      <div className="bg-neutral-900/50 p-2 text-white text-center">
        Copyright © 2022 Greeneable - All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
