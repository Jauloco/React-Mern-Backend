const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generaJWT } = require('../helpers/jwt');

const newUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {

        let usuario = await User.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe este usuario'
            })
        }
        const _newuser = new User(req.body);

        //encriptar password
        const salt = bcrypt.genSaltSync();
        _newuser.password = bcrypt.hashSync( password, salt);
        await _newuser.save();

        const token = await generaJWT( _newuser.id, _newuser.name );
        res.status(201).json({
            ok: true,
            uid: _newuser.id,
            name: _newuser.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el sistema'
        })
    }
}

const loginUser = async(req, res = response) => {
    const { email, password } = req.body;
    try     
    {

        let usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Error en autenticación'
            })
        }

        const validatePassword = bcrypt.compareSync( password, usuario.password);
        if (!validatePassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Error en autenticación'
            })
        } 

        const token = await generaJWT( usuario.id, usuario.name );

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            email: usuario.email,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el sistema'
        })
    }
}

const renewUser = async(req, res = response) => {

    const { uid, name } = req;
    
    const token = await generaJWT( uid, name );

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    newUser,
    loginUser,
    renewUser
}