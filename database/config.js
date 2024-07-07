const mongoose = require( 'mongoose' );

const dbConnection = async () => {

    try {

        await mongoose.connect( process.env.DB_CNN); //! VER https://prnt.sc/vjFzl41Mpovh

        console.log( 'DB Online' );

    } catch ( error ) {
        console.log( error );
        throw new Error( 'Error al inicializar la base de datos' );
    }

}

module.exports = {
    dbConnection
}