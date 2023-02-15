import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import cartActions from "../redux/actions/cartActions";
import toast from "react-hot-toast";

export default function PayPal({ isValid }) {
  const cart = useSelector((store) => store.productsReducer.cart);
  console.log(cart);
  const loggedUser = useSelector((store) => store.usersReducer.loggedUser);
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  const [orderID, setOrderID] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [details, setDetails] = useState();
  // const [productsCart, setProductsCart] = useState([]);

  const getTotal = (cart) => {
    let Total = cart?.reduce(
      (amount, item) => item.price * item.quantity + amount,
      0
    );

    return Total;
  };
  // console.log(itemsCart);
  useEffect(() => {
    if (!isValid) return;
    PayPalCheckOut();
  }, [cart]);

  const initialOptions = {
    // Genero las opciones para enviarle al CDN
    "client-id":
      "AYDe49tTmuKagE4eZKY9Teuapk_ardpt9UHVUn5mtGXPkSoNc90BoCB46MGAONW6Mc7wTumOFUrMHtfn",
    currency: "USD", //Establesco la moneda
    intent: "capture", //Estableco el metodos este autoriza la operacion y captura los fondos
  };
  // console.log(productsCart);
  function createSummary() {
    const summary = {
      productsCart: cart,
      purchaseId: details.id,
      userId: loggedUser.id || loggedUser._id,
      payer: {
        address: details.payer.adress,
        email_address: details.payer.email_address,
        name: {
          given_name: details.payer.name.given_name,
          surname: details.payer.name.surname,
        },
        payer_id: details.payer.payer_id,
      },
      date: details.create_time,
      amount: getTotal(cart),
      status: details.status,
    };

    let res = dispatch(cartActions.createSummary(summary));
  }

  if (orderID) {
    createSummary();
    dispatch({
      type: "CLEAR_CART",
    });
  }

  const createOrder = (data, actions) => {
    // Creo la orden de con los datos, esta puede ser general o con detalle de items

    return actions.order.create({
      purchase_units: [
        {
          description: "items",
          amount: {
            value: getTotal(cart),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    // recibo el resultado de mi operacion
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
      console.log("Capture result", details, JSON.stringify(details, null, 2)); //veo los datos en consola
      var transaction = details.purchase_units[0].payments.captures[0];

      toast.success(
        "Transaction " +
          transaction.status +
          ": " +
          transaction.id +
          "\n\nSee console for all available details"
      );
      setDetails(details);
      setOrderID(transaction.id);
    });
  };

  const onCancel = (data) => {
    console.log("You have cancelled the payment!", data);
  };

  const onError = (data, actions) => {
    // Capturo error en caso de que exista
    setErrorMessage("An Error occured with your payment ");
  };

  const PayPalCheckOut = () => {
    if (!isValid) return;
    return (
      <PayPalScriptProvider options={initialOptions}>
        {/*Inicializo el CDN*/}
        {/*Inicializo los botones*/}
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          onCancel={onCancel}
        />
      </PayPalScriptProvider>
    );
  };

  return <PayPalCheckOut />;
}
