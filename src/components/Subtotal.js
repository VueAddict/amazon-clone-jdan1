import React from "react";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router";

import "../styles/Subtotal.css";
import { getBasketTotal } from "./context/reducer";
import { useStateValue } from "./context/StateProvider";

function Subtotal() {
  const history = useHistory()
  const [{ basket }, _] = useStateValue();

  return (

    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):
              <strong>
                {" "}
                {value}
              </strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" className="subtotal__checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
