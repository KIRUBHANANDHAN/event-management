const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Event title is required']
    },
    date: { 
        type: Date, 
        required: [true, 'Event date is required'] 
    },
    location: { 
        type: String,
         required:  [true, 'Event location is required'] 
        },
    description: {
         type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});


module.exports = mongoose.model('Event', eventSchema);
