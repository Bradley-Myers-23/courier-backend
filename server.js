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
  res.json({ message: "Welcome to the courier backend." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/rate.routes")(app);
require("./app/routes/customer.routes")(app);
require("./app/routes/mapData.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3201;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;


// test