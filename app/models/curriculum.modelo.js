module.exports = (sequelize, type) => {
    return sequelize.define('curriculum', {
        //Llave Primaria.
        idCurriculum: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        //Nombre del curriculum.
        curriculum: type.STRING,
        //Experencia laboral.
        expWorkTitleOne: type.STRING,
        expWorKCompanyOne: type.STRING,
        expWorkedTimeOne: type.INTEGER,
        expWorkTitleTwo: type.STRING,
        expWorKCompanyTwo: type.STRING,
        expWorkedTimeTwo: type.INTEGER,
        //Estudios
        basicStudies: type.STRING,
        midLevelStudies: type.STRING,
        advancedStudies: type.STRING, 
        cycleUniversity: type.INTEGER,
        postGrado: type.STRING,
        masterDegree:  type.STRING,
        specialty:  type.STRING,
        complementaryStudies: type.STRING,
        //Idiomas
        nativeLanguage: type.INTEGER,
        otherLanguage: type.INTEGER,
        otherLanguageLevel: type.INTEGER,
        //Referencias.
        referenceNameOne: type.STRING,
        referenceTelOne: type.STRING,
        referenceNameTwo: type.STRING,
        referenceTelTwo: type.STRING,
        //Llave foranea.
        idUser: type.INTEGER,
        state: type.BOOLEAN
    });
}