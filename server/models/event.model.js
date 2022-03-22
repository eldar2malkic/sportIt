const mongoose = require('mongoose');

const SportAppSchema = new mongoose.Schema({

    eventName: {
        type: String,
        required: [true, "Event name is required field"],
        minlength: [3, "Event name has to be at least 3 characters long"],
    },

    locationName: {
        type: String,
        required: [true, "Location name is required field"],
        minlength: [3, "Location name has to be at least 3 characters long"],
    },

    maxAttendees: {
        type: Number,
        required: [true, "Attendees is required field"]
    },

    date: {
        type: String,
        required: [true, "You forgot to enter date for your event"]
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Event = mongoose.model("Event", SportAppSchema);

module.exports = Event;