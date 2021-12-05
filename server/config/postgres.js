const { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize(
  process.env.SEQUELIZE_DB,
  process.env.SEQUELIZE_USER,
  process.env.SEQUELIZE_USER_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: process.env.SEQUELIZE_DIALECT,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const queryInterface = db.getQueryInterface();

queryInterface.createTable("entrylogs", {
  id: DataTypes.UUID,
  startDateTime: DataTypes.DATE,
  endDateTime: DataTypes.DATE,
  description: DataTypes.TEXT,
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = db;
