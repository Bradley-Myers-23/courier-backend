module.exports = (sequelize, Sequelize) => {
    const UserTrip = sequelize.define("userTrip", {
      headCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
    return UserTrip;
  };