module.exports = (app) => {
    const Customer = require("../controllers/customer.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new customer
    router.post("/customers/",Customer.create);
  
    // Retrieve all Customers
    router.get("/customers/", Customer.findAll);
   
    // Retrieve a single customer with customerlId
    router.get("/customers/:id", Customer.findOne);
  
    // Update an Customer with CustomerId
    router.put("/customers/:id",Customer.update);
  
    // Delete an Customer with CustomerId
    router.delete("/customers/:id",Customer.delete);
  
    // Delete all customers
    router.delete("/customers/",Customer.deleteAll);
  
    app.use("/courierapi", router);
  };
  
