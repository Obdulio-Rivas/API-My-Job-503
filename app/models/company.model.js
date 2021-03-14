module.exports = (sequelize, type) => {
    return sequelize.define('company', {
        //Llave Primaria.
        idCompany: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nameCategory: type.STRING,
        CategoryCompany: type.STRING,
        address: type.STRING,
        telephoneNumber:  type.STRING,
        email:  type.STRING,
        //Llave foranea.
        idUser: type.INTEGER,
        state: type.BOOLEAN
    });
}