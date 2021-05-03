const bcryptJS = require("bcryptjs");
const moment = require("moment");
const cloudinary = require("cloudinary");
//Instancia del Model User para la BD.
const { User } = require("../db/database.db");

//Configuraciones de cloudinary.
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//User controller.
//Obtener todos los usuarios.
async function getAllUsers(req, res) {
  const users = await User.findAll();
  let rowsAfected = Object.keys(users).length;
  res.json({
    isSuccessful: true,
    rowsAfected: rowsAfected,
    msg: "Usuarios Actuales en la Base de Datos!",
    data: users,
    jwt: req.jwt,
  });
}

//Obtener un usuario por id.
async function getUser(req, res) {
  let rowsAfected = 0;
  var user = null;
  const idUser = req.params.idUser;
  if (idUser) {
    user = await User.findOne({ where: { idUser: idUser } });
    if (user) {
      rowsAfected = 1;
      res.json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: `Usuario con id ${idUser} encontrado con exito!`,
        data: user,
        jwt: req.jwt,
      });
    } else {
      res.json({
        isSuccessful: false,
        rowsAfected: rowsAfected,
        msg: `No se ha encontrado un usuario con id ${idUser}`,
        data: user,
        jwt: req.jwt,
      });
    }
  } else {
    res.json({
      isSuccessful: false,
      rowsAfected: rowsAfected,
      msg: `No se a recibido el parametro idUsuario!`,
      data: user,
      jwt: req.jwt,
    });
  }
}

//Crear usuario.
async function createUser(req, res) {
  //Buscamos si existe algun usuario con ese correo ya registrado.
  const email = req.body.email;
  const user = await User.findOne({ where: { email: email } });
  //Validamos si se encontraron coincidencias.
  if (!user) {
    //Encriptamos la contraseña...
    req.body.password = bcryptJS.hashSync(req.body.password, 10);
    //Validamos y formateamos la fecha de nacimiento.
    req.body.birthDate = moment(req.body.birthDate, "YYYY-MM-DD");
    //Creamos el usuario.
    const newUser = await User.create(req.body);
    //Validamos si se creo.
    if (newUser) {
      let rowsAfected = Object.keys(newUser).length;
      res.status(200).json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: "Usuario registrado con exito!",
        data: newUser,
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        isSuccessful: false,
        rowsAfectadas: 0,
        msg: "No se pudo registrar el usuario!",
        data: newUser,
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      isSuccessful: false,
      rowsAfectadas: 0,
      msg: `Error ya existe un usuario, registrado con el email ${email}`,
      data: user,
      jwt: req.jwt,
    });
  }
}

//Obtener un usuario por id.
async function updateUser(req, res) {
  let idUser = req.params.idUser;
  if (idUser) {
    const user = await User.update(req.body, {
      where: { idUser: idUser },
    });
    //Validamos si se actualizo.
    let rowsAfected = Object.keys(user).length;
    if (rowsAfected > 0) {
      res.status(200).json({
        ok: true,
        rowsAfected: rowsAfected,
        msg: "Usuario Actualizado con exito!",
        data: user,
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        ok: false,
        rowsAfected: rowsAfected,
        msg: "No se pudo Actualizar el usuario!",
        data: user,
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      ok: false,
      rowsAfected: 0,
      msg: "No se pudo Actualizar el usuario!",
      data: null,
      jwt: req.jwt,
    });
  }
}

async function updateUserAvatar(req, res) {
  const {idUser, imgURL} = req.params;
  if (idUser) {
    const user = await User.update(
      {
        imgURL: imgURL,
      },
      {
        where: { idUser: idUser },
      }
    );
    //Validamos si se actualizo.
    let rowsAfected = Object.keys(user).length;
    if (rowsAfected > 0) {
      res.status(200).json({
        ok: true,
        rowsAfected: rowsAfected,
        msg: "Imagen del usuario actualizada con exito!",
        data: user,
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        ok: false,
        rowsAfected: rowsAfected,
        msg: "No se pudo actualizar la imagen del usuario!",
        data: user,
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      ok: false,
      rowsAfected: 0,
      msg: "No se pudo actualizar la imagen del usuario!",
      data: null,
      jwt: req.jwt,
    });
  }
}

async function deleteUser(req, res) {
  let idUser = req.params.idUser;
  if (idUser) {
    const user = await User.destroy({
      where: { idUser: idUser },
    });
    //Validamos si se actualizo.
    let rowsAfected = user;
    if (rowsAfected > 0) {
      res.status(200).json({
        ok: true,
        rowsAfected: rowsAfected,
        msg: "Usuario Eliminado con exito!",
        data: user,
        jwt: req.jwt,
      });
    } else {
      res.status(200).json({
        ok: false,
        rowsAfected: rowsAfected,
        msg: "No se pudo Eliminar el usuario!",
        data: user,
        jwt: req.jwt,
      });
    }
  } else {
    res.status(200).json({
      ok: false,
      rowsAfected: 0,
      msg: "No se pudo Eliminar el usuario!",
      data: null,
      jwt: req.jwt,
    });
  }
}

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserAvatar
};
