module.exports = (sequelize, Sequelize) => {
    const Day = sequelize.define("day", {
      dayId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return Day;
  };
  