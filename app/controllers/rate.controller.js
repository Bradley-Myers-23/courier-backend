const db = require("../models");
const Rate = db.rate;
const Op = db.Sequelize.Op;

// Create and Save a new Rate
exports.create = (req, res) => {
  // Validate request
  if (req.body.pricePerBlock === undefined) {
    const error = new Error("pricePerBlock cannot be empty for rate!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.IntialPrice === undefined) {
    const error = new Error("IntialPrice cannot be empty for rate!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.CancelFee === undefined) {
    const error = new Error("CancelFee  unit cannot be empty for rate!");
    error.statusCode = 400;
    throw error;
  }

  else if (req.body.Bonus === undefined) {
    const error = new Error("Bonus unit cannot be empty for rate!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Rate
  const rate = {
    pricePerBlock: req.body.pricePerBlock,
    IntialPrice: req.body.IntialPrice,
    CancelFee: req.body.CancelFee,
    Bonus: req.body.Bonus,
    
  };
  // Save Rate in the database
  Rate.create(rate)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Rate.",
      });
    });
};

// Retrieve all Hotels from the database.
exports.findAll = (req, res) => {
  const rateId = req.query.rateId;
  var condition = rateId
    ? {
        id: {
          [Op.like]: `%${rateId}%`,
        },
      }
    : null;

  Rate.findAll({ where: condition})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rates.",
      });
    });
};

// Find a single Rate with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Rate.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Rate with id=" + id,
      });
    });
};

// Update a Rate by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Rate.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Rate was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Rate with id=${id}. Maybe Rate was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Rate with id=" + id,
      });
    });
};

// Delete a Rate with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Rate.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Rate was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Rate with id=${id}. Maybe Rate was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Rate with id=" + id,
      });
    });
};

// Delete all Hotels from the database.
exports.deleteAll = (req, res) => {
  Rate.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Hotels were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all rates.",
      });
    });
};
