const {check, validationResult} = require('express-validator');

//Configuraciones y validaciones.
/*Validaciones de la informacion que se envia para la actualizacion.*/
const validationRulesDataApplication = () => {
    return [
        check('idApplication', 'El ID de la aplicacion es requerido!').trim().not().isEmpty(),
        check('idVacant', 'El ID de la vacante es requerido!').trim().not().isEmpty(),
        check('idUser', 'El id del usuario es requerido!').trim().not().isEmpty(),
        check('state', 'El estado del curriculum es requerido!').trim().not().isEmpty()
    ]
}

/*Validaciones de la informacion que se envia para la creacion de una compañia nueva.*/
const validationRulesRegisterApplication = () => {
    return [
        check('idVacant', 'El ID de la vacante es requerido!').trim().not().isEmpty(),
        check('idUser', 'El id del usuario es requerido!').trim().not().isEmpty(),
        check('state', 'El estado del curriculum es requerido!').trim().not().isEmpty()
    ]
}

const validateRegisterApplication = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Error en los datos para registrar la aplicacion.",
            errors: errors.array()
        });
    }
    return next();
}

const validateCreateApplication = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Error en los datos para crear la aplicacion.",
            errors: errors.array()
        });
    }
    return next();
}

const validateUpdateApplication = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Error en los datos para crear una aplicacion.",
            errors: errors.array()
        });
    }
    return next();
}

module.exports = {
    validateRegisterApplication,
    validateCreateApplication,
    validateUpdateApplication,
    validationRulesRegisterApplication,
    validationRulesDataApplication
}