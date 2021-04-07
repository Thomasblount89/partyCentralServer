const {DataTypes} = require('sequelize');
const db = require('../db');

const Events = db.define ('events' , {
   
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
    eventTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eventTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eventDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    eventLocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
        hostId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Events;
