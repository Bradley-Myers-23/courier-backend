module.exports = (app) => {
    const Order = require("../controllers/order.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new order
    router.post("/orders/",Order.create);
  
    // Retrieve all Orders
    router.get("/orders/", Order.findAll);
   
    // Retrieve a single order with orderlId
    router.get("/orders/:id", Order.findOne);
  
    // Update an Order with OrderId
    router.put("/orders/:id",Order.update);
  
    // Delete an Order with OrderId
    router.delete("/orders/:id",Order.delete);
  
    // Delete all roders
    router.delete("/orders/",Order.deleteAll);


// find the order for the carier 
    router.get("/orders/user/:useId", Order.findByUser);
    app.use("/courierapi", router);
  };
  
  
