import axios from "axios";
import urlBack from "../../urlBack";
// const urlBack = "https://greeeneable-back.herokuapp.com";

const productsActions = {
  getProducts: () => {
    return async (dispatch, getState) => {
      let res = await axios.get(`${urlBack}/api/products`);
      dispatch({ type: "GETPRODUCTS", payload: res.data.response });
      return res;
    };
  },

  getOneProduct: (id) => {
    // console.log(id);
    return async (dispatch, getState) => {
      const res = await axios.get(`${urlBack}/api/product/${id}`);
      dispatch({ type: "GETONEPRODUCT", payload: res.data.response.product });
      // console.log(res);
      return res;
    };
  },

  filterProducts: (searchInput, buttonRadio, orderSort, sustainableRank) => {
    return (dispatch, getState) => {
      dispatch({
        type: "FILTERPRODUCTS",
        payload: {
          searchInput: searchInput,
          buttonRadio: buttonRadio,
          orderSort: orderSort,
          sustainableRank: sustainableRank,
        },
      });
    };
  },

  addProduct: (data) => {
    return async (dispatch, getState) => {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${urlBack}/api/products`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "MESSAGE",
        payload: {
          view: true,
          message: res.data.message,
          success: res.data.success,
        },
      });
      return res;
    };
  },

  modifyProduct: (data, id) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      const res = await axios.put(
        `${urlBack}/api/product/${id}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "message",
        payload: {
          view: true,
          message: res.data.message,
          success: res.data.success,
        },
      });

      return res;
    };
  },
  removeProduct: (id) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      const res = await axios.post(
        `${urlBack}/api/product/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "message",
        payload: {
          view: true,
          message: res.data.message,
          success: res.data.success,
        },
      });
      return res;
    };
  },

  addToCart: (product) => {
    return async (dispatch, getState) => {
      // const res = await axios.get(`${urlBack}/api/productcart/asdprod`, {
      //   product,
      // });
      // console.log(res);
      dispatch({
        type: "ADD_TO_CART",
        payload: product,
      });
    };
  },

  removeOneProduct: (prodId) => (dispatch, getState) => {
    // var lStorage = localStorage.filter((id) => id !== prodId);
    // localStorage.setItem("carrito", lStorage);
    dispatch({
      type: "REMOVE_ONE_FROM_CART",
      payload: prodId,
    });
  },

  validateStock: (cart) => {

    return async (dispatch, getState) => {
      const res = await axios.post(`${urlBack}/api/productcart/validateStock`, {
        cart
      });
      return res.data.success;
    };
  },
};

export default productsActions;
