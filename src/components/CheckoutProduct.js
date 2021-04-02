import React from "react";

import "../styles/CheckoutProduct.css";

import StarIcon from "@material-ui/icons/Star";
import { useStateValue } from "./context/StateProvider";

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
  
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
      dispatch({
          type: 'REMOVE_FROM_BASKET',
          id,
      })
  };

  return (
    <div className="checkoutProduct">
      <img src={image} alt="" className="checkoutProduct__image" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}-{id}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="checkoutProduct__star" />
            ))}
        </div>
        {!hideButton && <button onClick={removeFromBasket}>Remove from Basket</button>}
      </div>
    </div>
  );
}

export default CheckoutProduct;
