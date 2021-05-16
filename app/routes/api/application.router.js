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

//Ruta de las Aplicaciones.
//Devuelve todas las aplicaciones...
router.get('/', applicationController.getAllApplications);

//Devuelve solo la aplicación con el idApplication Especificado...
router.get('/byIdApplication/:idApplication', applicationController.getApplication);

//Devuelve todas las aplicaciones con el idUser Especificado...
router.get('/byIdUser/:idUser', applicationController.getAplicationsByIdUser);

//Devuelve todas las aplicaciones con el idVacant Especificado...
router.get('/byIdVacant/:idVacant', applicationController.getAplicationsByIdVacant);

//Devuelve solo las aplicaciones con el idVacant y idUser Especificado...
router.get('/byIdUserAndIdVacant/', applicationController.getAplicationsByIdUserAndIdVacant);

//Registra una nueva aplicación.
router.post('/create', validationRulesRegisterApplication(), validateCreateApplication, applicationController.createApplication);

//Actualiza la información de la aplicación.
router.put('/:idApplication', validationRulesDataApplication(), validateUpdateApplication, applicationController.updateApplication);

//Elimina una aplicación con un idApplication especifico...
router.delete('/:idApplication', applicationController.deleteApplication);

module.exports = router;