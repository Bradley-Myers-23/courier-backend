require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json({limit: '50mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the travel backend." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/site.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/hotel.routes")(app);
require("./app/routes/trip.routes")(app);
require("./app/routes/tripSite.routes")(app);
require("./app/routes/tripDay.routes")(app);
require("./app/routes/userTrip.routes")(app);
require("./app/routes/hotelDay.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/customer.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3202;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;


// test