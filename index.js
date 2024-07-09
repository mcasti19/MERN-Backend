const express = require( 'express' );
const path = require( 'path' )
const { dbConnection } = require( './database/config' );
const cors = require( 'cors' );
require( 'dotenv' ).config();


//*Crear el servidor de Express
const app = express();


//* BASE DE DATOS
dbConnection();

//* CORS
app.use( cors() );

//*Directorio Publico 
app.use( express.static( 'public' ) );

//*Lectura y Parseo del body
app.use( express.json() );


//* Rutas 
app.use( '/api/auth', require( './routes/auth' ) ) // Aquello que exporte el 'routes/auth' se va a habilitar en 'api/auth'
app.use( '/api/events', require( './routes/events' ) )

app.use( '*', ( req, res ) => {
    res.sendFile( path.join( __dirname, 'public/index.html' ) );
} );


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log( `Servidor corriendo en el puerto ${ process.env.PORT }` );
} )