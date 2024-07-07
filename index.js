const express = require( 'express' );
const { dbConnection } = require( './database/config' );
const cors = require( 'cors' );
require( 'dotenv' ).config();


//*Crear el servidor de Express
const app = express();


//* BASE DE DATOS
dbConnection();

//* CORS
app.use( cors() );


//*Lectura y Parseo del body
app.use( express.json() );

//* Rutas Auth
app.use( '/api/auth', require( './routes/auth' ) ) // Aquello que exporte el 'routes/auth' se va a habilitar en 'api/auth'


//* Rutas Eventos
app.use( '/api/events', require( './routes/events' ) )



//*Directorio Publico 
app.use( express.static( 'public' ) );


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log( `Servidor corriendo en el puerto ${ process.env.PORT }` );
} )