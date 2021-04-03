const {Router} = require('express');
//Controller's
const authController = require('../../controllers/auth.controller');
//Middleware's...
const { userValidationRulesLogin, validateLoginUser, userValidationRulesRegisterUser, validateRegisterUser, userValidationRulesLoginGoogle, validateLoginGoogleUser} = require('../../middleware/userValidationData');

//Instanacia del Router.
const router = Router();

//Permite iniciar session a un usuario.
router.post('/login', userValidationRulesLogin(), validateLoginUser, authController.loginUser);
//Permite iniciar session o registrarse (En caso no se este ya registrado) a un usuario con una cuenta de google.
router.post('/google', userValidationRulesLoginGoogle(), validateLoginGoogleUser, authController.signInGoogleUser);

//Permite registrarse en la app como un usuario enviando todos los datos basicos requeridos.
router.post('/newUser', userValidationRulesRegisterUser(), validateRegisterUser, authController.signInUser);

router.get('/emailUser/:codeConfirmation', authController.confirmEmailUser);

//Permite cerrar session a un usuario.
//router.get('/logout', userValidationRulesLogin(), validateLoginUser, authController.loginUser);

module.exports = router;