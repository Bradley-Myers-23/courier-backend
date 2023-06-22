module.exports = (app) => {
    const Trip = require("../controllers/trip.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Trip
    router.post("/trips/",Trip.create);
  
    // Retrieve all Trip
    router.get("/trips/", Trip.findAll);
  
    // Retrieve a single Trip with tripId
    router.get("/trips/:id", Trip.findOne);
  
    // Update an Trip with tripId
    router.put("/trips/:id",Trip.update);
  
    // Delete an Trip with tripId
    router.delete("/trips/:id",Trip.delete);
  
    // Create a new Trip
    router.delete("/trips/",Trip.deleteAll);
  
    app.use("/travelapi", router);
  };
  