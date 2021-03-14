module.exports = (sequelize, type) => {
    return sequelize.define('requirement', {
        //Llave Primaria.
        idRequirement: {
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