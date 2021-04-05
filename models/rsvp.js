const { Datatypes } = require("sequelize");
const db = require("../db.js");

const user = db.define("user", {
  nameOfUser: {},
});
