import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import Leaf from "../assets/plantita2.png";
import cartActions from "../redux/actions/cartActions";

export default function Checkout() {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  const dispatch = useDispatch();
  const [otrosummary, setOtroSummary] = useState({});

  useEffect(() => {
    let summaries = dispatch(cartActions.getSummaryUser());
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-lime-300 items-center justify-center pt-20 px-1">
      <h1 className="text-white text-2xl text-center">You are a Greenial!</h1>
      <img className="leaf w-44" src={Leaf} alt="logo" />
      <div className="h-5/6 w-full z-10 flex flex-col items-center bg-green-800 border-green-800 border-4 px-2 rounded-xl">
        <h1 className=" text-white text-3xl">Checkout</h1>

        <div className="flex flex-col gap-2 w-11/12">
          <p>Name: asdasdsadsad</p>
          <p>LastName: asdsadsadsadas</p>
          <p className="break-all">Email: asdasdsad@asdsa.com</p>
        </div>
        {/* {summary.productsCart.map((product) => {
          <div>
            <p>{product.name}</p>
          </div>;
        })} */}
        {/* <div className="flex flex-col gap-2 w-11/12">
          <p>Name: {summary.payer.name.given_name}</p>
          <p>LastName: {summary.payer.name.surname}</p>
          <p className="break-all">Email: {summary.payer.email_address}</p>
        </div>
        {summary.productsCart.map((product) => {
          <div>
            <p>{product.name}</p>
          </div>;
        })} */}
        <LinkRouter to="/products">
          <button className=" text-4xl p-2 flex items-end">
            Click here to back shop!
          </button>
        </LinkRouter>
      </div>
    </div>
  );
}
