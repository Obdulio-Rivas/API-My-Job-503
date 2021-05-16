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

//Ruta de las Vacantes.
//Devuelve todas las vacantes.
router.get('/', vacantController.getAllVacants);

//Devuelve solo la vacante con el idVacant especificado.
router.get('/:idVacant', vacantController.getVacant);

//Devuelve las vacantes con la categoria especificado.
router.get('/filterCategoryVacant/:categoryVacant', vacantController.getVacantsByCategory);

//Devuelve las vacantes relacionadas al idCompany especificado.
router.get('/filterIdCompany/:idCompany', vacantController.getVacantsByIdCompany);

//Registra una nueva vacante.
router.post('/create', validationRulesRegisterVacant(), validateCreateVacant, vacantController.createVacant);

//Actualiza la información de la vacante.
router.put('/:idVacant', validationRulesDataVacant(), validateUpdateVacant, vacantController.updateVacant);

//Elimina una vacante con el idVacant especifico.
router.delete('/:idVacant', vacantController.deleteVacant);

module.exports = router;