const Sequelize = require('sequelize');
const DBConfig = require('../config/db.config');
const initCatalogData = require('./initCatalogData.db');

//Instanciamos Sequelize.
const sequelize = new Sequelize(
    DBConfig.DB,
    DBConfig.USER,
    DBConfig.PASSWORD,
    {
        host: DBConfig.HOST,
        dialect: DBConfig.dialect
    }
);

//Models (Tables of DataBase Transmatic)...
//Abstracto Persona.
const UserModel = require('../models/user.model');
const RoleModel = require('../models/role.model');

//Instancia de las Tablas....
//Persona.
const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);

//Carga de datos tablas catalogo.
const initData = () => {
    //Tabla de roles.
    for (let i = 0; i < initCatalogData.initRoleData.length; i++) {
        Role.findOrCreate({
            where: {
                role: initCatalogData.initRoleData[i].role,
                state: initCatalogData.initRoleData[i].state,
            }
        });
    }
}

//Sincronizacion de la BD...
sequelize.sync({force: false}).then(()=>{
    //LLenamos las tablas catalogo.
    initData();
    console.log('Tablas correctamente sincronizadas!');
});

module.exports = {
    User,
    Role
}