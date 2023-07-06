const db = require("../models");
const Trip = db.trip;
const TripDay = db.tripDay;
const TripSite = db.tripSite;
const HotelDay = db.hotelDay;
const Site = db.site;
const Hotel = db.hotel;
const Op = db.Sequelize.Op;
// Create and Save a new trip
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.startDate === undefined) {
    const error = new Error("Start Date cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.endDate === undefined) {
    const error = new Error("End Date cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.userId === undefined) {
    const error = new Error("User Id cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  }

  // Create a trip
  const trip = {
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    userId: req.body.userId,
  };
  // Save trip in the database
  Trip.create(trip)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the trip.",
      });
    });
};

// Find all trips for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Trip.findAll({
    where: { userId: userId },
    include: [
      {
        model: TripDay,
        as: "tripDay",
        required: false,
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
          },
        ],
      },
    ],
    order: [
      ["name", "ASC"],
      [TripDay, "dayNumber", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find trips for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving trips for user with id=" + userId,
      });
    });
};

// Find all Published trips
exports.findAllPublished = (req, res) => {
  Trip.findAll({
    include: [
      {
        model: TripDay,
        as: "tripDay",
        required: false,
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
          },
        ],
      },
    ],
    order: [
      ["name", "ASC"],
      [TripDay, "dayNumber", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Published trips.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Published trips.",
      });
    });
};

// Find a single trip with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Trip.findAll({
    where: { id: id },
    include: [
      {
        model: TripDay,
        as: "tripDay",
        required: false,
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
          },
        ],
      },
    ],
    order: [[TripDay, "dayNumber", "ASC"]],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find trip with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving trip with id=" + id,
      });
    });
};
// Update a trip by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Trip.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "trip was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update trip with id=${id}. Maybe trip was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating trip with id=" + id,
      });
    });
};
// Delete a trip with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Trip.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "trip was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete trip with id=${id}. Maybe trip was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete trip with id=" + id,
      });
    });
};
// Delete all trips from the database.
exports.deleteAll = (req, res) => {
  Trip.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} trips were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all trips.",
      });
    });
};