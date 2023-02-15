import axios from "axios";
import toast from "react-hot-toast";
import urlBack from "../../urlBack";
// const urlBack = "https://greeeneable-back.herokuapp.com";

const userActions = {
  userSignUp: (userData) => {
    return async (dispatch, getState) => {
      let res = await axios.post(`${urlBack}/api/auth/signUp`, { userData });
      // {res.data.message.map((message)=> (
      //   toast.error(message.message)
      //   ))}

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
  userSignIn: (loggedUser) => {
    return async (dispatch, getState) => {
      let res = await axios.post(`${urlBack}/api/auth/signIn`, { loggedUser });
      if (res.data.success) {
        localStorage.setItem("token", res.data.response.token);

        dispatch({
          type: "USER",
          payload: {
            loggedUser: res.data.response.userData,
            snackbar: {
              view: true,
              message: res.data.message,
              success: res.data.success,
            },
          },
        });
      } else {
        dispatch({
          type: "MESSAGE",
          payload: {
            view: true,
            message: res.data.message,
            success: res.data.success,
          },
        });
      }
      return res;
    };
  },
  userSignOut: (closeUser) => {
    return async (dispatch, getState) => {
      localStorage.removeItem("token");
      dispatch({
        type: "USER",
        payload: {
          loggedUser: null,
          snackbar: {
            message: "You have signed out.",
            view: true,
            success: true,
          },
        },
      });
    };
  },
  verifyToken: (token) => {
    return async (dispatch, getState) => {
      await axios
        .get(`${urlBack}/api/auth/signInToken`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((user) => {
          if (user.data.success) {
            // console.log(user.data.response)
            dispatch({
              type: "USER",
              payload: {
                loggedUser: user.data.response,
                snackbar: {
                  view: true,
                  message: user.data.response.message,
                  success: user.data.success,
                },
              },
            });
          } else {
            {
              localStorage.removeItem("token");
            }
          }
        })
        .catch((error) => {
          if (error.response.status === 401)
            //token is there but isn't correct
            dispatch({
              type: "MESSAGE",
              payload: {
                view: true,
                message: "Please, sign in once again.",
                success: false,
              },
            });
          localStorage.removeItem("token");
        });
    };
  },
};

export default userActions;
