const db = require("../models");
const HotelDay = db.hotelDay;
const Hotel = db.hotel;
const Op = db.Sequelize.Op;
// Create and Save a new HotelDay
exports.create = (req, res) => {
  // Validate request
  if (req.body.tripId === undefined) {
    const error = new Error("Trip ID cannot be empty for trip hotel!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.hotelId === undefined) {
    const error = new Error(
      "Hotel ID cannot be empty for trip hotel!"
    );
    error.statusCode = 400;
    throw error;
  }

  // Create a HotelDay
  const hotelDay = {
    quantity: req.body.quantity,
    tripId: req.body.tripId,
    tripDayId: req.body.tripDayId ? req.body.tripDayId : null,
    hotelId: req.body.hotelId,
  };
  // Save HotelDay in the database
  HotelDay.create(hotelDay)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the HotelDay.",
      });
    });
};

// Retrieve all HotelDays from the database.
exports.findAll = (req, res) => {
  const hotelDayId = req.query.hotelDayId;
  var condition = hotelDayId
    ? {
        id: {
          [Op.like]: `%${hotelDayId}%`,
        },
      }
    : null;

  HotelDay.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving hotelDays.",
      });
    });
};

exports.findAllForTrip = (req, res) => {
  const tripId = req.params.tripId;
  HotelDay.findAll({
    where: { tripId: tripId },
    include: [
      {
        model: Hotel,
        as: "hotel",
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
          "Some error occurred while retrieving hotelDays for a trip.",
      });
    });
};

// Find all HotelDays for a trip day and include the hotels
exports.findAllForTripDayWithHotels = (req, res) => {
  const tripDayId = req.params.tripDayId;
  HotelDay.findAll({
    where: { tripDayId: tripDayId },
    include: [
      {
        model: Hotel,
        as: "hotel",
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
          "Some error occurred while retrieving hotelDays for a trip day.",
      });
    });
};

// Find a single HotelDay with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  HotelDay.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving HotelDay with id=" + id,
      });
    });
};

// Update a HotelDay by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  HotelDay.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "HotelDay was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update HotelDay with id=${id}. Maybe HotelDay was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating HotelDay with id=" + id,
      });
    });
};

// Delete a HotelDay with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  HotelDay.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "HotelDay was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete HotelDay with id=${id}. Maybe HotelDay was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Could not delete HotelDay with id=" + id,
      });
    });
};

// Delete all HotelDays from the database.
exports.deleteAll = (req, res) => {
  HotelDay.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} HotelDays were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all hotelDays.",
      });
    });
};
