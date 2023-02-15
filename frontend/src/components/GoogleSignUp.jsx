import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import userActions from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { toast } from 'react-toastify';

export default function GoogleSignUp({ props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleCallbackResponse(response) {
    let userObject = jwt_decode(response.credential);
    let res = await dispatch(
      userActions.userSignUp({
        //   fullName: userObject.name,
        //   email: userObject.email,
        //   password: userObject.sub,
        //   userPicture: userObject.picture,
        //   from: 'google'
        firstName: userObject.given_name,
        lastName: userObject.family_name,
        email: userObject.email,
        password: userObject.sub,
        photo: userObject.picture,
        country: props,
        from: "google",
        role: "user",
      })
    );

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
    // if (res) {
    //   try {
    //     toast.success(res.data.message, {
    //       position: "top-center",
    //       autoClose: 7000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       });
    //     navigate('/index', {replace:true})
    //   } catch(error) {

    //     console.log(error);
    //   }
    // } else {
    //   toast.error(res.data.message, {
    //     position: "top-center",
    //     autoClose: 7000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     });
    //   return res
    // }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "496650414327-4dd3hsav2d4f0ah3bor7nimgisgqithn.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "medium",
      locale: "en",
    });
  });

  return (
    <div>
      <div id="buttonDiv"></div>
    </div>
  );
}
