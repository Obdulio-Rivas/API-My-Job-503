const {Router} = require('express');
//Controller's
const curriculumController = require('../../controllers/curriculum.controller');
//Middleware's...
const {
    validateCreateCurriculum,
    validateUpdateCurriculum,
    validationRulesRegisterCurriculum,
    validationRulesDataCurriculum
} = require('../../middleware/validationCurriculumData');

//Instanacia del Router.
const router = Router();

//Ruta de las Compañias.
//Devuelve todas las compañias...
router.get('/', curriculumController.getAllCurriculums);

//Devuelve solo la compañia con el idCompañia Especificado...
router.get('/:idCurriculum', curriculumController.getCurriculum);

//Registra una nueva compañia.
router.post('/create', validationRulesRegisterCurriculum(), validateCreateCurriculum, curriculumController.createCurriculum);

//Actualiza la informacion de la compañia.
router.put('/:idCurriculum', validationRulesDataCurriculum(), validateUpdateCurriculum, curriculumController.updateCurriculum);

//Elimina una compañia con un idCompañia especifico...
router.delete('/:idCurriculum', curriculumController.deleteCurriculum);

module.exports = router;