module.exports = (sequelize, Sequelize) => {
  const Site = sequelize.define("site", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Site;
};
