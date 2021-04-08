const router = require("express").Router();
const { validateSession } = require("../middleware");
const {models} = require("../models");
// const { models } = require("../models");




//GET ALL of Host's Events
router.get("/:hostId", validateSession, async (req, res) => {
  try {

    const allHostsEvents = await models.EventsModel.findAll({
      
    where: {
          hostId: req.params.hostId
      }
    });
   
    res.status(200).json({
      events: allHostsEvents
    });

  } catch (err) {
    res.status(500).json({
      message: `Failed to retrieve all of Host's Events: ${err}`,
    });
  }
});

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

router.put("/edit/:id", validateSession, async (req, res) => {
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

//delete by id
router.delete("/delete/:id", validateSession, async (req, res) => {

    try{
       const deleteEvent = await models.EventsModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
          message: 'event destroyed',
            events: deleteEvent
        })
    } catch (err) {
        res.status(500).json({
            message: `Unable to Destroy Event: ${err}`
        })
    }
});
module.exports = router;
