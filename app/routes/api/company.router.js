const {Router} = require('express');
//Controller's
const companyController = require('../../controllers/company.controller');
//Middleware's...
const {
    validateCreateCompany,
    validateUpdateCompany,
    validationRulesRegisterCompany,
    validationRulesDataCompany
} = require('../../middleware/validationCompanyData');

//Instanacia del Router.
const router = Router();

//Ruta de las Compañias.
//Devuelve todas las compañias...
router.get('/', companyController.getAllCompanies);

//Devuelve solo la compañia con el idCompañia Especificado...
router.get('/:idCompany', companyController.getCompany);

//Devuelve solo la compañia con el idCompañia Especificado...
router.get('/:idUser', companyController.getCompanyByIdUser);

//Registra una nueva compañia.
router.post('/create', validationRulesRegisterCompany(), validateCreateCompany, companyController.createCompany);

//Actualiza la informacion de la compañia.
router.put('/:idCompany', validationRulesDataCompany(), validateUpdateCompany, companyController.updateCompany);

//Elimina una compañia con un idCompañia especifico...
router.delete('/:idCompany', companyController.deleteCompany);

module.exports = router;