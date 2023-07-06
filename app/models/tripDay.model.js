module.exports = (sequelize, Sequelize) => {
  const TripDay = sequelize.define("tripDay", {
    dayNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return TripDay;
};
