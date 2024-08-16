/*
    Rutas
    host + /api/events/{action}
*/
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validateJwt } = require('../middlewares/validateJwt');
const { getEvents, addEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateFields } = require('../middlewares/validateFields');
const isDateformat = require('../helpers/isDateformat');

// validar token para todos los eventos despues de esta acción
router.use(validateJwt);

//obtener eventos
router.get('/', getEvents);

//crear evento
router.post('/',[
    check('title','Title is required').not().isEmpty(),
    check('start','It\'s waiting for a start date',).custom( isDateformat),
    check('end','It\'s waiting for a end date').custom( isDateformat ),
    validateFields
], addEvent);

//actualizar evento
router.put('/:id', updateEvent);

//borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;