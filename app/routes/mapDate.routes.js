module.exports = (app) => {
    const MapData = require("../controllers/mapData.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    router.get("/mapDatas/", MapData.findAll);
  
    app.use("/courierapi", router);
  };
  