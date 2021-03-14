module.exports = (sequelize, type) => {
    return sequelize.define('reference', {
        //Llave Primaria.
        idReference: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        //Datos de contacto de la referencia.
        name: type.STRING,
        lastname: type.STRING,
        telephoneNumber: type.STRING,
        email: type.STRING,
        state: type.BOOLEAN
    });
}