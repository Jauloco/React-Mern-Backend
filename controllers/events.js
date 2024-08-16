const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {

    const events = await Event.find().populate('user','name');

    res.json({
        ok: true,
        event: events
    });
}

const addEvent = async (req, res = response) => {

    const newEvent = new Event(req.body);
    try {
        newEvent.user = req.uid;

        const saveEvent = await newEvent.save();

        return res.json({
            ok: true,
            event: saveEvent
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ask the admin about that error'
        });
    }
}

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const userId = req.uid;

    try {
        
        const eventCurrent = await Event.findById( eventId );
        if ( !eventCurrent ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event wasn\'t find'
            });
        }

        if ( eventCurrent.user.toString() !== userId){
            return res.status(401).json({
                ok: false,
                msg: 'Your aren\'t have permision to action'
            });
        }

        const updateEvent = {
            ...req.body,
            user: userId
        }

        const eventUpdated = await Event.findByIdAndUpdate( eventId, updateEvent, {
            new: true
        } )

        return res.json({
            ok: true,
            event: eventUpdated
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ask the admin about that error'
        });        
    }

}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;

    const userId = req.uid;

    try {
        
        const eventCurrent = await Event.findById( eventId );
        if ( !eventCurrent ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }
        if ( eventCurrent.user.toString() !== userId){
            return res.status(401).json({
                ok: false,
                msg: 'Your aren\'t have permision to action'
            });
        }

        await Event.findByIdAndDelete(eventId);

        return res.json({
            ok: true,
            msg: `Event ${ eventId } was deleted`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ask the admin about that error'
        });        
    }

}

module.exports = {
    getEvents,
    addEvent,
    updateEvent,
    deleteEvent
}