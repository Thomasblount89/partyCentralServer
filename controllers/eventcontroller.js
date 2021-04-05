const router = require('express').Router();
const { validateSession } = require('../middleware');
const { eventModel } = require('../models');

//GET ALL BY USER
router.get('/allEvents', validateSession, async (req, res) => {
    try{
        const events = await EventModel.findAll({
            where: {
                event_id: req.user.id
            }
        });
        res.status(200).json({
            message: 'Captured Events!',
            
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to retrieve Events: ${err}`
        })
    }
});