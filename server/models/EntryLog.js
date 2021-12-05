const { Sequelize } = require("sequelize/dist");

const db = require("../config/postgres");

const EntryLog = db.define(
  "entrylogs",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    startDateTime: {
      type: Sequelize.DATE,
    },
    endDateTime: {
      type: Sequelize.DATE,
    },
    description: {
      type: Sequelize.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = EntryLog;
