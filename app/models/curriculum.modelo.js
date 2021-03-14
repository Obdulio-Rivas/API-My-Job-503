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
        workExperience: type.STRING,
        //Estudios
        basicStudies: type.STRING,
        midLevelStudies: type.STRING,
        advancedStudies: type.STRING, 
        cycleUniversity: type.INTEGER,
        postGrado: type.STRING,
        masterDegree:  type.STRING,
        specialty:  type.STRING,
        complementaryStudies: type.STRING,
        language: type.STRING,
        //Llave foranea.
        idUsuario: type.INTEGER,
        state: type.BOOLEAN
    });
}