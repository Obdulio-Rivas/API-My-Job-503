const {check, validationResult} = require('express-validator');

//Configuraciones y validaciones.
/*Validaciones de la informacion que se envia para la actualizacion.*/
const validationRulesDataVacant = () => {
    return [
        check('idVacant', 'El ID de la vacante es requerido!').trim().not().isEmpty(),
        check('titleVacant', 'El titulo de la vacante es requerido!').trim().not().isEmpty(),
        check('descriptionVacant', 'La descripcion de la vacante es requerida!').trim().not().isEmpty(),
        check('categoryVacant', 'La categoria de la vacante es requerida!').trim().not().isEmpty(),
        check('minSalary', 'El salario minimo de la vacante es requerido!').trim().not().isEmpty(),
        check('maxSalary', 'El salario maximo de la vacante es requerido!').trim().not().isEmpty(),
        check('quantityVacant', 'La cantidad de vacantes es requerido!').trim().not().isEmpty(),
        check('requirementOne', 'El requisito es requerido es requerido!').trim().not().isEmpty(),
        check('idCompany', 'El id de la compañia es requerido!').trim().not().isEmpty(),
        check('state', 'El estado de la vacante es requerido!').trim().not().isEmpty()
    ]
}

/*Validaciones de la informacion que se envia para la creacion de una compañia nueva.*/
const validationRulesRegisterVacant = () => {
    return [
        check('titleVacant', 'El titulo de la vacante es requerido!').trim().not().isEmpty(),
        check('descriptionVacant', 'La descripcion de la vacante es requerida!').trim().not().isEmpty(),
        check('categoryVacant', 'La categoria de la vacante es requerida!').trim().not().isEmpty(),
        check('minSalary', 'El salario minimo de la vacante es requerido!').trim().not().isEmpty(),
        check('maxSalary', 'El salario maximo de la vacante es requerido!').trim().not().isEmpty(),
        check('quantityVacant', 'La cantidad de vacantes es requerido!').trim().not().isEmpty(),
        check('requirementOne', 'El requisito es requerido es requerido!').trim().not().isEmpty(),
        check('idCompany', 'El id de la compañia es requerido!').trim().not().isEmpty(),
        check('state', 'El estado de la vacante es requerido!').trim().not().isEmpty()
    ]
}

const validateRegisterVacant = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Error en los datos para registrar una vacante.",
            errors: errors.array()
        });
    }
    return next();
}

const validateCreateVacant = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Error en los datos para crear una vacante.",
            errors: errors.array()
        });
    }
    return next();
}

const validateUpdateVacant = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Error en los datos para actualizar una vacante.",
            errors: errors.array()
        });
    }
    return next();
}

module.exports = {
    validateRegisterVacant,
    validateCreateVacant,
    validateUpdateVacant,
    validationRulesRegisterVacant,
    validationRulesDataVacant
}