const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

const stripe = require("stripe")("sk_test_5MVAh9usJw9HuvGOrfMBYEd4");

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/counter", require("./routes/api/counter"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/uploads", express.static("uploads"));

app.post("/charge", async (req, res) => {
  try {
    console.log(`body ${req.body.amount}`);
    let { status } = stripe.charges.create({
      amount: req.body.amount * 1000,
      currency: "usd",
      description: "An example charge",
      source: req.body.token.id
    });

    res.json({ status });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
