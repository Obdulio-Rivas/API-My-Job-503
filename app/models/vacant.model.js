module.exports = (sequelize, type) => {
    return sequelize.define('vacant', {
        //Llave Primaria.
        idVacant: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        //Campos de la tabla.
        titleVacant: type.STRING,
        descriptionVacant: type.STRING,
        categoryVacant: type.INTEGER,
        minSalary: type.DOUBLE,
        maxSalary: type.DOUBLE,
        quantityVacant: type.INTEGER,
        state: type.BOOLEAN,
        //llave forarea.
        idCompany: type.INTEGER,
        idRequirements: type.INTEGER
    });
}