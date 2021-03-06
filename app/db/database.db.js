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
const VacantModel = require('../models/vacant.model');
const CompanyModel = require('../models/company.model');
const CurriculumModel = require('../models/curriculum.modelo');
const ApplicationModel = require('../models/application.model');

//Instancia de las Tablas....
//Persona.
const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const Vacant = VacantModel(sequelize, Sequelize);
const Company = CompanyModel(sequelize, Sequelize);
const Curriculum = CurriculumModel(sequelize, Sequelize);
const Application = ApplicationModel(sequelize, Sequelize);
//Agregar la tabla de conexion de solicitudes.

//Relaciones.
//Llaves foraneas de la tabla Curriculum
User.hasOne(Curriculum, {foreignKey: 'idUser'})
//Llaves foraneas de la tabla Company
User.hasOne(Company, {foreignKey: 'idUser'})
//Llaves foraneas de la tabla User
User.belongsTo(Role, {foreignKey: 'idRole'})
//Llaves foraneas de la tabla Vacant
Vacant.belongsTo(Company, {foreignKey: 'idCompany'})
//Llaves foraneas de la tabla Application
User.hasOne(Application, {foreignKey: 'idUser'})
//Llaves foraneas de la tabla Vacant
Application.belongsTo(Vacant, {foreignKey: 'idVacant'})

//Carga de datos tablas catalogo y datos de prueba.
const initData = () => {
    //Tabla de roles.
    for (let i = 0; i < initCatalogData.initRoleData.length; i++) {
        Role.findOrCreate({
            where: {
                role: initCatalogData.initRoleData[i].role
            }, default:{
                role: initCatalogData.initRoleData[i].role,
                state: initCatalogData.initRoleData[i].state
            }
        });
    }
    //Tabla de users.
    for (let i = 0; i < initCatalogData.initUserData.length; i++) {
        User.findOrCreate({
            where: {
                name: initCatalogData.initUserData[i].name
            }, 
            defaults: {
                name: initCatalogData.initUserData[i].name,
                lastname: initCatalogData.initUserData[i].lastname,
                imgURL: initCatalogData.initUserData[i].imgURL,
                civilStatus: initCatalogData.initUserData[i].civilStatus,
                numberDUI: initCatalogData.initUserData[i].numberDUI,
                numberNIT: initCatalogData.initUserData[i].numberNIT,
                address: initCatalogData.initUserData[i].address,
                telephoneNumber: initCatalogData.initUserData[i].telephoneNumber,
                birthDate: initCatalogData.initUserData[i].birthDate,
                nationality: initCatalogData.initUserData[i].nationality,
                //Usuario.
                email: initCatalogData.initUserData[i].email,
                password: initCatalogData.initUserData[i].password,
                codeConfirmation: initCatalogData.initUserData[i].codeConfirmation,
                socialSingIn: initCatalogData.initUserData[i].socialSingIn,
                //Llave foranea.
                idRole: initCatalogData.initUserData[i].idRole,
                state: initCatalogData.initUserData[i].state
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
    Role,
    Vacant,
    Company,
    Curriculum,
    Application
}