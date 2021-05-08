const {Router} = require('express');
//Controller's
const curriculumController = require('../../controllers/curriculum.controller');
//Middleware's...
const {
    validateCreateCurriculum,
    validateUpdateCurriculum,
    validationRulesDataStudiesCurriculum,
    validationRulesDataLanguagesCurriculum,
    validationRulesDataReferencesCurriculum,
    validationRulesDataWorkExperienceCurriculum,
    validationRulesRegisterCurriculum,
    validationRulesDataCurriculum
} = require('../../middleware/validationCurriculumData');

//Instanacia del Router.
const router = Router();

//Ruta de las Compañias.
//Devuelve todas las curriculums...
router.get('/', curriculumController.getAllCurriculums);

//Devuelve solo el curiculum con el idCurriculum Especificado...
router.get('/:idCurriculum', curriculumController.getCurriculum);

router.get('/byIdUser/:idUser', curriculumController.getCurriculumByIdUser);

router.get('/getAll/byIdUser/:idUser', curriculumController.getCurriculumByIdUser);

//Registra un nuevo curriculum.
router.post('/create', validationRulesRegisterCurriculum(), validateCreateCurriculum, curriculumController.createCurriculum);

//Actualiza la informacion del curiculum.
router.put('/:idCurriculum', validationRulesDataCurriculum(), validateUpdateCurriculum, curriculumController.updateCurriculum);

//Actualiza la informacion de estudio del curiculum.
router.put('/studies/:idCurriculum', validationRulesDataStudiesCurriculum(), validateUpdateCurriculum, curriculumController.updateCurriculum);

//Actualiza la informacion de estudio del curiculum.
router.put('/references/:idCurriculum', validationRulesDataReferencesCurriculum(), validateUpdateCurriculum, curriculumController.updateCurriculum);

//Actualiza la informacion de lod idiomas del curiculum.
router.put('/languages/:idCurriculum', validationRulesDataLanguagesCurriculum(), validateUpdateCurriculum, curriculumController.updateCurriculum);

//Actualiza la informacion de experiencia laboral del curiculum.
router.put('/workExperience/:idCurriculum', validationRulesDataWorkExperienceCurriculum(), validateUpdateCurriculum, curriculumController.updateCurriculum);

//Elimina una compañia con un idCompañia especifico...
router.delete('/:idCurriculum', curriculumController.deleteCurriculum);

module.exports = router;