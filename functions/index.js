const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51IbRyEGgxkpYuZlxAAWlQc5azgJGksFfvckM0wcTbAbBS978Bv4Zz91o5B36DfJ6ZqwzDXD1bbsou9fXra2KktkO00I0TtUW50"
);
const app = express();

app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello guest");
});

app.post("/payments/create", async (req, res) => {
  const { total } = req.query;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
      clientSecret: paymentIntent.client_secret   
  })
});

exports.api = functions.https.onRequest(app);
