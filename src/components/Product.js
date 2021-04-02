import React from "react";

import StarIcon from "@material-ui/icons/Star";

import "../styles/Product.css";
import { useStateValue } from "./context/StateProvider";
import { motion } from "framer-motion";

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  };

  return (
    <motion.div
      className="product"
      whileHover={{
        scale: 1.025,
      }}
      transition={{ type: "spring", stiffness: 150, }}
    >
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="product__star" key={i} />
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to Basket</button>
    </motion.div>
  );
}

export default Product;
