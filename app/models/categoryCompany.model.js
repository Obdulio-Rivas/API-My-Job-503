module.exports = (sequelize, type) => {
    return sequelize.define('categoryCompany', {
        //Llave Primaria.
        idCategoryCompany: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryCompany: type.STRING,
        state: type.BOOLEAN
    });
}