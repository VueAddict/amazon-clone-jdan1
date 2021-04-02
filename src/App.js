import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";

import "./App.css";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import { auth } from "./firebase/firebase.config";
import { useStateValue } from "./components/context/StateProvider";
import Payment from "./components/Payment";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders";

const promise = loadStripe(
  "pk_test_51IbRyEGgxkpYuZlxKLCP7cmcvG6amWJBNvW6Ah5ivbnRExnkLkhEyhVjrDCg9aMi4qsranZ7YTDyudewrU4vUkg200KKpriT9w"
);

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route exact path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
