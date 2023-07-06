module.exports = (sequelize, Sequelize) => {
    const Rate = sequelize.define("rate", {
      pricePerBlock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      IntialPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      CancelFee: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Bonus: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      
    });
    return Rate;
  };
  
  