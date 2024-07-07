/*
      Rutas de Usuarios / Auth
      host + /api/auth
 */

// const express = require( 'express' );
const { Router } = require( 'express' );
const { check } = require( 'express-validator' ); // El "check" se encarga de validar 1 campo a la vez

const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require( '../controllers/authController' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { validarJWT } = require( '../middlewares/validar-jwt' );

//* RUTAS
router.get( '/', ( req, res ) => {
    console.log( 'Se requiere el /' );
    res.json( {
        ok: true,

    } )
} );

router.post(
    '/new',
    [//middlewares
        check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'email', 'El email es obligatorio y debe tener el formato correcto' ).isEmail(),
        check( 'password', 'El password debe contener minimo 6 caracteres' ).isLength( { min: 6 } ),
        validarCampos
    ],
    crearUsuario
);


router.post(
    '/',
    [
        check( 'email', 'El email es obligatorio y debe tener el formato correcto' ).isEmail(),
        check( 'password', 'El password debe contener minimo 6 caracteres' ).isLength( { min: 6 } ),
        validarCampos
    ],
    loginUsuario
);




router.get(
    '/renew', validarJWT, revalidarToken );

module.exports = router;