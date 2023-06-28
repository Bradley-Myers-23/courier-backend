module.exports = (app) => {
    const UserTrip = require("../controllers/userTrip.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new UserTrip for a Trip
    router.post(
      "/trips/:tripId/userTrips/",
      [authenticateRoute],
      UserTrip.create
    );
  
    // Retrieve all User Trips
    router.get("/userTrips/", UserTrip.findAll);
  
    // Retrieve all User for a Trip
    router.get(
      "/trips/:tripId/userTrips/",
      UserTrip.findAllForUserTrip
    );
  
     
    // Retrieve a single User Trip with id
    router.get(
      "/trips/:tripId/userTrips/:id",
      UserTrip.findOne
    );
  
    // Update a User Trip with id
    router.put(
        "/trips/:tripId/userTrips/:id",
      [authenticateRoute],
      UserTrip.update
    );
  
    // Delete a User Trip with id
    router.delete(
        "/trips/:tripId/userTrips/:id",
      [authenticateRoute],
      UserTrip.delete
    );
  
    // Delete all User Trips
    router.delete(
      "/userTrips/",
      [authenticateRoute],
      UserTrip.deleteAll
    );
  
    app.use("/courierapi", router);
  };
  