const { models } = require("../models");
const validateSession = require("../middleware/validateSession");
const router = require("express").Router();


// get rsvp by all 
router.get('/', validateSession , async (req, res) => {
  try{
    const allRsvps = await models.RsvpModel.findAll({
      include: [
        models.UserModel,
        models.EventsModel
      ]
    });
   
res.status(200).json({
   events: allRsvps
})

} catch (err) {
   res.status(500).json ({
       message:`Failed to retrieve all the rsvps: ${err}`
   })
}
})

// fetch rsvp by Id?
router.get("/id/:id", async (req, res) => {
  try {
    const rsvpById = await models.RsvpModel.findOne({
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
  if(req.user.role === true){
    const deleteRsvp = await models.UserModel.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({
      message: 'Rsvp destroyed',
        user: deleteRsvp
    })
}else{
    res.status(402).json({
        message: 'reserved for admin only'
      })
}

} catch (err) {
res.status(500).json({
    message: `Unable to Destroy Rsvp: ${err}`
})
}
});

module.exports = router;
