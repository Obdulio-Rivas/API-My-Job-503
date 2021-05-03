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
        codeConfirmation: type.STRING(200),
        socialSingIn: type.BOOLEAN,
        //Llave foranea.
        idRole: type.INTEGER,
        state: type.ENUM('Pending', 'Active', 'Inactive', 'Block')
    });
}