// const express = require( 'express' );
const { response } = require( 'express' ); // Esto es para volver a tener la ayudar del intellisense
const bcrypt = require( 'bcryptjs' );
const Usuario = require( '../models/Usuario' );
const { generarJWT } = require( '../helpers/jwt' )


const crearUsuario = async ( req, res = response ) => {  // console.log( req.body );
    const { email, password } = req.body;

    try {
        //*Validando si existe el usuario antes de enviar la peticion
        let usuario = await Usuario.findOne( { email } );
        console.log( usuario );

        if ( usuario ) {
            return res.status( 400 ).json( {
                ok: false,
                msg: 'El correo ya existe'
            } )
        }

        //* Asignacion de usuario con la info cargada en el req.body
        usuario = new Usuario( req.body );


        //* Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        //*Si el usuario no existe se manda a grabar el nuevo usuario
        await usuario.save();
        //* Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name );


        //* Se retorna la respuesta de creacion con exito
        res.status( 201 ).json( {
            ok: true,
            msg: 'El usuario ha sido creado con exito',
            uid: usuario.id,
            name: usuario.name,
            email: usuario.email,
            token
        } )

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( {
            ok: false,
            msg: 'Por favor contactar con el Administrador'
        } )
    }
};


const loginUsuario = async ( req, res = response ) => { //! https://prnt.sc/lBD7vSFAXDqb

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne( { email } );
        console.log( usuario );

        if ( !usuario ) {
            return res.status( 400 ).json( {
                ok: false,
                msg: `No existe un usuario registrado con el email: ${ email }`
            } );
        }

        //* Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password ); // console.log(validPassword);

        if ( !validPassword ) {
            return res.status( 400 ).json( {
                ok: false,
                msg: 'Password Incorrecto'
            } )
        }

        //* Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name );

        //* Se retorna la respuesta de creacion con exito
        res.status( 201 ).json( {
            ok: true,
            msg: 'Usuario validado con exito',
            uid: usuario.id,
            name: usuario.name,
            email: usuario.email,
            token
        } )

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( {
            ok: false,
            msg: 'Por favor contactar con el Administrador'
        } )
    }
}

const revalidarToken = async ( req, res = response ) => {

    const { uid, name } = req;

    //* Generando nuevo Token
    const token = await generarJWT( uid, name );

    res.json( {
        msg: 'Revalidando Token',
        ok: true,
        name,
        uid,
        token,
    } )
}

//*EXPORTACIONES
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}