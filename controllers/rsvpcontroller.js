const { models } = require("../models");
const validateSession = require("../middleware/validateSession");
const router = require("express").Router();

// fetch RSVP by Id?  
router.get('/id/:id', async (req, res) => {
 
  try{
       const RsvpById = await models.RsvpModel.findOne({
          where: {
              id: req.params.id
          }
      });
      
   res.status(200).json({
      Rsvp: RsvpById
   })

  } catch (err) {
      res.status(500).json ({
          message:`Failed to retrieve RsvpId: ${err}`
      })
  }
})

// Create Rsvp
router.post("/creatersvp", validateSession, async (req, res) => {
  const {
    Dish,
    Rsvp,
    HostId
  } = req.body;
  

  try {
    await models.RsvpModel.create({
      Dish: Dish,
      Rsvp: Rsvp,
      HostId: HostId
    });
    console.log(Dish)

    res.status(201).json({
      message: "New Rsvp Created!",
      Dish: Dish,
      Rsvp: Rsvp

  
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: `Failed to create a new Rsvp: ${err}`,
    });
  }
});

//update rsvp
router.put("/edit/:id", validateSession, async (req, res) => {
  const {
    Dish,
    Rsvp,
    HostId
  } = req.body;
  try {
    models.RsvpModel.update(
      {
        Dish: Dish,
        Rsvp: Rsvp,
        HostId: HostId
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({
      message: "rsvp successfully updated",
      Dish: Dish,
      Rsvp: Rsvp,
      HostId: HostId
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update rsvp: ${err}`,
    });
  }
});

// delete rsvp
router.delete('/id/:id', validateSession, async (req, res) => {
    try{
      const deleteRsvp =  await models.RsvpModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "Rsvp Destroyed",
            Rsvp: deleteRsvp
        })
    } catch (err) {
        res.status(500).json({
            message: `Unable to Destroy Rsvp: ${err}`
        })
    }
});

module.exports = router;
