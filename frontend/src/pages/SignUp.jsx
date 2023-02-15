import React from "react";
// import '../styles/signup.css';
import "../styles/register.css";
import { useDispatch } from "react-redux";
import userActions from "../redux/actions/userActions";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import GoogleSignUp from "../components/GoogleSignUp";
import { useState, useEffect } from "react";
import { Link as LinkRouter } from "react-router-dom";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { TextField } from "@material-ui/core";
import EmailIcon from "@mui/icons-material/Email";
import Password from "../components/Password";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

<link
  href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Montserrat:wght@600&display=swap"
  rel="stylesheet"
></link>;

export default function LogIn() {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);
  const [selectCountry, setSelectCountry] = useState("");

  const dispatch = useDispatch();

  const [country, setCountry] = useState([]);
  React.useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountry(res.data));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      firstName: event.target[1].value,
      lastName: event.target[3].value,
      email: event.target[5].value,
      password: event.target[7].value,
      country: selectCountry,
      from: "signUp",
      role: "user",
    };
    const res = await dispatch(userActions.userSignUp(userData));
    // const errormsg = res.data.message
    // console.log(errormsg)
    // 		if (res.data.from === "validation") {
    //     errormsg.forEach(e => {
    //         toast.error(e.message)
    //     })
    // }
    // if (res.data.from === "form-Signup") {
    if (res.data.success) {
      toast.success(res.data.message);
      // navigate('/signin')
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <>
      <div className="containerLogin">
        <div className="h-screen w-screen">
          <div className="h-screen w-full z-10" style={{ height: 300 }}>
            <img
              src="https://www.xtrafondos.com/wallpapers/resized/pasto-1455.jpg?s=large"
              className="w-full h-screen object-cover overflow-hidden"
              alt=""
            ></img>
          </div>
          <div className="w-full h-screen z-20 bg-green-400 top-0 left-0 absolute opacity-60"></div>
          <div className="z-30 w-full h-screen flex flex-col flex-wrap absolute top-0 left-0 justify-center items-center ">
            <div
              className="card-register p-8 bg-[white] rounded"
              style={{
                height: "50vh !important",
              }}
            >
              <input
                type="checkbox"
                id="toggle"
                className="box__toggle w-full"
                hidden
              />

              <form className="" onSubmit={handleSubmit}>
                <div className="w-full text-center flex flex-col justify-center items-center">
                  <h1 className="w-full">Sign up</h1>

                  <select
                    name="country"
                    className="countryy w-4/5 bg-slate-500/25 rounded-lg p-2 my-2"
                    id="country"
                    required
                    onChange={(p) => setSelectCountry(p.target.value)}
                  >
                    <option value="">Select your Country</option>
                    {country.map((country, index) => (
                      <option key={index} value={country.name.common}>
                        {country.name.common}
                      </option>
                    ))}
                  </select>
                </div>
                {selectCountry && (
                  <div className="h-fit w-full flex flex-col items-center justify-center py-4">
                    <div className="flex flex-col gap-y-4 ">
                      <div
                        className="flex items-center flex-col sm:flex-row gap-2"
                        style={{ width: "100%" }}
                      >
                        <div>
                          <AccountCircle
                            sx={{ color: "action.active", mr: 1, my: 0.5 }}
                          />
                        </div>
                        <div className="nameDiv gap-y-2 sm:gap-0 w-full flex flex-nowrap justify-between">
                          <TextField
                            className="fullname"
                            id="outlined-basic"
                            label="First name"
                            variant="outlined"
                            required
                          />
                          <TextField
                            className="fullname"
                            id="outlined-basic"
                            label="Last name"
                            variant="outlined"
                            required
                          />
                        </div>
                      </div>

                      <div
                        className="flex items-center flex-col sm:flex-row gap-2"
                        style={{ width: "100%" }}
                      >
                        <div>
                          <EmailIcon
                            sx={{ color: "action.active", mr: 1, my: 0.5 }}
                          />
                        </div>
                        <div className="w-full sm:w-full">
                          <TextField
                            id="outlined-basic"
                            label="E-mail"
                            variant="outlined"
                            required
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>

                      <Password />
                      {/* <div className="flex items-center flex-col " style={{width: "100%" }}>
              	</div> */}

                      <div className="flex flex-col h-full justify-evenly items-center gap-y-4">
                        <div
                          style={{ width: "50%" }}
                          className="flex flex-col justify-center items-center gap-y-2"
                        >
                          <Button
                            className="w-full"
                            variant="contained"
                            color="success"
                            type="submit"
                          >
                            Register
                          </Button>
                          <p className="font-bold text-gray-500">OR</p>
                          <GoogleSignUp props={selectCountry} />
                        </div>
                      </div>
                      <div className="w-full flex justify-center">
                        <p className="flex gap-x-1 font-bold text-gray-500">
                          Already have an account?
                          <LinkRouter to={"/SignIn"}>
                            <span className="text-green-700">Sign in!</span>
                          </LinkRouter>
                        </p>
                      </div>
                    </div>

                    {/* <div className='botongoogle'>
				<GoogleSignUp props={selectCountry}/>
				</div>

				<button type="submit" className="form__button">Register</button> */}
                    {/* 
					<a href="https://twitter.com" className="icon-button twitter"><img src={process.env.PUBLIC_URL + '/assets/twitter-gif.gif'} alt="twitter_log" /></a>
					<a href="https://facebook.com" className="icon-button facebook"><img src={process.env.PUBLIC_URL + '/assets/faceboock.gif'} alt="twitter_log" /></a>
					<a href="https://google.com" className="icon-button google-plus"><i className="icon-google-plus"></i><span></span></a>	
				 */}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* 


				
			<form className="form form--login" onSubmit={handleSubmitLogIn}>
				<h1 className="form__title">Sign in</h1>

				<GoogleLogIn/>

				<div className="form__helper">
					<input type="email" name="user" id="user" placeholder="Email" autoComplete='username' className="form__input" />
					<label className="form__label" >User</label>
				</div>

				<div className="form__helper">
					<input type="password" name="password" id="password login" autoComplete='current-password' placeholder="Password" className="form__input" />
					<label className="form__label" >Password</label>
				</div>

				
				<button type="submit" className="form__button">Login</button>


				<p className="form__text">Don't have an account? <label htmlFor="toggle" className="form__link">Sign up!</label> </p>
			</form> */}
        </div>
      </div>
    </>
  );
}

// onChange={(e)=>{handleChange(e); setFile(e.target.files)}}
