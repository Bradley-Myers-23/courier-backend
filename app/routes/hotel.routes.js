module.exports = (app) => {
  const Hotel = require("../controllers/hotel.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Hotel
  router.post("/hotels/",Hotel.create);

  // Retrieve all Hotel
  router.get("/hotels/", Hotel.findAll);

  // Retrieve a single Hotel with hotelId
  router.get("/hotels/:id", Hotel.findOne);

  // Update an Hotel with hotelId
  router.put("/hotels/:id",Hotel.update);

  // Delete an Hotel with hotelId
  router.delete("/hotels/:id",Hotel.delete);

  // Create a new Hotel
  router.delete("/hotels/",Hotel.deleteAll);

  app.use("/courierapi", router);
};
