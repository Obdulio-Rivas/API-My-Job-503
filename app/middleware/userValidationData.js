const {check, validationResult} = require('express-validator');

const passwordRules = {
    min: 8,
    max: 30,
    regExpChain: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/
}

//Configuraciones y validaciones.
/*Validaciones de la informacion que se envia para el registro o creacion de un usuario nuevo.*/
const userValidationRulesRegister = () => {
    return [
        check('name', 'El campo nombre es requerido!').trim().not().isEmpty(),
        check('lastname', 'El campo apellido es requerido!').trim().not().isEmpty(),
        check('imgURL', 'La imagen del usuario es requerida!').trim().not().isEmpty(),
        check('age', 'La edad del usuario es requerida!').trim().not().isEmpty(),
        check('civilStatus', 'El estado civil del usuario es requerida!').trim().not().isEmpty(),
        check('numberDUI', 'El número de DUI del usuario es requerida!').trim().not().isEmpty(),
        check('numberNIT', 'El número de NIT del usuario es requerida!').trim().not().isEmpty(),
        check('address', 'El campo direccion es requerido!').trim().not().isEmpty(),
        check('telephoneNumber', 'El campo telefono es requerido!').trim().not().isEmpty(),
        check('birthDate', 'La fecha de nacimiento del usuario es requerida!').trim().not().isEmpty(),        
        check('nationality', 'La nacionalidad del usuario es requerida!').trim().not().isEmpty(),
        check('email', 'El campo correo es requerido!').trim().isEmail(),
        check('password', 'El campo contraseña es requerido!').trim().not().isEmpty(),
        check('idRole', 'El campo tipo es requerido!').trim().not().isEmpty(),
        check('state', 'El estado es requerido!').trim().not().isEmpty(),
        check('password', 'Por favor ingrese una contraseña de al menos 8 caracteres y contenga al menos una mayúscula, al menos una minúscula, al menos un carácter especial.').isLength({ min: passwordRules.min }).matches(passwordRules.regExpChain,)
    ]
}
  
const validateRegisterUser = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(402).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Error en los datos para registrar el usuario.",
            errors: errors.array()
        });
    }
    return next();
}

/*Validaciones de la informacion que se envia para el inicio de sesion.*/
const userValidationRulesLogin = () => {
    return [
        check('email', 'El campo correo es requerido!').not().isEmpty(),
        check('password', 'El campo contraseña es requerido!').not().isEmpty(),
        check('email', 'El campo correo es requerido!').trim().isEmail(),
        check('password', 'Por favor ingrese una contraseña de al menos 8 caracteres y contenga al menos una mayúscula, al menos una minúscula, al menos un carácter especial.').isLength({ min: passwordRules.min }).matches(passwordRules.regExpChain,)
    ]
}
  
const validateLoginUser = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(402).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Error en el formato de los datos de inicio de sesión.",
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