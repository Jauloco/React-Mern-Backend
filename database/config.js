const mongoose = require('mongoose');

const dbConecction = async() => {

    try {
        await mongoose.connect( process.env.DB_CONECCTION );

        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('error en inicializacion de base de datos');
    }

}

module.exports ={
    dbConecction
}