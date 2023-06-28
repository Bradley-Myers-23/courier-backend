module.exports = (sequelize, Sequelize) => {
  const Trip = sequelize.define("trip", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: 
    {
      type: Sequelize.STRING,
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },

  });
  return Trip;
};

