const db = require("../db");

const UserModel = require("./user");
const EventsModel = require("./events");
const RsvpModel = require("./rsvp")

UserModel.hasMany(EventsModel);
UserModel.hasMany(RsvpModel);


// EventsModel.belongsTo(UserModel);
EventsModel.belongsTo(UserModel, {
  foreignKey: {
    name: 'hostId'
  }
});

EventsModel.hasMany(RsvpModel);

// RsvpModel.belongsTo(UserModel);
RsvpModel.belongsTo(UserModel, {
  foreignKey: {
    name: 'userId'
  }
});

// RsvpModel.belongsTo(EventsModel);
RsvpModel.belongsTo(EventsModel, {
  foreignKey: {
    name: 'eventId'
  }
});







module.exports = {
  dbConnection: db,
  models: {
    UserModel,
    EventsModel,
    RsvpModel
  },
};

