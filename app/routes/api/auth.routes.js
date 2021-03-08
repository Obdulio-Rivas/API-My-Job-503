const {Router} = require('express');
//Controller's
const authController = require('../../controllers/auth.controller');
//Middleware's...
const { userValidationRulesLogin, validateLoginUser,} = require('../../middleware/userValidationData');

//Instanacia del Router.
const router = Router();

//Permite iniciar session a un usuario.
router.post('/login', userValidationRulesLogin(), validateLoginUser, authController.loginUser);

//Permite cerrar session a un usuario.
//router.get('/logout', userValidationRulesLogin(), validateLoginUser, authController.loginUser);

module.exports = router;