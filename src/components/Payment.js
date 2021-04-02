import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
// import axios from '../api/axios'
import axios from 'axios'

import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";

import { Link, useHistory } from "react-router-dom";
import "../styles/Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { getBasketTotal } from "./context/reducer";
import { useStateValue } from "./context/StateProvider";
 import { db } from '../firebase/firebase.config'

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory()
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `http://localhost:5001/clone-jdan1/us-central1/api/payments/create?total=${getBasketTotal(basket) * 100}`,
      }).catch(err => console.log('err', err.message));
      console.log(response, 'res stripe')
      setClientSecret(response?.data?.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {

        db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set(
          {
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
          }
        )

        setSucceeded(true)
        setError(null)
        setProcessing(false)
        dispatch({
          type: 'EMPTY_BASKET'
        })
        history.push('/orders')
      });
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((product) => (
              <CheckoutProduct {...product} />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? "processing" : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
