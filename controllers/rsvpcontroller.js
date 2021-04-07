const { models } = require("../models");
const validateSession = require("../middleware/validateSession");
const router = require("express").Router();

// fetch RSVP by Id
router.get("/fetchrsvp/:id", validateSession, async  function getRsvp() {
  rsvp = {dish:dish, rsvp:rsvp}
  try {
      res = await fetch(rsvp);
      return await res.json(); 
    } catch (err) {
      res.status(500).json({
          message: 'Error fetching rsvp'
      });
  }
})

// Create Rsvp
router.post("/creatersvp", async (req, res) => {
  const {
    dish,
    rsvp,
  
  } = req.body.rsvp;

  try {
    await models.RsvpModel.create({
      dish: dish,
      rsvp: rsvp,
    });

    res.status(201).json({
      message: "New Rsvp Created!",
  
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to create a new Rsvp: ${err}`,
    });
  }
});

router.put("/:id", validateSession, async (req, res) => {
  const {
    dish,
    rsvp, } = req.body.rsvp;
  try {
    models.rsvpModel.update(
      {
        dish: dish,
        rsvp: rsvp,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({
      message: "rsvp successfully updated"
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update rsvp: ${err}`,
    });
  }
});

router.delete('/:id', validateSession, async (req, res) => {
    try{
        await models.rsvpModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "Rsvp Destroyed"
        })
    } catch (err) {
        res.status(500).json({
            message: `Unable to Destroy Rsvp: ${err}`
        })
    }
});

module.exports = router;
