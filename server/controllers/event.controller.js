const jwt = require('jsonwebtoken');
const Event = require('../models/event.model');
const User = require('../models/user.model');


const createEvent = (req, res) => {

    const newEventObject = new Event(req.body);

    // const decodedJWT = jwt.decode(req.cookies.usertoken,{
    //     complete: true
    // })
    // newEventObject.createdBy = decodedJWT.payload.id

    newEventObject.createdBy = req.jwtpayload.id


    newEventObject.save(req.body)
    .then(newEvent => res.json(newEvent))
    .catch(err => res.status(400).json(err));
}

const findAllEvents = (req, res) => {
    Event.find().collation({locale: 'en', strength: 2}).sort({eventName: 1})
    .populate("createdBy", "_id firstName lastName email")
    .then(allEvents => res.json(allEvents))
    .catch(err => res.status(400).json(err));
}

const findEventById = (req, res) => {
    Event.findOne({_id:req.params._id})
    .populate("createdBy", "_id")
    .then(oneEvent => res.json(oneEvent))
    .catch(err => res.status(400).json(err));
}

const updateEvent = (req, res) => {
    Event.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true, runValidators: true})
    .then(updatedEvent => res.json(updatedEvent))
    .catch(err => res.status(400).json(err));
}

const deleteEvent = (req, res) => {
    Event.deleteOne({_id:req.params.id})
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch( err => res.status(400).json(err));
}

const findAllEventsByUser = (req, res) => {
    if(req.jwtpayload._id !== req.params._id){
        User.findOne({_id: req.params._id})
        .then((userNotLoggedIn) => {
            Event.find({createdBy: userNotLoggedIn._id})
                .populate("createdBy", "_id firstName lastName")
                .then((allEventsOfUser) => {
                    res.json(allEventsOfUser);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    }
    else{
        Event.find({createdBy: req.jwtpayload.id})
            .populate("createdBy", "_id")
            .then((allEventsOfLoggedInUser) => {
                console.log(allEventsOfLoggedInUser);
                res.json(allEventsOfLoggedInUser);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    }
}


module.exports = {
    createEvent,
    findAllEvents,
    findEventById,
    updateEvent,
    deleteEvent,
    findAllEventsByUser
};