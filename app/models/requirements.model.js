module.exports = (sequelize, type) => {
    return sequelize.define('requirements', {
        //Llave Primaria.
        idRequirements: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        //Datos de los requisitos.
        requirement: type.STRING,
        description: type.STRING,
        state: type.BOOLEAN
    });
}