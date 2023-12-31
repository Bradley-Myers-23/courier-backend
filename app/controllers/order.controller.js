const db = require("../models");
const Order = db.order;
const Customer = db.customer;
const Op = db.Sequelize.Op;
const mapData = require("./mapData.controller.js");
const rate = require("./rate.controller.js");
var routePath;
var routeDistance = [];
var initialRate;
var pricePerBlockRate;
var totalPrice;

async function getRates() {
  try {
    const rates = await rate.getRates();
    initialRate = rates.initialRate;
    pricePerBlockRate = rates.pricePerBlockRate;
    console.log("intial rates ----------------------", initialRate, pricePerBlockRate);
  } catch (error) {
    console.error("Error getting rates:", error.message);
  }
}

async function getRouteAndDistance(startAddress, endAddress) {
  await getRates();
  return new Promise((resolve, reject) => {
    const req = {
      query: {
        mapDataId: null,
      },
      body: {
        startAddress: startAddress,
        endAddress: endAddress,
      },
    };

    const res = {
      send: (result) => {
        // The "result" object will have the path and distance, and textDirections added to it.
        routePath = result.textDirections;
        routeDistance = result.distance;
        console.log("From getRouteAndDistance --------------------------",result.textDirections )
        if (routeDistance != null) {
          totalPrice = initialRate + (routeDistance * pricePerBlockRate);
          console.log(totalPrice, initialRate, routeDistance, pricePerBlockRate);
        }
        else {
          totalPrice = initialRate;
        }
        resolve({ routePath, routeDistance });
      },
      status: (statusCode) => {
        return {
          send: (data) => {
            console.log(`Error: Status ${statusCode}, Data:`, data);
            reject(new Error(`Error: Status ${statusCode}, Data: ${data}`));
          },
        };
      },
    };

    mapData.findAll(req, res);
  });
}

// Create and Save a new Order
exports.create = async (req, res) => {
  // Validate request
  if (req.body.pickupTime === undefined) {
    const error = new Error("PickupTime cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.dropoffTime === undefined) {
    const error = new Error("DropoffTime cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.pickupLocation === undefined) {
    const error = new Error("Pickup Location cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  }

  else if (req.body.dropoffLocation === undefined) {
    const error = new Error("Dropoff Location cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  }
  else if (req.body.status === undefined) {
    const error = new Error("Status cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  }
  else if (req.body.customerId === undefined) {
    const error = new Error("Customer cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  }

  try {
    await getRouteAndDistance(req.body.pickupLocation, req.body.dropoffLocation);
    const routeString = JSON.stringify(routePath);

   // Create a order
  const order = {
    pickupTime: req.body.pickupTime,
    dropoffTime: req.body.dropoffTime,
    pickupLocation: req.body.pickupLocation,
    dropoffLocation: req.body.dropoffLocation,
    status: req.body.status,
    customerId: req.body.customerId,
    userId: req.body.userId,
    route:  routeString,
    price: totalPrice,
  };

  

    // Save Order in the database
    Order.create(order)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Order.",
        });
      });
  } catch (error) {
    console.error(error.message);
    console.log("aaaaaaaaaaaaa");
  }
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  const orderId = req.query.orderId;
  var condition = orderId
    ? {
        id: {
          [Op.like]: `%${orderId}%`,
        },
      }
    : null;

  Order.findAll({ where: condition, order: [["id", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Find a single Order with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Order with id=" + id,
      });
    });
};

// Update a Order by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    await getRouteAndDistance(req.body.pickupLocation, req.body.dropoffLocation);
    const routeString = JSON.stringify(routePath);

    req.body.route = routeString;
    if (req.body.status !== 'Cancelled') {
      req.body.price = totalPrice;
      };

  Order.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Order with id=${id}. Maybe order was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Order with id=" + id,
      });
    });
  } catch (error) {
    console.error(error.message);
    console.log("aaaaaaaaaaaaa");
  }
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Order was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Order with id=" + id,
      });
    });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  Order.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Orders were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders.",
      });
    });
};

exports.findByUser = (req, res) => {
  const userId = req.params.useId;

  Order.findAll({
    where: { userId: userId },
    include: [
      {
        model: Customer,
        as: "customer",
        required: true,
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with email=" + email,
      });
    });
};


