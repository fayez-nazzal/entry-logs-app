const { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: process.env.SEQUELIZE_DIALECT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

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
