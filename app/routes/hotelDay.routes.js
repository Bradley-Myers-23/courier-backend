module.exports = (app) => {
  const HotelDay = require("../controllers/hotelDay.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication");

  // Create a new Trip Hotel for a Trip
  router.post(
    "/trips/:tripId/hotelDays/",
    [authenticateRoute],
    HotelDay.create
  );

  // Retrieve all Trip Hotels
  router.get("/hotelDays/", HotelDay.findAll);

  // Retrieve all Trip Hotels for a Trip
  router.get(
    "/trips/:tripId/hotelDays/",
    HotelDay.findAllForTrip
  );

  // Retrieve all Trip Hotels for a Trip Day and include the hotels
  router.get(
    "/trips/:tripId/tripDays/:tripDayId/hotelDaysWithHotels/",
    HotelDay.findAllForTripDayWithHotels
  );

  // Retrieve a single Trip Hotel with id
  router.get(
    "/trips/:tripId/hotelDays/:id",
    HotelDay.findOne
  );

  // Update a Trip Hotel with id
  router.put(
    "/trips/:tripId/hotelDays/:id",
    [authenticateRoute],
    HotelDay.update
  );

  // Delete a Trip Hotel with id
  router.delete(
    "/trips/:tripId/hotelDays/:id",
    [authenticateRoute],
    HotelDay.delete
  );

  // Delete all Trip Hotels
  router.delete(
    "/hotelDays/",
    [authenticateRoute],
    HotelDay.deleteAll
  );

  app.use("/courierapi", router);
};
