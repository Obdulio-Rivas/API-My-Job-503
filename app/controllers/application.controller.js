//Instancia del Model Company para la BD.
const { Application } = require("../db/database.db");

//Application controller.
//Obtener todos las aplicaciones.
async function getAllApplications(req, res) {
  const application = await Application.findAll();
  let rowsAfected = Object.keys(application).length;
  res.status(200).json({
    isSuccessful: true,
    rowsAfected: rowsAfected,
    msg: "Aplicaciones Actuales en la Base de Datos!",
    data: application,
    jwt: req.jwt,
  });
}

//Obtener una aplicacion por id.
async function getApplication(req, res) {
  let rowsAfected = 0;
  var application = null;
  const idApplication = req.params.idApplication;
  if (idApplication) {
    application = await Application.findOne({
      where: { idApplication: idApplication },
    });
    if (application) {
      rowsAfected = 1;
      res.status(200).json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: `Aplicacion con id ${idApplication} encontrado con exito!`,
        data: application,
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        isSuccessful: false,
        rowsAfected: rowsAfected,
        msg: `No se ha encontrado una aplicacion con id ${idAplication}`,
        data: application,
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      isSuccessful: false,
      rowsAfected: rowsAfected,
      msg: `No se ha recibido el parametro idApplication!`,
      data: application,
      jwt: req.jwt,
    });
  }
}

//Obtener las aplicaciones por idUser.
async function getAplicationsByIdUser(req, res) {
  let rowsAfected = 0;
  var applications = null;
  const idUser = req.params.idUser;
  if (idUser) {
    applications = await Application.findAll({ where: { idUser: idUser } });
    if (applications) {
      rowsAfected = 1;
      res.status(200).json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: `Aplicaciones del usuaio con id ${idUser} encontradas con exito!`,
        data: applications,
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        isSuccessful: false,
        rowsAfected: rowsAfected,
        msg: `No se ha encontrado aplicaciones con el id de usuario ${idUser}`,
        data: applications,
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      isSuccessful: false,
      rowsAfected: rowsAfected,
      msg: `No se ha recibido el parametro idUser o idVacant!`,
      data: applications,
      jwt: req.jwt,
    });
  }
}

//Obtener las aplicaciones por idUser y idVacant.
async function getAplicationsByIdUserAndIdVacant(req, res) {
  let rowsAfected = 0;
  var applications = null;
  const {idUser, idVacant} = req.query;
  if (idUser) {
    applications = await Application.findOne({ where: { idUser: idUser, idVacant: idVacant } });
    if (applications) {
      rowsAfected = Object.keys(applications).length;
      if(rowsAfected>0){
          res.status(200).json({
            isSuccessful: true,
            rowsAfected: rowsAfected,
            msg: `Aplicaciones del usuaio con id ${idUser} y vacante con id ${idVacant} encontradas con exito!`,
            data: applications,
            jwt: req.jwt,
          });
      }else{
          res.status(200).json({
            isSuccessful: false,
            rowsAfected: rowsAfected,
            msg: `No se ha encontrado aplicaciones con el id de usuario ${idUser} y vacante con id ${idVacant}`,
            data: applications,
            jwt: req.jwt,
          });
      }
    }
  } else {
    res.status(200).json({
      isSuccessful: false,
      rowsAfected: rowsAfected,
      msg: `No se ha recibido el parametro idUser o idVacant!`,
      data: applications,
      jwt: req.jwt,
    });
  }
}

//Crear una Aplicacion (Solicitud).
async function createApplication(req, res) {
  //Buscamos si existe ya la aplicacion registrada para ese usuario con esa vacante.
  const idUser = req.body.idUser;
  const idVacant = req.body.idVacant;
  const application = await Application.findOne({
    where: { 
        idVacant: idVacant,
        idUser: idUser
    },
  });
  //Validamos si se encontraron coincidencias.
  if (!application){
    //Creamos la compañia.
    const newApplication = await Application.create(req.body);
    //Validamos si se creo.
    if (newApplication) {
      let rowsAfected = Object.keys(newApplication).length;
      res.status(200).json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: "Aplicacion registrada con exito!",
        data: [newApplication],
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        isSuccessful: false,
        rowsAfectadas: 0,
        msg: "No se pudo registrar la aplicacion!",
        data: null,
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      isSuccessful: false,
      rowsAfectadas: 0,
      msg: `Error ya existe una aplicacion, registrada para ese usuario`,
      data: null,
      jwt: req.jwt,
    });
  }
}

//Actualizar Apllicacion.
async function updateApplication(req, res) {
  let idApplication = req.params.idApplication;
  if (idApplication) {
    const application = await Application.update(req.body, {
      where: { idApplication: idApplication },
    });
    //Validamos si se actualizo.
    let rowsAfected = Object.keys(application).length;
    if (application[0] > 0) {
      res.status(200).json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: "Aplicacion Actualizado con exito!",
        data: application,
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        isSuccessful: false,
        rowsAfected: rowsAfected,
        msg: "No se pudo Actualizar la aplicacion!",
        data: null,
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      isSuccessful: false,
      rowsAfected: 0,
      msg: "No se pudo Actualizar la aplicacion!",
      data: null,
      jwt: req.jwt,
    });
  }
}

async function deleteApplication(req, res) {
  let idApplication = req.params.idApplication;
  if (idApplication) {
    const application = await Application.destroy({
      where: { idApplication: idApplication },
    });
    //Validamos si se actualizo.
    let rowsAfected = application;
    if (rowsAfected > 0) {
      res.status(200).json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: "Aplicacion Eliminada con exito!",
        data: [],
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        isSuccessful: false,
        rowsAfected: rowsAfected,
        msg: "No se pudo Eliminar la aplicacion!",
        data: [],
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      isSuccessful: false,
      rowsAfected: 0,
      msg: "No se pudo Eliminar la aplicacion!",
      data: null,
      jwt: req.jwt,
    });
  }
}

module.exports = {
  getApplication,
  getAplicationsByIdUser,
  getAplicationsByIdUserAndIdVacant,
  getAllApplications,
  createApplication,
  updateApplication,
  deleteApplication,
};
