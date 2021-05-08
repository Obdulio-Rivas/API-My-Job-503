const {check, validationResult} = require('express-validator');

//Configuraciones y validaciones.
/*Validaciones de la informacion que se envia para la actualizacion.*/
const validationRulesDataCurriculum = () => {
    return [
        check('idCurriculum', 'El ID del curriculum es requerido!').trim().not().isEmpty(),
        check('curriculum', 'El campo nombre curriculum es requerido!').trim().not().isEmpty(),
        check('expWorkTitleOne', 'El puesto de experiencia laboral es requerido!').trim().not().isEmpty(),
        check('expWorKCompanyOne', 'El nombre de la compañia donde trabajo es requerido!').trim().not().isEmpty(),
        check('expWorkedTimeOne', 'El tiempo que trabajo es requerido!').trim().not().isEmpty(),
        check('expWorkTitleTwo', 'El puesto de experiencia laboral es requerido!').trim().not().isEmpty(),
        check('expWorKCompanyTwo', 'El nombre de la compañia donde trabajo es requerido!').trim().not().isEmpty(),
        check('expWorkedTimeTwo', 'El tiempo que trabajo es requerido!').trim().not().isEmpty(),
        check('basicStudies', 'El campo Estudio basicos es requerido!').trim().not().isEmpty(),
        check('midLevelStudies', 'El campo Estudio medios es requerido!').trim().not().isEmpty(),
        check('advancedStudies', 'El campo Estudio avanzados es requerido!').trim().not().isEmpty(),
        check('cycleUniversity', 'El campo ciclo universitario es requerido!').trim().not().isEmpty(),
        check('postGrado', 'El campo post-grado es requerido!').trim().not().isEmpty(),
        check('masterDegree', 'El campo master degree es requerido!').trim().not().isEmpty(),
        check('specialty', 'El campo especialidad es requerido!').trim().not().isEmpty(),
        check('complementaryStudies', 'El campo estudios complementarios es requerido!').trim().not().isEmpty(),
        check('nativeLanguage', 'El campo lenguaje Nativo es requerido!').trim().not().isEmpty(),
        check('otherLanguage', 'El campo otro lenguaje es requerido!').trim().not().isEmpty(),
        check('otherLanguageLevel', 'El campo nivel otro lenguaje es requerido!').trim().not().isEmpty(),
        check('referenceNameOne', 'El campo referencia uno requerido!').trim().not().isEmpty(),
        check('referenceTelOne', 'El campo telefono referencia uno requerido!').trim().not().isEmpty(),
        check('referenceNameTwo', 'El campo referencia dos requerido!').trim().not().isEmpty(),
        check('referenceTelTwo', 'El campo telefono referencia dos requerido!').trim().not().isEmpty(),
        check('idUser', 'El id del usuario es requerido!').trim().not().isEmpty(),
        check('state', 'El estado del curriculum es requerido!').trim().not().isEmpty()
    ]
}

const validationRulesDataStudiesCurriculum = () => {
    return [
        check('idCurriculum', 'El ID del curriculum es requerido!').trim().not().isEmpty(),
        check('basicStudies', 'El campo Estudio basicos es requerido!').trim().not().isEmpty(),
        check('midLevelStudies', 'El campo Estudio medios es requerido!').trim().not().isEmpty(),
        check('advancedStudies', 'El campo Estudio avanzados es requerido!').trim().not().isEmpty(),
        check('cycleUniversity', 'El campo ciclo universitario es requerido!').trim().not().isEmpty(),
        check('postGrado', 'El campo post-grado es requerido!').trim().not().isEmpty(),
        check('masterDegree', 'El campo master degree es requerido!').trim().not().isEmpty(),
        check('specialty', 'El campo especialidad es requerido!').trim().not().isEmpty(),
        check('complementaryStudies', 'El campo estudios complementarios es requerido!').trim().not().isEmpty()
    ]
}

const validationRulesDataWorkExperienceCurriculum = () => {
    return [
        check('idCurriculum', 'El ID del curriculum es requerido!').trim().not().isEmpty(),
        check('expWorkTitleOne', 'El puesto de experiencia laboral es requerido!').trim().not().isEmpty(),
        check('expWorKCompanyOne', 'El nombre de la compañia donde trabajo es requerido!').trim().not().isEmpty(),
        check('expWorkedTimeOne', 'El tiempo que trabajo es requerido!').trim().not().isEmpty(),
        check('expWorkTitleTwo', 'El puesto de experiencia laboral es requerido!').trim().not().isEmpty(),
        check('expWorKCompanyTwo', 'El nombre de la compañia donde trabajo es requerido!').trim().not().isEmpty(),
        check('expWorkedTimeTwo', 'El tiempo que trabajo es requerido!').trim().not().isEmpty()
    ]
}

const validationRulesDataLanguagesCurriculum = () => {
    return [
        check('idCurriculum', 'El ID del curriculum es requerido!').trim().not().isEmpty(),
        check('nativeLanguage', 'El campo lenguaje Nativo es requerido!').trim().not().isEmpty(),
        check('otherLanguage', 'El campo otro lenguaje es requerido!').trim().not().isEmpty(),
        check('otherLanguageLevel', 'El campo nivel otro lenguaje es requerido!').trim().not().isEmpty()
    ]
}

const validationRulesDataReferencesCurriculum = () => {
    return [
        check('idCurriculum', 'El ID del curriculum es requerido!').trim().not().isEmpty(),
        check('referenceNameOne', 'El campo referencia uno requerido!').trim().not().isEmpty(),
        check('referenceTelOne', 'El campo telefono referencia uno requerido!').trim().not().isEmpty(),
        check('referenceNameTwo', 'El campo referencia dos requerido!').trim().not().isEmpty(),
        check('referenceTelTwo', 'El campo telefono referencia dos requerido!').trim().not().isEmpty()
    ]
}

/*Validaciones de la informacion que se envia para la creacion de una compañia nueva.*/
const validationRulesRegisterCurriculum = () => {
    return [
        check('curriculum', 'El campo nombre curriculum es requerido!').trim().not().isEmpty(),
        check('expWorkTitleOne', 'El puesto de experiencia laboral es requerido!').trim().not().isEmpty(),
        check('expWorKCompanyOne', 'El nombre de la compañia donde trabajo es requerido!').trim().not().isEmpty(),
        check('expWorkedTimeOne', 'El tiempo que trabajo es requerido!').trim().not().isEmpty(),
        check('basicStudies', 'El campo Estudio basicos es requerido!').trim().not().isEmpty(),
        check('midLevelStudies', 'El campo Estudio medios es requerido!').trim().not().isEmpty(),
        check('advancedStudies', 'El campo Estudio avanzados es requerido!').trim().not().isEmpty(),
        check('cycleUniversity', 'El campo ciclo universitario es requerido!').trim().not().isEmpty(),
        check('postGrado', 'El campo post-grado es requerido!').trim().not().isEmpty(),
        check('masterDegree', 'El campo master degree es requerido!').trim().not().isEmpty(),
        check('specialty', 'El campo especialidad es requerido!').trim().not().isEmpty(),
        check('complementaryStudies', 'El campo estudios complementarios es requerido!').trim().not().isEmpty(),
        check('nativeLanguage', 'El campo lenguaje Nativo es requerido!').trim().not().isEmpty(),
        check('referenceNameOne', 'El campo referencia uno requerido!').trim().not().isEmpty(),
        check('referenceTelOne', 'El campo telefono referencia uno requerido!').trim().not().isEmpty(),
        check('idUser', 'El id del usuario es requerido!').trim().not().isEmpty(),
        check('state', 'El estado del curriculum es requerido!').trim().not().isEmpty()
    ]
}

const validateRegisterCurriculum = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Error en los datos para registrar un curriculum.",
            errors: errors.array()
        });
    }
    return next();
}

const validateCreateCurriculum = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Error en los datos para crear un curriculum.",
            errors: errors.array()
        });
    }
    return next();
}

const validateUpdateCurriculum = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: "Error en los datos para crear un curriculum.",
            errors: errors.array()
        });
    }
    return next();
}

module.exports = {
    validateRegisterCurriculum,
    validateCreateCurriculum,
    validateUpdateCurriculum,
    validationRulesRegisterCurriculum,
    validationRulesDataCurriculum,
    validationRulesDataStudiesCurriculum,
    validationRulesDataWorkExperienceCurriculum,
    validationRulesDataReferencesCurriculum,
    validationRulesDataLanguagesCurriculum
}