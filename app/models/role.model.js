module.exports = (sequelize, type) => {
    return sequelize.define('role', {
        //Llave Primaria.
        idRole: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role: type.STRING,
        state: type.BOOLEAN
    });
}