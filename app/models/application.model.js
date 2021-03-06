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
        idUser: type.INTEGER,
        state: type.ENUM('Inactive', 'Active', 'Rechazado')
    });
}