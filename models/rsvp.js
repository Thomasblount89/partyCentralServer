const { DataTypes } = require("sequelize");
const db = require("../db");

const Rsvp = db.define("rsvp", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  dish: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rsvp: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.UUID,
    allowNull: false,
  }
});

module.exports = Rsvp;
