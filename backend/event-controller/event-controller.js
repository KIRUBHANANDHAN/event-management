const Event = require("../models/event-model");

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const allEvents = await Event.find();
        if (allEvents.length > 0) {
            return res.status(200).json({
                success: true,
                message: 'All events retrieved successfully',
                data: allEvents
            });
    }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getSingleEventId = async(req, res) => {
    try{
        const currentEventId = req.params.id;

        const event = await Event.findById(currentEventId);

        if(event){
            return res.status(200).json({
                success: true,
                message: 'Event retrieved successfully',
                data: event
            });
        }
        else{
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

const addNewEvent = async(req, res) => {

    try {
        const newEvent = req.body; 

        const event = await Event.create(newEvent);

        if(event){
            return res.status(201).json({
                success: true,
                message: 'Event added successfully',
                data: event
            });
        }
        else{
            return res.status(400).json({
                success: false,
                message: 'Failed to add event'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }

}

const updateEvent = async(req, res) => {
    try{
        const currentEventId = req.params.id;
        const updatedData = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(currentEventId, updatedData, { new: true});
        if(updatedEvent){
            return res.status(200).json({
                success: true,
                message: 'Event updated successfully',
                data: updatedEvent
            });
        }
        else{
            return res.status(404).json({
                success: false,
                message: 'Event not found with the given id'
            });
        }   
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

const deleteEvent = async(req, res) => {
      try{
        const currentEventId = req.params.id;

        const deleteEvent= await Event.findByIdAndDelete(currentEventId);

        if(deleteEvent){
            return res.status(200).json({
                success: true,
                message: 'Event deleted successfully',
                data: deleteEvent
            });
        }
        else{
            return res.status(404).json({
                success: false,
                message: 'Event not deleted'
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

module.exports = {
    getAllEvents,
    getSingleEventId,
    addNewEvent,
    updateEvent,
    deleteEvent
};