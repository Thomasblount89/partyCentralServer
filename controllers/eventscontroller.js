const router = require("express").Router();
const { validateSession } = require("../middleware");
const {models} = require("../models");
// const { models } = require("../models");




//GET ALL of Host's Events
router.get("/allEvents", validateSession, async (req, res) => {
  try {
    await models.EventsModel.findAll({
      events: req.params.events,
    });
    res.status(200).json({
      events: events,
      message: "Captured Events!",
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to retrieve Events: ${err}`,
    });
  }
}); // we also created a host id - will be used for when a user is looking their own events. this creates a slot in the table to locate those events as associated with the host. we can use the where property in this case.

//Create Event
router.post("/createevent", async (req, res) => {
  const {
    eventTitle,
    eventTime,
    eventDate,
    eventLocation,
    hostId,
  } = req.body;

  try {
    await models.EventsModel.create({
      eventTitle: eventTitle,
      eventTime: eventTime,
      eventDate: eventDate,
      eventLocation: eventLocation,
      hostId: hostId
    });

    res.status(201).json({
      message: "New Event Created!",
      eventTitle: eventTitle,
    });
  } catch (err) {
    //   console.log(err)
    res.status(500).json({
      message: `Failed to create a new Event: ${err}`,
    });
  }
});

router.put("/:id", validateSession, async (req, res) => {
  const {
       eventTitle,
        eventTime, 
        eventDate, 
        eventLocation } = req.body;
  try {
    models.EventsModel.update(
      {
        eventTitle: eventTitle,
        eventTime: eventTime,
        eventDate: eventDate,
        eventLocation: eventLocation
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({
      message: "events successfully updated"
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update events: ${err}`,
    });
  }
});

router.delete("/:id", validateSession, async (req, res) => {
    console.log(req)
    try{
        await models.EventsModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "Events Destroyed"
        })
    } catch (err) {
        res.status(500).json({
            message: `Unable to Destroy Event: ${err}`
        })
    }
});
module.exports = router;
