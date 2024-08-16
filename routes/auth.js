/*
Rutas de usuario
host + /api/auth
*/
const { Router } = require('express');
const rounter = Router();
const { check } = require('express-validator');

const { newUser, loginUser, renewUser  } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { validateJwt } = require('../middlewares/validateJwt');

rounter.post('/',
[// middlewares
    check('email','Email is required').isEmail(),
    check('password','Password isn\'t valid').isLength({ min: 6 }),
    validateFields
], loginUser);

rounter.post('/new',
[// middlewares
    check('name','Name field is required').not().isEmpty(),
    check('email','Email is required').isEmail(),
    check('password','Password isn\'t valid').isLength({ min: 6 }),
    validateFields
],
 newUser);

rounter.get('/renew', validateJwt, renewUser);

module.exports = rounter;