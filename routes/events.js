/*
      Rutas de Eventos / Events
      host + /api/events
 */

const { Router } = require( 'express' );
const router = Router();
const { validarJWT } = require( '../middlewares/validar-jwt' );
const { check } = require( 'express-validator' ); // El "check" se encarga de validar 1 campo a la vez

const { crearEvento, actualizarEvento, eliminarEvento, getEventos } = require( '../controllers/eventController' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { isDate } = require( '../helpers/isDate' );

//* RUTAS

router.use( validarJWT );

router.get( '/', getEventos );

router.post( '/',
      [//middlewares
            check( 'title', 'El Titulo es obligatorio' ).not().isEmpty(),
            check( 'start', 'La fecha de Inicio es Obligatoria' ).custom( isDate ),
            // check( 'start', 'La fecha de Inicio es Obligatoria' ).isDate(), //! VERIFICAR COMO VALIDAR FECHAS DE MEJOR FORMA
            check( 'end', 'La fecha de finalizacion es Obligatoria' ).custom( isDate ),
            validarCampos
      ], crearEvento );

router.put( '/:id', actualizarEvento );

router.delete( '/:id', eliminarEvento );

module.exports = router;