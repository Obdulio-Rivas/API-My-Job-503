const bcryptJS = require('bcryptjs');
const moment = require('moment')
//Instancia del Model Company para la BD.
const { Curriculum } = require('../db/database.db');

//Company controller.
//Obtener todos las compañias.
async function getAllCurriculums(req, res) {
    const curriculums = await Curriculum.findAll();
    let rowsAfected = Object.keys(curriculums).length;
    res.json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: "Curriculums Actuales en la Base de Datos!",
        data: curriculums,
        jwt: req.jwt
    });
}

//Obtener un compañia por id.
async function getCurriculum(req, res) {
    let rowsAfected = 0;
    var curriculum = null;
    const idCurriculum = req.params.idCurriculum;
    if(idCurriculum){
        curriculum = await Curriculum.findOne({ where: { idCurriculum: idCurriculum } });
        if(curriculum){
            rowsAfected = 1;
            res.json({
                isSuccessful: true,
                rowsAfected: rowsAfected,
                msg: `Curriculum con id ${idCurriculum} encontrado con exito!`,
                data: curriculum,
                jwt: req.jwt
            });
        }else{
            res.json({
                isSuccessful: false,
                rowsAfected: rowsAfected,
                msg: `No se ha encontrado un curriculum con id ${idCurriculum}`,
                data: curriculum,
                jwt: req.jwt
            });
        }
    }else{
        res.json({
            isSuccessful: false,
            rowsAfected: rowsAfected,
            msg: `No se ha recibido el parametro idCurriculum!`,
            data: curriculum,
            jwt: req.jwt
        });
    }
}

//Crear compañia.
async function createCurriculum(req, res) {
    //Buscamos si existe algun usuario con ese correo ya registrado.
    const idUser = req.body.idUser;
    const curriculum = await Curriculum.findOne({ where: { idUser: idUser } });
    //Validamos si se encontraron coincidencias.
    if(!curriculum){
        //Creamos la compañia.
        const newCurriculum = await Curriculum.create(req.body);
        //Validamos si se creo.
        if(newCurriculum){
            let rowsAfected = Object.keys(newCurriculum).length;
            res.status(200).json({
                isSuccessful: true,
                rowsAfected: rowsAfected,
                msg: "Curriculum registrado con exito!",
                data: newCurriculum,
                jwt: req.jwt
            });
        }else{
            res.status(200).json({
                isSuccessful: false,
                rowsAfectadas: 0,
                msg: "No se pudo registrar el curriculum!",
                data: null,
                jwt: req.jwt
            });
        }
    }else{
        res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: `Error ya existe un curriculum, registrado para el usuario ${idUser}`,
            data: null,
            jwt: req.jwt
        });
    }
}

//Obtener un usuario por id.
async function updateCurriculum(req, res) {
    let idCurriculum = req.params.idCurriculum;
    if(idCurriculum){
        const curriculum = await Curriculum.update(req.body, {
            where: { idCurriculum: idCurriculum}
        });
        //Validamos si se actualizo.
        let rowsAfected = Object.keys(curriculum).length;
        if(curriculum[0]>0){
            res.status(200).json({
                ok: true,
                rowsAfected: rowsAfected,
                msg: "Curriculum Actualizado con exito!",
                data: curriculum,
                jwt: req.jwt
            });    
        }else{
            res.status(200).json({
                ok: false,
                rowsAfected: rowsAfected,
                msg: "No se pudo Actualizar el curriculum!",
                data: null,
                jwt: req.jwt
            });
        }
    }else{
        res.status(200).json({
            ok: false,
            rowsAfected: 0,
            msg: "No se pudo Actualizar el curriculum!",
            data: null,
            jwt: req.jwt
        });
    }
}

async function deleteCurriculum(req, res){
    let idCurriculum = req.params.idCurriculum;
    if(idCurriculum){
        const curriculum = await Curriculum.destroy({
            where: { idCurriculum: idCurriculum}
        });
        //Validamos si se actualizo.
        let rowsAfected = curriculum;
        if(rowsAfected>0){
            res.status(200).json({
                ok: true,
                rowsAfected: rowsAfected,
                msg: "Curriculum Eliminado con exito!",
                data: curriculum,
                jwt: req.jwt
            });    
        }else{
            res.status(200).json({
                ok: false,
                rowsAfected: rowsAfected,
                msg: "No se pudo Eliminar el curriculum!",
                data: curriculum,
                jwt: req.jwt
            });
        }
    }else{
        res.status(200).json({
            ok: false,
            rowsAfected: 0,
            msg: "No se pudo Eliminar el curriculum!",
            data: null,
            jwt: req.jwt
        });
    }
}

module.exports = {
    getCurriculum,
    getAllCurriculums,
    createCurriculum,
    updateCurriculum,
    deleteCurriculum
};