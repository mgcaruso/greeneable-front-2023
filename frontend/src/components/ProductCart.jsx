import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import productsActions from "../redux/actions/productsActions";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from "@mui/material/Rating";
import { RiLeafFill } from "react-icons/ri";
import "../styles/productCart.css";

export default function ProductCart({ product, isValid }) {
  const dispatch = useDispatch();

  function handleRemove(productId, e) {
    e.preventDefault();

    dispatch(productsActions.removeOneProduct(productId));
  }

  function handleRemoveAll(productId, e) {
    e.preventDefault();

    dispatch({
      type: "REMOVE_ALL_FROM_CART",
      payload: productId,
    });
  }

  function addToCart(product, e) {
    e.preventDefault();

    dispatch(productsActions.addToCart(product));
    // if(res.data.succes){
    //   setCart((prod) => [...prod, product]);
    // }else{
    //   hot toaste res.data.message
    // }
  }

  return (
    <div className="product-box flex row p-5 items-center w-[90%] my-2 containerCardsCart">
      <img
        className="w-[10rem] h-[10rem] object-cover imageCart"
        src={product?.photo}
        alt="..."
      />
      <div className="flex flex-col m-4 grow container1">
        <div className="product">
          <div>
            <h4 className="font-bold">{product?.name}</h4>
          </div>
          <button
            className="trash"
            onClick={(e) => handleRemoveAll(product?._id, e)}
          >
            <DeleteIcon />
          </button>
        </div>
        <h3 className="font-bold">{product?.price} USD</h3>
        <Rating
          readOnly
          name="sustainable"
          value={product?.sustainable}
          icon={<RiLeafFill fontSize="inherit" color="green" />}
          emptyIcon={<RiLeafFill fontSize="inherit" />}
        />

        <p>{product?.imageAlt}</p>
      </div>
      <div className="flex flex-col m-2 container1">
        <h3>Stock: {product?.stock}</h3>
        <div className="addQuantityRemove">
          <div className="addRemove">
            <button
              disabled={isValid}
              onClick={(e) => handleRemove(product?._id, e)}
            >
              <RemoveIcon className="buttonaddRemove" />
            </button>
          </div>
          <div className="quantity">
            <p>{product.quantity}</p>
          </div>
          <div className="addRemove">
            <button
              disabled={isValid}
              onClick={(e) =>
                product.quantity < product.stock && addToCart(product, e)
              }
            >
              <AddIcon className="buttonaddRemove" />
            </button>
          </div>
        </div>

        <div className="TotalToPay">
          <p>Total:</p>
          <p>{product.quantity * product.price} USD</p>
        </div>

        {/* el min es uno, el máx la cantidad de stock */}
      </div>
    </div>
  );
}
