module.exports = (app) => {
  const Site = require("../controllers/site.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Site
  router.post("/sites/", [authenticateRoute], Site.create);

  // Retrieve all Site
  router.get("/sites/", Site.findAll);

  // Retrieve a single Site with siteId
  router.get("/sites/:id", Site.findOne);

  // Update an Site with siteId
  router.put("/sites/:id", [authenticateRoute], Site.update);

  // Delete an Site with siteId
  router.delete("/sites/:id", [authenticateRoute], Site.delete);

  // Create a new Site
  router.delete("/sites/", [authenticateRoute], Site.deleteAll);

  app.use("/travelapi", router);
};
