
module.exports = (sequelize, Sequelize) => {
const MapData = sequelize.define("mapData", {
  Address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  AdjacentAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Direction: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  OnStreet: {
    type: Sequelize.STRING,
    allowNull: true,
  },
 
});

};