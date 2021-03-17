const {Router} = require('express');
//Controller's
const userController = require('../../controllers/user.controller');
//Middleware's...
const { userValidationRulesDataUser, validateCreateUser, validateUpdateUser} = require('../../middleware/userValidationData');

//Instanacia del Router.
const router = Router();

//Rutas del Usuario.
//Devuelve todos los usuarios...
router.get('/', userController.getAllUsers);

//Devuelve solo el usuario con el idUsuario Especificado...
router.get('/:idUser', userController.getUser);

//Registra un nuevo usuario.
router.post('/create', userValidationRulesDataUser(), validateCreateUser, userController.createUser);

//Actualiza la informacion de un usuario.
router.put('/:idUser', userValidationRulesDataUser(), validateUpdateUser, userController.updateUser);

//Elimina un usuario con un idUsuario especifico...
router.delete('/:idUser', userController.deleteUser);

module.exports = router;