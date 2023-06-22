module.exports = (sequelize, Sequelize) => {
  const Hotel = sequelize.define("hotel", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    
    PhoneNumber: {
      type: Sequelize.STRING(10), // Set the maximum length to 10 characters
      allowNull: false,
      validate: {
        len: {
          args: [10, 10], // Validate that the length is exactly 10 characters
          msg: 'Phone number must be exactly 10 characters long',
        },
      },
    },
    Address1: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Address2: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    State: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    City: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ZipCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Hotel;
};

