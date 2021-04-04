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
const ReferenceModel = require('../models/reference.model');
const CurriculumModel = require('../models/curriculum.modelo');
const RequirementModel = require('../models/requirement.model');

//Instancia de las Tablas....
//Persona.
const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const Vacant = VacantModel(sequelize, Sequelize);
const Company = CompanyModel(sequelize, Sequelize);
const Reference = ReferenceModel(sequelize, Sequelize);
const Curriculum = CurriculumModel(sequelize, Sequelize);
const Requirement = RequirementModel(sequelize, Sequelize);

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
                age: initCatalogData.initUserData[i].age,
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
                codeConfirmation: initCatalogData.initUserData[i].codeConfirmation.replace('///i', ''),
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
    Reference,
    Curriculum,
    Requirement
}