module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      pickupTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dropoffTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      pickupLocation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dropoffLocation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      route: {
        type: Sequelize.STRING,
        allowNull: true,
      },    
    });
    return Order;
  };
  