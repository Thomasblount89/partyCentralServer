const { models } = require("../models");
const validateSession = require("../middleware/validateSession");
const router = require("express").Router();

// fetch rsvp by Id?
router.get("/id/:id", async (req, res) => {
  try {
    const rsvpById = await models.rsvpModel.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      rsvp: rsvpById,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to retrieve rsvpId: ${err}`,
    });
  }
});

// Create rsvp
router.post("/creatersvp/:eventId", validateSession, async (req, res) => {
  const { dish, rsvp, userId, eventId } = req.body;

  try {
    await models.RsvpModel.create({
      dish: dish,
      rsvp: rsvp,
      userId: req.user.id,
      eventId: req.params.eventId
    });
    console.log(dish);

    res.status(201).json({
      message: "New rsvp Created!",
      dish: dish,
      rsvp: rsvp,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Failed to create a new rsvp: ${err}`,
    });
  }
});

//update rsvp
router.put("/edit/:id", validateSession, async (req, res) => {
  const { dish, rsvp, userId, eventId } = req.body;
  try {
    models.RsvpModel.update(
      {
        dish: dish,
        rsvp: rsvp,
        userId: userId,
        eventId: eventId
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({
      message: "rsvp successfully updated",
      dish: dish,
      rsvp: rsvp,
      userId: userId,
      eventId: eventId
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update rsvp: ${err}`,
    });
  }
});

// delete rsvp
router.delete("/delete/id/:id", validateSession, async (req, res) => {
  try {
    const deletersvp = await models.RsvpModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "rsvp Destroyed",
      rsvp: deletersvp
    });
  } catch (err) {
    res.status(500).json({
      message: `Unable to Destroy rsvp: ${err}`,
    });
  }
});

module.exports = router;
