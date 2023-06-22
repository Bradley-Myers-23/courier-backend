const db = require("../models");
const Day = db.day;
const Op = db.Sequelize.Op;

// Create and Save a new Day
exports.create = (req, res) => {
  // Validate request
  if (req.body.dayId === undefined) {
    const error = new Error("Id cannot be empty for Day!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.name === undefined) {
    const error = new Error("Day cannot be empty for Day!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("Description cannot be empty for Day!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Day
  const day = {
    dayId: req.body.dayId,
    name: req.body.name,
    description: req.body.description,
  };
  // Save Day in the database
  Day.create(day)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Day.",
      });
    });
};

// Retrieve all Days from the database.
exports.findAll = (req, res) => {
  const dayId = req.query.dayId;
  var condition = dayId
    ? {
        id: {
          [Op.like]: `%${dayId}%`,
        },
      }
    : null;

  Day.findAll({ where: condition, order: [["name", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Days.",
      });
    });
};

// Find a single Day with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Day.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Day with id=" + id,
      });
    });
};

// Update a Day by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Day.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Day was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Day with id=${id}. Maybe Day was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Day with id=" + id,
      });
    });
};

// Delete a Day with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Day.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Day was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Day with id=${id}. Maybe Day was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Day with id=" + id,
      });
    });
};

// Delete all Days from the database.
exports.deleteAll = (req, res) => {
  Day.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Days were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Days.",
      });
    });
};
