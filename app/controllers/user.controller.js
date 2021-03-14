const bcryptJS = require('bcryptjs');
const moment = require('moment')
//Instancia del Model Usuario para la BD.
const { User } = require('../db/database.db');

//User controller.
//Obtener todos los usuarios.
async function getAllUsers(req, res) {
    const users = await User.findAll();
    let rowsAfected = Object.keys(users).length;
    res.json({
        isSuccessful: true,
        rowsAfected: rowsAfected,
        msg: "Usuarios Actuales en la Base de Datos!",
        usersData: users
    });
}

//Obtener un usuario por id.
async function getUser(req, res) {
    let rowsAfected = 0;
    var user = null;
    const idUser = req.params.idUser;
    if(idUser){
        user = await User.findOne({ where: { idUser: idUser } });
        if(user){
            rowsAfected = 1;
            res.json({
                isSuccessful: true,
                rowsAfected: rowsAfected,
                msg: `Usuario con id ${idUser} encontrado con exito!`,
                userData: user
            });
        }else{
            res.json({
                isSuccessful: false,
                rowsAfected: rowsAfected,
                msg: `No se ha encontrado un usuario con id ${idUser}`,
                userData: user
            });
        }
    }else{
        res.json({
            isSuccessful: false,
            rowsAfected: rowsAfected,
            msg: `No se a recibido el parametro idUsuario!`,
            userData: user
        });
    }
}

//Crear usuario.
async function createUser(req, res) {
    //Buscamos si existe algun usuario con ese correo ya registrado.
    const email = req.body.email;
    const user = await User.findOne({ where: { email: email } });
    //Validamos si se encontraron coincidencias.
    if(!user){
        //Encriptamos la contraseña...
        req.body.password = bcryptJS.hashSync(req.body.password, 10);
        //Validamos y formateamos la fecha de nacimiento.
        req.body.birthDate = moment(req.body.birthDate, 'YYYY/MM/DD');
        //Creamos el usuario.
        const newUser = await User.create(req.body);
        //Validamos si se creo.
        if(newUser){
            let rowsAfected = Object.keys(newUser).length;
            res.status(200).json({
                isSuccessful: true,
                rowsAfected: rowsAfected,
                msg: "Usuario registrado con exito!",
                userData: newUser,
                jwt: req.jwt
            });
        }else{
            res.status(402).json({
                isSuccessful: false,
                rowsAfectadas: 0,
                msg: "No se pudo registrar el usuario!",
                userData: newUser,
                jwt: req.jwt
            });
        }
    }else{
        res.status(402).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: `Error ya existe un usuario, registrado con el email ${email}`,
            userData: null,
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
            res.json({
                ok: true,
                rowsAfected: rowsAfected,
                msg: "Usuario Actualizado con exito!"
            });    
        }else{
            res.json({
                ok: false,
                rowsAfected: rowsAfected,
                msg: "No se pudo Actualizar el usuario!"
            });
        }
    }else{
        res.json({
            ok: false,
            rowsAfected: 0,
            msg: "No se pudo Actualizar el usuario!"
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
            res.json({
                ok: true,
                rowsAfected: rowsAfected,
                msg: "Usuario Eliminado con exito!"
            });    
        }else{
            res.json({
                ok: false,
                rowsAfected: rowsAfected,
                msg: "No se pudo Eliminar el usuario!"
            });
        }
    }else{
        res.json({
            ok: false,
            rowsAfected: 0,
            msg: "No se pudo Eliminar el usuario!"
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