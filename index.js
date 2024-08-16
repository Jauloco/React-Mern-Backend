const express = require('express');
const { parsed:config } = require('dotenv').config();
const { dbConecction } = require('./database/config');
const cors = require('cors');

//crear servidor express
const app = express();
//base de datos 
dbConecction();
//CORS
app.use(cors());
//directorio publico
app.use( express.static('public'));
app.use( express.json() );
//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//TODO: CRUD: Eventos

//escuchar peticiones
app.listen( config.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${ config.PORT }`)
})