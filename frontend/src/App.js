import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Details from "./pages/Details";
import Upload from "./pages/Upload";
import AboutUs from "./pages/AboutUs";
// import AboutUs from './pages/AboutUs';
import './styles/index.css'
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import productsActions from "./redux/actions/productsActions";
import { useEffect } from "react";
import userActions from "./redux/actions/userActions";
import toast, { Toaster } from "react-hot-toast";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./pages/Checkout";
import ScrollToTop from "react-scroll-to-top";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsActions.getProducts());
  }, []);

  useEffect(() => {
    if (localStorage.getItem("product") !== null) {
      let productsLocal = JSON.parse(localStorage.getItem("product"));
      dispatch({ type: "CART_STORAGE", payload: productsLocal });
      console.log(productsLocal);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      dispatch(userActions.verifyToken(token)); //CHEQUEAR
    }
  }, []);

  const loggedUser = useSelector((store) => store.usersReducer.loggedUser);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/checkout" element={<Checkout />} />
        {
          <Route
            path="/signUp"
            element={!loggedUser ? <SignUp /> : <Index />}
          />
        }
        {
          <Route
            path="/signIn"
            element={!loggedUser ? <SignIn /> : <Index />}
          />
        }
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
      <Toaster position="top-left" reverseOrder={false} />
      <Footer />
      <ScrollToTop
        style={{ boxShadow: "rgba(0, 0, 0, 0.9) 0px 5px 15px" }}
        smooth
        color="#142e34"
        viewBox="-10 -5 24 24"
        svgPath="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
      />
      <PayPalScriptProvider
        options={{
          "client-id":
            "AYDe49tTmuKagE4eZKY9Teuapk_ardpt9UHVUn5mtGXPkSoNc90BoCB46MGAONW6Mc7wTumOFUrMHtfn",
        }}
      />
    </>
  );
}

export default App;
