const {check, validationResult} = require('express-validator');

//Configuraciones y validaciones.
/*Validaciones de la informacion que se envia para el registro o creacion de un usuario nuevo.*/
const userValidationRulesRegister = () => {
    return [
        check('name', 'El campo nombre es requerido!').not().isEmpty(),
        check('lastname', 'El campo apellido es requerido!').not().isEmpty(),
        check('imgURL', 'La imagen del usuario es requerida!').not().isEmpty(),
        check('age', 'La edad del usuario es requerida!').not().isEmpty(),
        check('civilStatus', 'El estado civil del usuario es requerida!').not().isEmpty(),
        check('numberDUI', 'El número de DUI del usuario es requerida!').not().isEmpty(),
        check('numberNIT', 'El número de NIT del usuario es requerida!').not().isEmpty(),
        check('address', 'El campo direccion es requerido!').not().isEmpty(),
        check('telephoneNumber', 'El campo telefono es requerido!').not().isEmpty(),
        check('birthDate', 'La fecha de nacimiento del usuario es requerida!').not().isEmpty(),        
        check('nationality', 'La nacionalidad del usuario es requerida!').not().isEmpty(),
        check('email', 'El campo correo es requerido!').isEmail(),
        check('password', 'El campo contraseña es requerido!').not().isEmpty(),
        check('idRole', 'El campo tipo es requerido!').not().isEmpty(),
        check('state', 'El estado es requerido!').not().isEmpty(),
    ]
}
  
const validateRegisterUser = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(402).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Faltan datos para registrar el usuario!",
            errors: errors.array()
        });
    }
    return next();
}

/*Validaciones de la informacion que se envia para el inicio de sesion.*/
const userValidationRulesLogin = () => {
    return [
        check('email', 'El campo correo es requerido!').isEmail(),
        check('password', 'El campo contraseña es requerido!').not().isEmpty(),
    ]
}
  
const validateLoginUser = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(402).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Faltan datos para registrar el usuario!",
            errors: errors.array()
        });
    }
    return next();
}
  
module.exports = {
    userValidationRulesRegister,
    validateRegisterUser,
    userValidationRulesLogin,
    validateLoginUser
}