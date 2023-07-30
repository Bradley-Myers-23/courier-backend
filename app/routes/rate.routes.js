module.exports = (app) => {
    const Rate = require("../controllers/rate.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Rate
    router.post("/rates/",Rate.create);
  
    // Retrieve all Rate
    router.get("/rates/", Rate.findAll);
  
    // Retrieve a single Rate with rateId
    router.get("/rates/:id", Rate.findOne);
  
    // Update an Rate with rateId
    router.put("/rates/:id",Rate.update);
  
    // Delete an Rate with rateId
    router.delete("/rates/:id",Rate.delete);
  
    // Create a new Rate
    router.delete("/rates/",Rate.deleteAll);
  
    app.use("/courierapi", router);
  };
  