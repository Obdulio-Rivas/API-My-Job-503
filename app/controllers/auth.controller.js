const moment = require('moment');
const bcryptJS = require('bcryptjs');
const crypto = require('crypto');
//Middleware's.
const authJwt = require('../middleware/authJwt');
const verifyGoogle = require('../middleware/verifyGoogle');
//Helper´s
const { sendConfirmationEmail } = require('../helpers/sendMail');
//Instancia del Model Usuario para la BD.
const { User } = require('../db/database.db');

//Helper para la creacion del JSON del usuario
function userDataInit(user){
    //Inicializamos con informacion el objeto JSON.
    let userData = {
        idUser: user.idUser,
        name: user.name,
        lastname: user.lastname,
        imgURL: user.imgURL,
        age: user.age,
        civilStatus: user.civilStatus,
        numberDUI: user.numberDUI,
        numberNIT: user.numberNIT,
        address: user.address,
        telephoneNumber: user.telephoneNumber,
        birthDate: user.birthDate,
        nationality: user.nationality,
        email: user.email,
        password: user.password,
        codeConfirmation: user.codeConfirmation,
        socialSingIn: user.socialSingIn,
        idRole: user.idRole,
        state: user.state,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        jwt: authJwt.createToken(user)
    }
    //Retornamos el objeto JSON del usuario ya con la informacion.
    return userData;
}

//Iniciar sesion usuario.
async function loginUser(req, res){
    const rowsAfected = 0;
    const {email, password} = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user !== null) {
        //Comparamos la contraseña del usuario contra la de la BD.
        if(bcryptJS.compareSync(password, user.password)){
            //Validamos si inicio sesion con una cuenta de google la primera vez.
            if(!user.socialSingIn){
                //Validamos que el usuario no este inactivo en el sistema.
                if(user.state){
                    const userData = userDataInit(user);
                    res.status(200).json({
                        isSuccessful: true,
                        rowsAfected: rowsAfected,
                        msg: "Inicio de sesión exitoso!",
                        userData: userData
                    });
                }else{
                    res.status(200).json({
                        isSuccessful: false,
                        rowsAfected: rowsAfected,
                        msg: "Usuario actualmente inactivo, contacte con el administrador!",
                        userData: null
                    });
                }
            }else{
                res.status(200).json({
                    isSuccessful: false,
                    rowsAfected: rowsAfected,
                    msg: "Inicia sesion con tu cuenta de google!",
                    userData: null
                });
            }
        }else{
            res.status(200).json({
                isSuccessful: false,
                rowsAfected: 0,
                msg: "Credenciales incorrectas!",
                userData: null
            });    
        }
    } else {
        res.status(200).json({
            isSuccessful: false,
            rowsAfected: 0,
            msg: "Debes de registrarte para iniciar sesión!",
            userData: null
        });
    }
}

//Registro de usuario.
async function signInUser(req, res){
    //Buscamos si existe algun usuario con ese correo ya registrado.
    const email = req.body.email;
    const user = await User.findOne({ where: { email: email } });
    //Validamos si se encontraron coincidencias.
    if(!user){
        //Encriptamos la contraseña...
        req.body.password = bcryptJS.hashSync(req.body.password, 10);
        //Validamos y formateamos la fecha de nacimiento.
        req.body.birthDate = moment('1981/06/12', 'YYYY/MM/DD');
        //Agregamos el codigo de confirmación.
        req.body.codeConfirmation = crypto.randomBytes(20).toString('hex');
        //Creamos el usuario.
        const newUser = await User.create(req.body);
        //Validamos si se creo.
        if(newUser){
            let rowsAfected = Object.keys(newUser).length;
            //Generamos el JSON del usuario.
            const userData = userDataInit(newUser);
            userData.socialSingIn = 0;
            //Enviamos el correo con los pasos faltantes.
            sendConfirmationEmail(userData.name, userData.email, userData.codeConfirmation);
            //Respondemos la solicitud.
            res.status(200).json({
                isSuccessful: true,
                rowsAfected: rowsAfected,
                msg: "Te has registrado con exito!",
                userData: newUser
            });
        }else{
            res.status(200).json({
                isSuccessful: false,
                rowsAfectadas: 0,
                msg: "No se pudo registrar el usuario!",
                userData: null
            });
        }
    }else{
        res.status(200).json({
            isSuccessful: false,
            rowsAfectadas: 0,
            msg: `Error ya existe un usuario, registrado con el email ${email}`,
            userData: null
        });
    }
}

//Iniciar sesion usuario con google.
async function signInGoogleUser(req, res){
    const rowsAfected = 0;
    const { id_token } = req.body;
    //Bloque try
    try {
        //Validamos el id_token del inicio de sesion de google.
        const { name, lastname, imgURL, email, state } = await verifyGoogle(id_token);
        //Validamos si existe ya un usuario con ese correo.
        const user = await User.findOne({ where: { email: email } });
        if (user !== null) {
            //Ya habia iniciado sesion antes con la cuenta de google.
            //Validamos que la cuenta este activa.
            if(state){
                const userData = userDataInit(user);
                //Respondemos la solicitud.
                res.status(200).json({
                    isSuccessful: true,
                    rowsAfected: rowsAfected,
                    msg: "Inicio de sesión exitoso!",
                    userData: userData
                });
            }else{
                //Respondemos la solicitud.
                res.status(200).json({
                    isSuccessful: true,
                    rowsAfected: rowsAfected,
                    msg: "Usuario actualmente inactivo, contacte con el administrador!",
                    userData: null
                });
            }
        } else {
            //Lo registramos por primera vez con la informacion proviniente de su cuenta de correo de google.
            const newUserData = {
                name,
                lastname,
                imgURL,
                email,
                state: 1,
                socialSingIn: 1,
                codeConfirmation: null
            }
            //Obtenemos el JSON del usuario.
            const userData = userDataInit(newUserData);
            //Encriptamos la contraseña por default.
            userData.password = bcryptJS.hashSync("Password123.", 10);
            //Fecha de nacimiento por default.
            userData.birthDate = moment('1981/06/12', 'YYYY/MM/DD');
            //Agregamos el codigo de confirmación.
            userData.codeConfirmation = crypto.randomBytes(20).toString('hex');
            console.log(userData.codeConfirmation)
            //Creamos el usuario.
            const newUser = await User.create(userData);
            //Validamos si se creo.
            if(newUser){
                let rowsAfected = Object.keys(newUser).length;
                //Generamos el JSON del usuario.
                const userData = userDataInit(newUser);
                //Enviamos el correo con los pasos faltantes.
                sendConfirmationEmail(userData.name, userData.email, userData.codeConfirmation)
                //Respondemos la solicitud.
                res.status(200).json({
                    isSuccessful: true,
                    rowsAfected: rowsAfected,
                    msg: "Te has registrado con exito!",
                    userData: userData
                });
            }else{
                res.status(200).json({
                    isSuccessful: false,
                    rowsAfectadas: 0,
                    msg: "No se pudo registrar el usuario!",
                    userData: null
                });
            }
        }  
    } catch (error) {
        res.status(200).json({
            isSuccessful: false,
            rowsAfected: 0,
            msg: "Token de Google no es valido!",
            userData: null
        });
    }
}


//Iniciar sesion usuario con google.
async function confirmEmailUser(req, res){
    //Obtenemos el codigo de confirmación.
    const { codeConfirmation } = req.params;
    try {
        //Buscamos si existe un usuario con ese codigo de confirmación.
        var user = await User.findOne({ where: { codeConfirmation: codeConfirmation } });
        if (user !== null) {
            //Actualizamos el estado del usuario
            user.state = 2;
            await user.save();
            //Respondemos con una vista.
            res.sendFile('/' + __dirname.split('/', 2)[1] + '/public/pageConfirmation.html');
        }else{
            //Respondemos con una vista.
            res.sendFile('/' + __dirname.split('/', 2)[1] + '/public/pageConfirmation.html');
        }
    } catch (error) {        
        //Respondemos con una vista.
        res.sendFile('/' + __dirname.split('/', 2)[1] + '/public/pageConfirmation.html');
    }
}

module. exports = {
    loginUser,
    signInUser,
    signInGoogleUser,
    confirmEmailUser,
}