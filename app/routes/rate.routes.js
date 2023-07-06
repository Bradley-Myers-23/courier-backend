module.exports = (app) => {
    const Hotel = require("../controllers/rate.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Hotel
    router.post("/rates/",Hotel.create);
  
    // Retrieve all Hotel
    router.get("/rates/", Hotel.findAll);
  
    // Retrieve a single Hotel with rateId
    router.get("/rates/:id", Hotel.findOne);
  
    // Update an Hotel with rateId
    router.put("/rates/:id",Hotel.update);
  
    // Delete an Hotel with rateId
    router.delete("/rates/:id",Hotel.delete);
  
    // Create a new Hotel
    router.delete("/rates/",Hotel.deleteAll);
  
    app.use("/courierapi", router);
  };
  