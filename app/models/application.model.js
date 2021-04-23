module.exports = (sequelize, type) => {
    return sequelize.define('application', {
        //Llave Primaria.
        idApplication: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        //Datos de los requisitos.
        //Llave foranea.
        idVacant: type.INTEGER,
        idCurriculum: type.INTEGER,
        state: type.ENUM('Active', 'Inactive')
    });
}