import React from "react";


import "../styles/Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./context/StateProvider";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket, user }, _] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB23492668_.jpg"
          alt=""
          className="checkout__ad"
        />
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          
            {basket.map((product) => (
              <CheckoutProduct {...product} />
            ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
