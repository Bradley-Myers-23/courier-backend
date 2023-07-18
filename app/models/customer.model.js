module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
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

    name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    address: {
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      Instructions: {
        type: Sequelize.STRING,
        allowNull: true,
      },   
      Location: {
        type: Sequelize.STRING,
        allowNull: true,
      },   
    });
    return Customer;
  };
  