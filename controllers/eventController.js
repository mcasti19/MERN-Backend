const { response } = require( 'express' );
const Evento = require( '../models/Evento' )

const getEventos = async ( req, res = response ) => {

    const eventos = await Evento.find().populate( 'user', 'name' );

    res.status( 201 ).json( {
        ok: true,
        eventos
    } )
}

const crearEvento = async ( req, res = response ) => {
    //Verificar que tenga el evento
    console.log( req.uid );

    const evento = new Evento( req.body );

    evento.user = req.uid;

    try {
        const eventoGuardado = await evento.save();
        res.status( 201 ).json( {
            ok: true,
            evento: eventoGuardado,
        } )

    } catch ( error ) {
        console.log( error );
        return res.status( 500 ).json( {
            ok: false,
            msg: 'Comunicarse con el Administrador'
        } )

    }
}

const actualizarEvento = async ( req, res = response ) => {

    const eventId = req.params.id;
    // const uid = req.uid;


    try {
        const evento = await Evento.findById( eventId );
        // console.log( evento.user.toString() );

        if ( !evento ) {
            return res.status( 404 ).json( {
                ok: false,
                msg: 'Evento no encontrado con ese ID'
            } )

        }

        if ( evento.user.toString() !== req.uid ) {
            return res.status( 401 ).json( {
                ok: false,
                msg: 'No tiene permisos para hacer esto'
            } )
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventId, nuevoEvento, { new: true } );

        res.status( 201 ).json( {
            ok: true,
            msg: 'actualizarEvento',
            evento: eventoActualizado
        } )

    } catch ( error ) {
        console.log( error );
        return res.status( 500 ).json( {
            ok: false,
            msg: 'Comunicarse con el Administrador'
        } )

    }
}


const eliminarEvento = async ( req, res = response ) => {
    const eventId = req.params.id;

    try {
        const evento = await Evento.findById( eventId );
        // console.log( evento.user.toString() );

        if ( !evento ) {
            return res.status( 404 ).json( {
                ok: false,
                msg: 'Evento no encontrado con ese ID'
            } )

        }

        if ( evento.user.toString() !== req.uid ) {
            return res.status( 401 ).json( {
                ok: false,
                msg: 'No tiene permisos para hacer Borrar este Evento'
            } )
        }

        const eventoEliminado = await Evento.findOneAndDelete( eventId );

        res.status( 201 ).json( {
            ok: true,
            msg: 'eventoEliminado',
            evento: eventoEliminado
        } )

    } catch ( error ) {
        console.log( error );
        return res.status( 500 ).json( {
            ok: false,
            msg: 'Comunicarse con el Administrador'
        } )
    }
}


//*EXPORTACIONES
module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}