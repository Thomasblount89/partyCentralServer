const db = require("../db");

const UserModel = require("./user");
const EventsModel = require("./events");
const RsvpModel = require("./rsvp")

UserModel.hasMany(EventsModel);
UserModel.hasMany(RsvpModel);

EventsModel.belongsTo(UserModel);
EventsModel.hasMany(RsvpModel);

RsvpModel.belongsTo(UserModel);
RsvpModel.belongsTo(EventsModel);



module.exports = {
  dbConnection: db,
  models: {
    UserModel,
    EventsModel,
    RsvpModel
  },
};

