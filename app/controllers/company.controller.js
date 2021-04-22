const bcryptJS = require('bcryptjs');
const moment = require('moment')
//Instancia del Model Company para la BD.
const { Company } = require('../db/database.db');

//Company controller.
//Obtener todos las compañias.
async function getAllCompanies(req, res) {
    const companies = await Company.findAll();
    let rowsAfected = Object.keys(companies).length;
    res.status(200).json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: "Compañias Actuales en la Base de Datos!",
        data: companies,
        jwt: req.jwt
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
            res.status(200).json({
                isSuccessful: true,
                rowsAfected: rowsAfected,
                msg: `Compañia con id ${idCompany} encontrado con exito!`,
                data: company,
                jwt: req.jwt
            });
        }else{
            res.status(200).json({
                isSuccessful: false,
                rowsAfected: rowsAfected,
                msg: `No se ha encontrado una compañia con id ${idCompany}`,
                data: company,
                jwt: req.jwt
            });
        }
    }else{
        res.status(200).json({
            isSuccessful: false,
            rowsAfected: rowsAfected,
            msg: `No se ha recibido el parametro idCompany!`,
            data: company,
            jwt: req.jwt
        });
    }
}

//Obtener un compañia por id.
async function getCompanyByIdUser(req, res) {
    let rowsAfected = 0;
    var company = null;
    const idUser = req.params.idUser;
    if(idUser){
        company = await Company.findOne({ where: { idUser: idUser } });
        if(company){
            rowsAfected = 1;
            res.status(200).json({
                isSuccessful: true,
                rowsAfected: rowsAfected,
                msg: `Compañia ${company.nameCompany} del usuaio con id ${idUser} encontrado con exito!`,
                data: company,
                jwt: req.jwt
            });
        }else{
            res.status(200).json({
                isSuccessful: false,
                rowsAfected: rowsAfected,
                msg: `No se ha encontrado una compañia con el id de usuario ${idUser}`,
                data: company,
                jwt: req.jwt
            });
        }
    }else{
        res.status(200).json({
            isSuccessful: false,
            rowsAfected: rowsAfected,
            msg: `No se ha recibido el parametro idUser!`,
            data: company,
            jwt: req.jwt
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
        //Creamos la compañia.
        const newCompany = await Company.create(req.body);
        //Validamos si se creo.
        if(newCompany){
            let rowsAfected = Object.keys(newCompany).length;
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
            msg: `Error ya existe una compañia, registrada con ese nombre ${nameCompany}`,
            data: null,
            jwt: req.jwt
        });
    }
}

//Obtener un usuario por id.
async function updateCompany(req, res) {
    let idCompany = req.params.idCompany;
    if(idCompany){
        const company = await Company.update(req.body, {
            where: { idCompany: idCompany}
        });
        //Validamos si se actualizo.
        let rowsAfected = Object.keys(company).length;
        if(company[0]>0){
            res.status(200).json({
                ok: true,
                rowsAfected: rowsAfected,
                msg: "Compañia Actualizado con exito!",
                data: company,
                jwt: req.jwt
            });    
        }else{
            res.status(200).json({
                ok: false,
                rowsAfected: rowsAfected,
                msg: "No se pudo Actualizar la compañia!",
                data: null,
                jwt: req.jwt
            });
        }
    }else{
        res.status(200).json({
            ok: false,
            rowsAfected: 0,
            msg: "No se pudo Actualizar la compañia!",
            data: null,
            jwt: req.jwt
        });
    }
}

async function deleteCompany(req, res){
    let idCompany = req.params.idCompany;
    if(idCompany){
        const company = await Company.destroy({
            where: { idCompany: idCompany}
        });
        //Validamos si se actualizo.
        let rowsAfected = company;
        if(rowsAfected>0){
            res.status(200).json({
                ok: true,
                rowsAfected: rowsAfected,
                msg: "Compañia Eliminada con exito!",
                data: company,
                jwt: req.jwt
            });    
        }else{
            res.status(200).json({
                ok: false,
                rowsAfected: rowsAfected,
                msg: "No se pudo Eliminar la compañia!",
                data: company,
                jwt: req.jwt
            });
        }
    }else{
        res.status(200).json({
            ok: false,
            rowsAfected: 0,
            msg: "No se pudo Eliminar la compañia!",
            data: company,
            jwt: req.jwt
        });
    }
}

module.exports = {
    getCompany,
    getCompanyByIdUser,
    getAllCompanies,
    createCompany,
    updateCompany,
    deleteCompany
};