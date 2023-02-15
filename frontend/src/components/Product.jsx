import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import productsActions from "../redux/actions/productsActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import "../styles/products.css";
import { IoIosEye } from "react-icons/io";
import { BiInfoCircle } from "react-icons/bi";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import { RiLeafFill } from "react-icons/ri";

export default function Product({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.productsReducer.cart);

  function addToCart(product, e) {
    e.preventDefault();
    let productAdded = cart.find((p) => p._id === product._id);
    if (productAdded?.quantity >= product.stock) {
      toast.error("No stock");
      return;
    }

    dispatch(productsActions.addToCart(product));
    toast.success("Product added!");
  }

  return (
    <div className="relative card h-[20rem] overflow-hidden bg-gray-600">
      <div className="image relative w-full h-56 overflow-hidden">
        <div className="absolute top-0 h-16 w-full">
          <div className="absolute left-[-40px] top-[32px] w-[170px] transform -rotate-45 bg-gray-600 text-center text-white font-semibold">
            {product.stock <= 5 ? (
              product.stock === 0 ? (
                <p className="bg-red-700 p-1">Out of stock</p>
              ) : (
                <p className="bg-red-500 p-1">Last units!</p>
              )
            ) : (
              <p className=""></p>
            )}
          </div>
        </div>
        <img className="" src={product.photo} alt="" />
      </div>
      <LinkRouter
        className="absolute top-36 -right-5"
        to={`/details/${product._id}`}
      >
        <Button className="viewMore bg-">
          <BiInfoCircle size={35} className="eyes" />
        </Button>
      </LinkRouter>
      <div className="content">
        <CardContent sx={{ p: 0 }}>
          <Rating
            sx={{ py: 1 }}
            name="sustainable"
            disabled
            value={product.sustainable}
            icon={<RiLeafFill fontSize="inherit" color="darkgreen" />}
            emptyIcon={<RiLeafFill fontSize="inherit" />}
          />
        </CardContent>
        <div className="info px-2 flex-grow">
          <Typography
            className="text-white"
            gutterBottom
            variant="h6"
            component="div"
          >
            {product.name}
          </Typography>
    
        </div>
        <div className="moreInfo pt-2">
          <Typography variant="body2" className="text-white font-bold">
            {product.price} USD
          </Typography>
          <Button
            variant="contained"
            className="buttonAdd"
            onClick={(e) => product.stock > 0 && addToCart(product, e)}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
