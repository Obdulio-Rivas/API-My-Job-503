module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        //Llave Primaria.
        idUser: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        //Información personal.
        name: type.STRING,
        lastname: type.STRING,
        imgURL: type.STRING,
        age: type.INTEGER,
        civilStatus: type.STRING,
        numberDUI:  type.STRING(10),
        numberNIT:  type.STRING(17),
        address: type.STRING,
        telephoneNumber: type.STRING,
        birthDate: type.DATEONLY,
        nationality: type.STRING,
        //Usuario.
        email: type.STRING,
        password: type.STRING(150),
        //Llave foranea.
        idRole: type.INTEGER,
        state: type.BOOLEAN
    });
}