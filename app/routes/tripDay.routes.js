module.exports = (app) => {
  const TripDay = require("../controllers/tripDay.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new Trip Day for a Trip
  router.post(
    "/trips/:tripId/tripDays/",
    [authenticateRoute],
    TripDay.create
  );

  // Retrieve all Trip Days
  router.get("/tripDays/", TripDay.findAll);

  // Retrieve all Trip Days for a Trip
  router.get("/trips/:tripId/tripDays/", TripDay.findAllForTrip);

  // Retrieve all Trip Days for a Trip and include the sites
  router.get(
    "/trips/:tripId/tripDaysWithData/",
    TripDay.findAllForTripWithData
  );

  // Retrieve a single Trip Day with id
  router.get("/trips/:tripId/tripDays/:id", TripDay.findOne);

  // Update a Trip Day with id
  router.put(
    "/trips/:tripId/tripDays/:id",
    [authenticateRoute],
    TripDay.update
  );

  // Delete a Trip Day with id
  router.delete(
    "/trips/:tripId/tripDays/:id",
    [authenticateRoute],
    TripDay.delete
  );

  // Delete all Trip Days
  router.delete("/tripDays/", [authenticateRoute], TripDay.deleteAll);

  app.use("/courierapi", router);
};
