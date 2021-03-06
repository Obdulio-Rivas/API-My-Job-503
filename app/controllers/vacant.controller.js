//Instancia del Model Company para la BD.
const { Vacant, Application } = require("../db/database.db");

//Company controller.
//Obtener todas las vacantes.
async function getAllVacants(req, res) {
  const vacants = await Vacant.findAll();
  let rowsAfected = Object.keys(vacants).length;
  res.status(200).json({
    isSuccessful: true,
    rowsAfected: rowsAfected,
    msg: "Vacantes Actuales en la Base de Datos!",
    data: vacants,
    jwt: req.jwt
  });
}

//Obtener una vacante por id.
async function getVacant(req, res) {
  let rowsAfected = 0;
  var vacant = null;
  const idVacant = req.params.idVacant;
  if (idVacant) {
    vacant = await Vacant.findOne({ where: { idVacant: idVacant } });
    if (vacant) {
      rowsAfected = 1;
      res.status(200).json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: `Vacante con id ${idVacant} encontrado con exito!`,
        data: vacant,
        jwt: req.jwt
      });
    } else {
      res.status(200).json({
        isSuccessful: false,
        rowsAfected: rowsAfected,
        msg: `No se ha encontrado una vacante con id ${idVacant}`,
        data: vacant,
        jwt: req.jwt
      });
    }
  } else {
    res.status(200).json({
      isSuccessful: false,
      rowsAfected: rowsAfected,
      msg: `No se ha recibido el parametro idVacant!`,
      data: vacant,
      jwt: req.jwt
    });
  }
}

async function getVacantsByCategory(req, res) {
  let rowsAfected = 0;
  const categoryVacant = req.params.categoryVacant;
  if (categoryVacant) {
    vacants = await Vacant.findAll({ where: { categoryVacant: categoryVacant } });
    if (vacants) {
      rowsAfected = Object.keys(vacants).length;
      res.status(200).json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: `Vacantes Actuales de la categoria ${categoryVacant}`,
        data: vacants,
        jwt: req.jwt
      });
    } else {
      res.status(200).json({
        isSuccessful: false,
        rowsAfected: rowsAfected,
        msg: `No se han encontrado vacantes con la categoria ${categoryVacant}`,
        data: vacants,
        jwt: req.jwt
      });
    }
  } else {
    res.status(200).json({
      isSuccessful: false,
      rowsAfected: rowsAfected,
      msg: `No se ha recibido el parametro categoryVacant!`,
      data: vacants,
      jwt: req.jwt
    });
  }
}

async function getVacantsByIdCompany(req, res) {
  let rowsAfected = 0;
  const idCompany = req.params.idCompany;
  if (idCompany) {
    vacants = await Vacant.findAll({ where: { idCompany: idCompany } });
    if (vacants) {
      rowsAfected = Object.keys(vacants).length;
      res.status(200).json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: `Vacantes Actuales de la compa??ia con id ${idCompany}`,
        data: vacants,
        jwt: req.jwt
      });
    } else {
      res.status(200).json({
        isSuccessful: false,
        rowsAfected: rowsAfected,
        msg: `No se han encontrado vacantes con el id de compa??ia ${idCompany}`,
        data: vacants,
        jwt: req.jwt
      });
    }
  } else {
    res.status(200).json({
      isSuccessful: false,
      rowsAfected: rowsAfected,
      msg: `No se ha recibido el parametro idCompany!`,
      data: vacants,
      jwt: req.jwt
    });
  }
}

//Crear Vacante.
async function createVacant(req, res) {
  //Buscamos si existe alguna vacante con ese titulo de parte de la compa??ia.
  const state = 1;
  const idCompany = req.body.idCompany;
  const titleVacant = req.body.titleVacant;
  const vacant = await Vacant.findOne({
    where: {
      idCompany: idCompany,
      titleVacant: titleVacant,
      state: state
    },
  });
  //Validamos si se encontraron coincidencias.
  if (!vacant) {
    //Creamos la vacante.
    const newVacant = await Vacant.create(req.body);
    //Validamos si se creo.
    if (newVacant) {
      let rowsAfected = Object.keys(newVacant).length;
      res.status(200).json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: `Vacante ${newVacant.titleVacant} registrado con exito!`,
        data: newVacant,
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        isSuccessful: false,
        rowsAfectadas: 0,
        msg: `No se pudo registrar la vacante ${titleVacant}!`,
        data: null,
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      isSuccessful: false,
      rowsAfectadas: 0,
      msg: `Error ya existe una vacante, registrada como ${titleVacant}`,
      data: null,
      jwt: req.jwt,
    });
  }
}

//Actualizar la vacante.
async function updateVacant(req, res) {
  let idVacant = req.params.idVacant;
  if (idVacant) {
    const vacant = await Vacant.update(req.body, {
      where: { idVacant: idVacant },
    });
    //Validamos si se actualizo.
    let rowsAfected = Object.keys(vacant).length;
    if (vacant[0] > 0) {
      res.status(200).json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: "Vacante Actualizado con exito!",
        data: vacant,
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        isSuccessful: false,
        rowsAfected: rowsAfected,
        msg: "No se pudo Actualizar la vacante!",
        data: null,
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      isSuccessful: false,
      rowsAfected: 0,
      msg: "No se pudo Actualizar la vacante!",
      data: null,
      jwt: req.jwt,
    });
  }
}

async function deleteVacant(req, res) {
  let idVacant = req.params.idVacant;
  if (idVacant) {
    //Eliminamos las aplicaciones que esten vinculadas con el idVacant.
    const application = await Application.destroy({
      where: { idVacant: idVacant },
    });
    //Eliminamos la vacante con perteneciente al idVacant.
    const vacant = await Vacant.destroy({
      where: { idVacant: idVacant },
    });
    //Validamos si se actualizo.
    let rowsAfected = vacant;
    if (rowsAfected > 0) {
      res.status(200).json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: "Vacante y aplicaciones relacionadas eliminadas con exito!",
        data: [],
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        isSuccessful: false,
        rowsAfected: rowsAfected,
        msg: "No se pudo eliminar la vacante!",
        data: [],
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      isSuccessful: false,
      rowsAfected: 0,
      msg: "No se pudo Eliminar la vacante!",
      data: null,
      jwt: req.jwt,
    });
  }
}

module.exports = {
  getVacant,
  getAllVacants,
  getVacantsByCategory,
  getVacantsByIdCompany,
  createVacant,
  updateVacant,
  deleteVacant,
};
