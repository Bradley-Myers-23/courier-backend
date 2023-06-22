module.exports = (app) => {
    const Day = require("../controllers/day.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Day
    router.post("/days/", [authenticateRoute], Day.create);
  
    // Retrieve all Days
    router.get("/days/", Day.findAll);
  
    // Retrieve a single Day with dayId
    router.get("/days/:id", Day.findOne);
  
    // Update an Day with dayId
    router.put("/days/:id", [authenticateRoute], Day.update);
  
    // Delete an Day with dayId
    router.delete("/days/:id", [authenticateRoute], Day.delete);
  
    // Create a new Day
    router.delete("/days/", [authenticateRoute], Day.deleteAll);
  
    app.use("/travelapi", router);
  };
  