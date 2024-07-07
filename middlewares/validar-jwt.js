const { response } = require( 'express' );
const jwt = require( 'jsonwebtoken' );


const validarJWT = ( req, res = response, next ) => {

    //x-token headers

    const token = req.header( 'x-token' ); // console.log( token );

    if ( !token ) {
        return res.status( 401 ).json( {
            ok: false,
            msg: 'NO hay token en la petición'
        } )
    }

    try {

        // const payload = jwt.verify( // del payload se desestructura el uid y el name para igualarlo a los valores de la request
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        // console.log( payload );

        req.uid = uid;
        req.name = name;


    } catch ( error ) {
        console.log( error );
        return res.status( 401 ).json( {
            ok: false,
            msg: 'Token no válido'
        } )

    }

    next();
}

module.exports = {
    validarJWT
}