module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        //Llave Primaria.
        idUser: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        lastname: type.STRING,
        imgURL: type.STRING, 
        email: type.STRING,
        password: type.STRING(150),
        address:  type.STRING,
        phone:  type.STRING,
        //Llave foranea.
        idRole: type.INTEGER,
        state: type.BOOLEAN
    });
}