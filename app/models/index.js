const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.site = require("./site.model.js")(sequelize, Sequelize);
db.hotel = require("./hotel.model.js")(sequelize, Sequelize);
db.trip = require("./trip.model.js")(sequelize, Sequelize);
db.tripSite = require("./tripSite.model.js")(sequelize, Sequelize);
db.tripDay = require("./tripDay.model.js")(sequelize, Sequelize);
db.userTrip = require("./userTrip.model.js")(sequelize, Sequelize);
db.hotelDay = require("./hotelDay.model.js")(sequelize, Sequelize);

// foreign keys for tripSite
db.tripDay.hasMany(
  db.tripSite,
  { as: "tripSite" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.trip.hasMany(
  db.tripSite,
  { as: "tripSite" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.site.hasMany(
  db.tripSite,
  { as: "tripSite" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.tripSite.belongsTo(
  db.tripDay,
  { as: "tripDay" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.tripSite.belongsTo(
  db.trip,
  { as: "trip" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.tripSite.belongsTo(
  db.site,
  { as: "site" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign keys for hotelDay
db.tripDay.hasMany(
  db.hotelDay,
  { as: "hotelDay" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.trip.hasMany(
  db.hotelDay,
  { as: "hotelDay" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.hotel.hasMany(
  db.hotelDay,
  { as: "hotelDay" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.hotelDay.belongsTo(
  db.tripDay,
  { as: "tripDay" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.hotelDay.belongsTo(
  db.trip,
  { as: "trip" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.hotelDay.belongsTo(
  db.hotel,
  { as: "hotel" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for userTrip
db.userTrip.belongsTo(
  db.trip,
  { as: "trip" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.userTrip.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);


// foreign key for tripDay
db.trip.hasMany(
  db.tripDay,
  { as: "tripDay" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.tripDay.belongsTo(
  db.trip,
  { as: "trip" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);



module.exports = db;
