const EventController = require('../controllers/event.controller');
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    app.get('/api/event', EventController.findAllEvents);

    app.post('/api/event', authenticate, EventController.createEvent);

    app.get('/api/eventsbyuser/:_id', authenticate, EventController.findAllEventsByUser);

    app.get('/api/event/:_id', EventController.findEventById);

    app.put('/api/event/:id', EventController.updateEvent);

    app.delete('/api/event/:id', EventController.deleteEvent);
}