module.exports = (app) => {
  const Trip = require("../controllers/trip.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new trip
  router.post("/trips/", [authenticateRoute], Trip.create);

  // Retrieve all published trips
  router.get("/trips/", Trip.findAllPublished);

  // Retrieve a single trip with id
  router.get("/trips/:id", Trip.findOne);

  // Update a trip with id
  router.put("/trips/:id", [authenticateRoute], Trip.update);

  // Delete a trip with id
  router.delete("/trips/:id", [authenticateRoute], Trip.delete);

  // Delete all trips
  router.delete("/trips/", [authenticateRoute], Trip.deleteAll);

  app.use("/courierapi", router);
};