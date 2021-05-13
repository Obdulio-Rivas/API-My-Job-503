const {Router} = require('express');
//Controller's
const applicationController = require('../../controllers/application.controller');
//Middleware's...
const {
    validateCreateApplication,
    validateUpdateApplication,
    validationRulesRegisterApplication,
    validationRulesDataApplication
} = require('../../middleware/validationApplicationData');

//Instanacia del Router.
const router = Router();

//Ruta de las Compañias.
//Devuelve todas las compañias...
router.get('/', applicationController.getAllApplications);

//Devuelve solo la compañia con el idCompañia Especificado...
router.get('/byIdApplication/:idApplication', applicationController.getApplication);

//Devuelve solo la compañia con el idCompañia Especificado...
router.get('/byIdUser/:idUser', applicationController.getAplicationsByIdUser);

//Devuelve solo la compañia con el idCompañia Especificado...
router.get('/byIdUserAndIdVacant/', applicationController.getAplicationsByIdUserAndIdVacant);

//Registra una nueva compañia.
router.post('/create', validationRulesRegisterApplication(), validateCreateApplication, applicationController.createApplication);

//Actualiza la informacion de la compañia.
router.put('/:idApplication', validationRulesDataApplication(), validateUpdateApplication, applicationController.updateApplication);

//Elimina una compañia con un idCompañia especifico...
router.delete('/:idApplication', applicationController.deleteApplication);

module.exports = router;