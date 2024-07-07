// const mongoose = require( 'mongoose' ); //! En la siguiente linea se extrae lo necesario de mongoose
const { Schema, model } = require( 'mongoose' );

const UsuarioSchema = Schema( {
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
} );

module.exports = model( 'Usuario', UsuarioSchema );

