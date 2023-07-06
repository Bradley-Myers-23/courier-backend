const db = require("../models");
const UserTrip = db.userTrip;
const User = db.user;
const Op = db.Sequelize.Op;
// Create and Save a new UserTrip
exports.create = (req, res) => {
  // Validate request
  if (req.body.headCount === undefined) {
    const error = new Error("Head Count must be specified!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.tripId === undefined) {
    const error = new Error("Trip ID cannot be empty for Users per Trip!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.userId === undefined) {
    const error = new Error(
      "User ID cannot be empty for Users per Trip!"
    );
    error.statusCode = 400;
    throw error;
  }

  // Create a UserTrip
  const userTrip = {
    headCount: req.body.headCount,
    tripId: req.params.tripId,
    userId: req.body.userId,
  };
  // Save UserTrip in the database
  UserTrip.create(userTrip)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the UserTrip.",
      });
    });
};

// Retrieve all Users Trip from the database.
exports.findAll = (req, res) => {
  const userTripId = req.query.userTripId;
  var condition = userTripId
    ? {
        id: {
          [Op.like]: `%${userTripId}%`,
        },
      }
    : null;

  UserTrip.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving UserTrip.",
      });
    });
};

exports.findAllForUserTrip = (req, res) => {
  const tripId = req.params.tripId;
  UserTrip.findAll({
    where: { tripId: tripId },
    include: [
      {
        model: User,
        as: "user",
        required: true,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Users for a Trip.",
      });
    });
};


// Find a single UserTrip with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  UserTripId.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving UserTrip with id=" + id,
      });
    });
};

// Update a UserTrip by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  UserTrip.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "UserTrip was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update UserTrip with id=${id}. Maybe UserTrip was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating UserTrip with id=" + id,
      });
    });
};

// Delete a UserTrip with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  UserTrip.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "UserTrip was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete UserTrip with id=${id}. Maybe UserTrip was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Could not delete UserTrip with id=" + id,
      });
    });
};

// Delete all UserTrips from the database.
exports.deleteAll = (req, res) => {
  UserTrip.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} UserTrips were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all userTrips.",
      });
    });
};
