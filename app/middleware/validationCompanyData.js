const {check, validationResult} = require('express-validator');

//Configuraciones y validaciones.
/*Validaciones de la informacion que se envia para la creacion y actualizacion de una nueva.*/
const validationRulesDataCompany = () => {
    return [
        check('idCompany', 'El ID de la compañia es requerido!').trim().not().isEmpty(),
        check('nameCompany', 'El campo nombre de la compañia es requerido!').trim().not().isEmpty(),
        check('categoryCompany', 'La categoria de la compañia es requerida!').trim().not().isEmpty(),
        check('address', 'La imagen del usuario es requerida!').trim().not().isEmpty(),
        check('telephoneNumber', 'La edad del usuario es requerida!').trim().not().isEmpty(),
        check('email', 'El estado civil del usuario es requerida!').trim().not().isEmpty(),
        check('idUser', 'El número de DUI del usuario es requerida!').trim().not().isEmpty(),
        check('state', 'El número de NIT del usuario es requerida!').trim().not().isEmpty()
    ]
}

/*Validaciones de la informacion que se envia para la creacion de una compañia nueva.*/
const validationRulesRegisterCompany = () => {
    return [
        check('nameCompany', 'El campo nombre de la compañia es requerido!').trim().not().isEmpty(),
        check('categoryCompany', 'La categoria de la compañia es requerida!').trim().not().isEmpty(),
        check('address', 'La imagen del usuario es requerida!').trim().not().isEmpty(),
        check('telephoneNumber', 'La edad del usuario es requerida!').trim().not().isEmpty(),
        check('email', 'El estado civil del usuario es requerida!').trim().not().isEmpty(),
        check('idUser', 'El número de DUI del usuario es requerida!').trim().not().isEmpty(),
        check('state', 'El número de NIT del usuario es requerida!').trim().not().isEmpty()
    ]
}

const validateRegisterCompany = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Error en los datos para registrar una compañia.",
            errors: errors.array()
        });
    }
    return next();
}

const validateCreateCompany = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Error en los datos para crear una compañia.",
            errors: errors.array()
        });
    }
    return next();
}

const validateUpdateCompany = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Error en los datos para crear una compañia.",
            errors: errors.array()
        });
    }
    return next();
}

module.exports = {
    validateRegisterCompany,
    validateCreateCompany,
    validateUpdateCompany,
    validationRulesRegisterCompany,
    validationRulesDataCompany
}