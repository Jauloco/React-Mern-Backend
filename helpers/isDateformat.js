const moment = require('moment');

const isDateformat = ( value ) => {

    if ( !value ) return false;

    const date = moment( value );

    return date.isValid();
}

module.exports = isDateformat;