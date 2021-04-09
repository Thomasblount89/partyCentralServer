const { DataTypes } = require("sequelize");
const db = require("../db");

const Rsvp = db.define("rsvp", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  Dish: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Rsvp: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  HostId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Rsvp;
