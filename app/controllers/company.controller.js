const bcryptJS = require('bcryptjs');
const moment = require('moment')
//Instancia del Model Company para la BD.
const { Company } = require('../db/database.db');

//Company controller.
//Obtener todos las compañias.
async function getAllCompanies(req, res) {
    const companies = await Company.findAll();
    let rowsAfected = Object.keys(companies).length;
    res.json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: "Compañias Actuales en la Base de Datos!",
        data: companies
    });
}

//Obtener un compañia por id.
async function getCompany(req, res) {
    let rowsAfected = 0;
    var company = null;
    const idCompany = req.params.idCompany;
    if(idCompany){
        company = await Company.findOne({ where: { idCompany: idCompany } });
        if(company){
            rowsAfected = 1;
            res.json({
                isSuccessful: true,
                rowsAfected: rowsAfected,
                msg: `Compañia con id ${idCompany} encontrado con exito!`,
                data: company
            });
        }else{
            res.json({
                isSuccessful: false,
                rowsAfected: rowsAfected,
                msg: `No se ha encontrado una compañia con id ${idCompany}`,
                data: company
            });
        }
    }else{
        res.json({
            isSuccessful: false,
            rowsAfected: rowsAfected,
            msg: `No se ha recibido el parametro idCompany!`,
            data: company
        });
    }
}

//Crear compañia.
async function createCompany(req, res) {
    //Buscamos si existe algun usuario con ese correo ya registrado.
    const nameCompany = req.body.nameCompany;
    const company = await Company.findOne({ where: { nameCompany: nameCompany } });
    //Validamos si se encontraron coincidencias.
    if(!company){
        //Obtenemos el id del usuario gestor de la compañia.
        // Sacarlo del jwt
        const idUser = req.body.idUser;
        //Creamos la compañia.
        const newCompany = await Company.create(req.body);
        //Validamos si se creo.
        if(newCompany){
            let rowsAfected = Object.keys(newUser).length;
            res.status(200).json({
                isSuccessful: true,
                rowsAfected: rowsAfected,
                msg: "Compañia registrada con exito!",
                data: newCompany,
                jwt: req.jwt
            });
        }else{
            res.status(200).json({
                isSuccessful: false,
                rowsAfectadas: 0,
                msg: "No se pudo registrar la compañia!",
                data: null,
                jwt: req.jwt
            });
        }
    }else{
        res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: `Error ya existe un usuario, registrado con el email ${email}`,
            data: null,
            jwt: req.jwt
        });
    }
}

//Obtener un usuario por id.
async function updateUser(req, res) {
    let idUser = req.params.idUser;
    if(idUser){
        const user = await User.update(req.body, {
            where: { idUser: idUser}
        });
        //Validamos si se actualizo.
        let rowsAfected = Object.keys(user).length;
        if(rowsAfected>0){
            res.status(200).json({
                ok: true,
                rowsAfected: rowsAfected,
                msg: "Usuario Actualizado con exito!",
                data: user
            });    
        }else{
            res.status(200).json({
                ok: false,
                rowsAfected: rowsAfected,
                msg: "No se pudo Actualizar el usuario!",
                data: user
            });
        }
    }else{
        res.status(200).json({
            ok: false,
            rowsAfected: 0,
            msg: "No se pudo Actualizar el usuario!",
            data: null
        });
    }
}

async function deleteUser(req, res){
    let idUser = req.params.idUser;
    if(idUser){
        const user = await User.destroy({
            where: { idUser: idUser}
        });
        //Validamos si se actualizo.
        let rowsAfected = user;
        if(rowsAfected>0){
            res.status(200).json({
                ok: true,
                rowsAfected: rowsAfected,
                msg: "Usuario Eliminado con exito!",
                data: user
            });    
        }else{
            res.status(200).json({
                ok: false,
                rowsAfected: rowsAfected,
                msg: "No se pudo Eliminar el usuario!",
                data: user
            });
        }
    }else{
        res.status(200).json({
            ok: false,
            rowsAfected: 0,
            msg: "No se pudo Eliminar el usuario!",
            data: null
        });
    }
}

module.exports = {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};