import axios from "axios";
import urlBack from "../../urlBack";
// const urlBack = "https://greeeneable-back.herokuapp.com";

const adminActions = {
  uploadProduct: (newProduct) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      const res = await axios.post(
        `${urlBack}/api/products/upload`,
        newProduct,
        {
          headers: {
            Authorization: "Bearer " + token,
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

  deleteProduct: (id) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      const res = await axios.post(
        `${urlBack}/api/products/delete/${id}`,
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

  modifyProduct: (id, product) => {
    const token = localStorage.getItem("token");
    // for (const value of product.values()) {
    //   console.log(value);
    // }
    return async (dispatch, getState) => {
      const res = await axios.put(
        `${urlBack}/api/products/modify/${id}`,
        product,
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
};

export default adminActions;
