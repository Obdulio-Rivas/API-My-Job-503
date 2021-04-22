const {Router} = require('express');
//Controller's
const vacantController = require('../../controllers/vacant.controller');
//Middleware's...
const {
    validateCreateVacant,
    validateUpdateVacant,
    validationRulesRegisterVacant,
    validationRulesDataVacant
} = require('../../middleware/validationVacantData');

//Instanacia del Router.
const router = Router();

//Ruta de las Compañias.
//Devuelve todas las compañias...
router.get('/', vacantController.getAllVacants);

//Devuelve solo la compañia con el idCompañia Especificado...
router.get('/:idCurriculum', vacantController.getVacant);

//Registra una nueva compañia.
router.post('/create', validationRulesRegisterVacant(), validateCreateVacant, vacantController.createVacant);

//Actualiza la informacion de la compañia.
router.put('/:idCurriculum', validationRulesDataVacant(), validateUpdateVacant, vacantController.updateVacant);

//Elimina una compañia con un idCompañia especifico...
router.delete('/:idCurriculum', vacantController.deleteVacant);

module.exports = router;