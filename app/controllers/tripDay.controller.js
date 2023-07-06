const db = require("../models");
const TripDay = db.tripDay;
const TripSite = db.tripSite;
const HotelDay = db.hotelDay;
const Site = db.site;
const Hotel = db.hotel;
const Op = db.Sequelize.Op;
// Create and Save a new TripDay
exports.create = (req, res) => {
  // Validate request
  if (req.body.dayNumber === undefined) {
    const error = new Error("Day number cannot be empty for trip day!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.tripId === undefined) {
    const error = new Error("Trip ID cannot be empty for trip day!");
    error.statusCode = 400;
    throw error;
  }

  // Create a TripDay
  const tripDay = {
    dayNumber: req.body.dayNumber,
    tripId: req.body.tripId,
    description: req.body.description,
  };
  // Save TripDay in the database
  TripDay.create(tripDay)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TripDay.",
      });
    });
};
// Retrieve all TripDays from the database.
exports.findAll = (req, res) => {
  const tripDayId = req.query.tripDayId;
  var condition = tripDayId
    ? {
        id: {
          [Op.like]: `%${tripDayId}%`,
        },
      }
    : null;

  TripDay.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tripDays.",
      });
    });
};

// Retrieve all TripDays for a trip from the database.
exports.findAllForTrip = (req, res) => {
  const tripId = req.params.tripId;

  TripDay.findAll({
    where: { tripId: tripId },
    order: [["dayNumber", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving tripDays for a trip.",
      });
    });
};

// Find all TripDays for a trip and include the sites
exports.findAllForTripWithData = (req, res) => {
  const tripId = req.params.tripId;
  TripDay.findAll({
    where: { tripId: tripId },
    include: [
      {
        model: TripSite,
        as: "tripSite",
        required: false,
        include: [
          {
            model: Site,
            as: "site",
            required: false,
          },
        ],
      },
      {
        model: HotelDay,
        as: "hotelDay",
        required: false,
        include: [
          {
            model: Hotel,
            as: "hotel",
            required: false,
          },
        ],
      }
    ],
    order: [["dayNumber", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving data for a trip day.",
      });
    });
};

// Find a single TripDay with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  TripDay.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find TripDay with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving TripDay with id=" + id,
      });
    });
};
// Update a TripDay by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  TripDay.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "TripDay was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update TripDay with id=${id}. Maybe TripDay was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating TripDay with id=" + id,
      });
    });
};
// Delete a TripDay with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  TripDay.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "TripDay was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete TripDay with id=${id}. Maybe TripDay was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete TripDay with id=" + id,
      });
    });
};
// Delete all TripDays from the database.
exports.deleteAll = (req, res) => {
  TripDay.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} TripDays were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tripDays.",
      });
    });
};
