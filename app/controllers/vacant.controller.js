const bcryptJS = require("bcryptjs");
const moment = require("moment");
//Instancia del Model Company para la BD.
const { Vacant } = require("../db/database.db");

//Company controller.
//Obtener todos las compañias.
async function getAllVacants(req, res) {
  const vacants = await Vacant.findAll();
  let rowsAfected = Object.keys(vacants).length;
  res.json({
    isSuccessful: true,
    rowsAfected: rowsAfected,
    msg: "Vacantes Actuales en la Base de Datos!",
    data: vacants,
  });
}

//Obtener un compañia por id.
async function getVacant(req, res) {
  let rowsAfected = 0;
  var vacant = null;
  const idVacant = req.params.idVacant;
  if (idVacant) {
    vacant = await Vacant.findOne({ where: { idVacant: idVacant } });
    if (vacant) {
      rowsAfected = 1;
      res.json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: `Vacante con id ${idVacant} encontrado con exito!`,
        data: curriculum,
      });
    } else {
      res.json({
        isSuccessful: false,
        rowsAfected: rowsAfected,
        msg: `No se ha encontrado una vacante con id ${idVacant}`,
        data: curriculum,
      });
    }
  } else {
    res.json({
      isSuccessful: false,
      rowsAfected: rowsAfected,
      msg: `No se ha recibido el parametro idVacant!`,
      data: curriculum,
    });
  }
}

//Crear compañia.
async function createVacant(req, res) {
  //Buscamos si existe algun usuario con ese correo ya registrado.
  const idCompany = req.body.idCompany;
  const titleVacant = req.body.titleVacant;
  const vacant = await Curriculum.findOne({
    where: {
      idCompany: idCompany,
      titleVacant: titleVacant
    },
  });
  //Validamos si se encontraron coincidencias.
  if (!vacant) {
    //Creamos la compañia.
    const newCurriculum = await Curriculum.create(req.body);
    //Validamos si se creo.
    if (newCurriculum) {
      let rowsAfected = Object.keys(newCurriculum).length;
      res.status(200).json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: "Curriculum registrado con exito!",
        data: newCurriculum,
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        isSuccessful: false,
        rowsAfectadas: 0,
        msg: "No se pudo registrar el curriculum!",
        data: null,
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      isSuccessful: false,
      rowsAfectadas: 0,
      msg: `Error ya existe un curriculum, registrado para el usuario ${idUser}`,
      data: null,
      jwt: req.jwt,
    });
  }
}

//Obtener un usuario por id.
async function updateCurriculum(req, res) {
  let idCurriculum = req.params.idCurriculum;
  if (idCurriculum) {
    const curriculum = await Curriculum.update(req.body, {
      where: { idCurriculum: idCurriculum },
    });
    //Validamos si se actualizo.
    let rowsAfected = Object.keys(curriculum).length;
    if (curriculum[0] > 0) {
      res.status(200).json({
        ok: true,
        rowsAfected: rowsAfected,
        msg: "Curriculum Actualizado con exito!",
        data: curriculum,
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        ok: false,
        rowsAfected: rowsAfected,
        msg: "No se pudo Actualizar el curriculum!",
        data: null,
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      ok: false,
      rowsAfected: 0,
      msg: "No se pudo Actualizar el curriculum!",
      data: null,
      jwt: req.jwt,
    });
  }
}

async function deleteCurriculum(req, res) {
  let idCurriculum = req.params.idCurriculum;
  if (idCurriculum) {
    const curriculum = await Curriculum.destroy({
      where: { idCurriculum: idCurriculum },
    });
    //Validamos si se actualizo.
    let rowsAfected = curriculum;
    if (rowsAfected > 0) {
      res.status(200).json({
        ok: true,
        rowsAfected: rowsAfected,
        msg: "Curriculum Eliminado con exito!",
        data: curriculum,
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        ok: false,
        rowsAfected: rowsAfected,
        msg: "No se pudo Eliminar el curriculum!",
        data: curriculum,
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      ok: false,
      rowsAfected: 0,
      msg: "No se pudo Eliminar el curriculum!",
      data: null,
      jwt: req.jwt,
    });
  }
}

module.exports = {
  getCurriculum,
  getAllCurriculums,
  createCurriculum,
  updateCurriculum,
  deleteCurriculum,
};
