import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PayPal from "../components/PayPal";
import ProductCart from "../components/ProductCart";
import productsActions from "../redux/actions/productsActions";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/productCart.css";
import { Link as LinkRouter, useNavigate } from "react-router-dom";


export default function Cart() {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const cart = useSelector((store) => store.productsReducer.cart);
  // const checkout = useSelector((store) => store.cartReducer.checkout);
  const [isValid, setIsValid] = useState(false);
  // const summary = useSelector((store) => store.cartReducer.summary);
  const loggedUser = useSelector((store) => store.usersReducer.loggedUser);

  function handleClearCart(e) {
    dispatch({
      type: "CLEAR_CART",
    });
    localStorage.removeItem("product");
  }

  async function validateStock() {
    let res = await dispatch(productsActions.validateStock(cart));
    setIsValid(res);
  }

  return (
    <>
      {cart?.length > 0 ? (
        <div className='min-h-[80vh] flex items-center justify-center flex-col px-6 ' >
          <div className="mt-[6rem] cartTitle">
            <h1>Current products in your cart:</h1>
          </div>
          {cart?.length > 0 &&
            cart?.map((product, i) => (
              <ProductCart product={product} key={i} isValid={isValid} />
            ))}

          <div className="product-box w-[90%] flex row rounded-lg p-5 mt-6 min-w-[10rem] mx-2 justify-around items-center containerPriceClear">
            <h4 className="font-bold">
              Total Price:
              {cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
              USD
            </h4>

            <Button
              className="generalBtn"
              color="success"
              onClick={(e) => handleClearCart(e)}
              variant="contained"
              startIcon={<DeleteIcon />}
            >
              CLEAR CART
            </Button>
          </div>
          {loggedUser ? (
            <div className="product-box w-[90%] rounded-lg bg-slate-200 p-5 mt-6 min-w-[10rem] mx-2 my-5 buy">
              <div>
                <button
                  type="button"
                  onClick={validateStock}
                  className="validateStock"
                >
                  Confirm Purchase
                </button>
              </div>
              {isValid && <p className="my-2">Payment methods:</p>}
              <div className="paypal">
                <PayPal isValid={isValid} />
              </div>
            </div>
          ) : (
            <div className="flex gap-3 my-10">
              <p>You need</p>
              <LinkRouter to="/signIn">
                <button className="color">Sign in</button>
              </LinkRouter>
              <p>to pay</p>
            </div>
          )}
        </div>
      ) : (
        <div className="emptyCart cart-container ">
          <h3 className="text-white my-2 text-lg">Your cart is currently empty.</h3>
          <LinkRouter to="/products">
            <button className="color my-2">
              Click here to start making it greeneable!
            </button>
          </LinkRouter>
          <img className="my-2" src={"https://i.imgur.com/K3OL7sv.png"} ></img>
          {/* {!checkout && loggedUser && (
            <LinkRouter to="/checkout">
              <button className="text-6xl text-black">CheckOut</button>
            </LinkRouter>
          )} */}
        </div>
      )}
    </>
  );
}
