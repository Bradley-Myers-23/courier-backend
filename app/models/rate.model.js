module.exports = (sequelize, Sequelize) => {
    const Rate = sequelize.define("rate", {
      pricePerBlock: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      IntialPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      CancelFee: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      Bonus: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      
    });
    return Rate;
  };
  
  