const db = require("../models");
const TripSite = db.tripSite;
const Site = db.site;
const Op = db.Sequelize.Op;
// Create and Save a new TripSite
exports.create = (req, res) => {
  // Validate request
  if (req.body.tripId === undefined) {
    const error = new Error("Trip ID cannot be empty for trip site!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.siteId === undefined) {
    const error = new Error(
      "Site ID cannot be empty for trip site!"
    );
    error.statusCode = 400;
    throw error;
  }

  // Create a TripSite
  const tripSite = {
    quantity: req.body.quantity,
    tripId: req.body.tripId,
    tripDayId: req.body.tripDayId ? req.body.tripDayId : null,
    siteId: req.body.siteId,
  };
  // Save TripSite in the database
  TripSite.create(tripSite)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the TripSite.",
      });
    });
};

// Retrieve all TripSites from the database.
exports.findAll = (req, res) => {
  const tripSiteId = req.query.tripSiteId;
  var condition = tripSiteId
    ? {
        id: {
          [Op.like]: `%${tripSiteId}%`,
        },
      }
    : null;

  TripSite.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving tripSites.",
      });
    });
};

exports.findAllForTrip = (req, res) => {
  const tripId = req.params.tripId;
  TripSite.findAll({
    where: { tripId: tripId },
    include: [
      {
        model: Site,
        as: "site",
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
          "Some error occurred while retrieving tripSites for a trip.",
      });
    });
};

// Find all TripSites for a trip day and include the sites
exports.findAllForTripDayWithSites = (req, res) => {
  const tripDayId = req.params.tripDayId;
  TripSite.findAll({
    where: { tripDayId: tripDayId },
    include: [
      {
        model: Site,
        as: "site",
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
          "Some error occurred while retrieving tripSites for a trip day.",
      });
    });
};

// Find a single TripSite with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  TripSite.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving TripSite with id=" + id,
      });
    });
};

// Update a TripSite by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  TripSite.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "TripSite was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update TripSite with id=${id}. Maybe TripSite was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating TripSite with id=" + id,
      });
    });
};

// Delete a TripSite with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  TripSite.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "TripSite was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete TripSite with id=${id}. Maybe TripSite was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Could not delete TripSite with id=" + id,
      });
    });
};

// Delete all TripSites from the database.
exports.deleteAll = (req, res) => {
  TripSite.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} TripSites were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all tripSites.",
      });
    });
};
