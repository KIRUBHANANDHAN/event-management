const express = require('express');

const router = express.Router();


const {getAllEvents,
    getSingleEventId,
    addNewEvent,
    updateEvent,
    deleteEvent} = require("../event-controller/event-controller");

//all 
router.get('/events',getAllEvents);
//single
router.get('/events/:id',getSingleEventId);
//create
router.post('/add',addNewEvent);
//update
router.put('/update/:id',updateEvent);
//delete
router.delete('/delete/:id',deleteEvent);

module.exports = router;