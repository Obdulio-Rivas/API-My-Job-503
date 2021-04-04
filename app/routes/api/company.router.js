const {Router} = require('express');
//Controller's
const companyController = require('../../controllers/company.controller');
//Middleware's...
const { userValidationRulesDataUser, validateCreateUser, validateUpdateUser} = require('../../middleware/validationUserData');

//Instanacia del Router.
const router = Router();

//Ruta de las Compañias.
//Devuelve todas las compañias...
router.get('/', companyController.getAllUsers);

//Devuelve solo la compañia con el idCompañia Especificado...
router.get('/:idCompanie', companyController.getUser);

//Registra una nueva compañia.
router.post('/create', userValidationRulesDataUser(), validateCreateUser, companyController.createUser);

//Actualiza la informacion de la compañia.
router.put('/:idCompanie', userValidationRulesDataUser(), validateUpdateUser, companyController.updateUser);

//Elimina una compañia con un idCompañia especifico...
router.delete('/:idCompanie', companyController.deleteUser);

module.exports = router;