const bcryptJS = require('bcryptjs');
const moment = require('moment');
const authJwt = require('../middleware/authJwt');
//Instancia del Model Usuario para la BD.
const { User } = require('../db/database.db');

async function loginUser(req, res){
    const rowsAfected = 0;
    const {email, password} = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user !== null) {
        //Comparamos la contraseña del usuario contra la de la BD.
        if(bcryptJS.compareSync(password, user.password)){
            const userData = {
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
                idRole: user.idRole,
                state: user.state,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                jwt: authJwt.createToken(user),
            }
            res.status(200).json({
                isSuccessful: true,
                rowsAfected: rowsAfected,
                msg: "Login correcto!",
                userData: userData
            });    
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
            msg: "Credenciales incorrectas!",
            userData: null
        });
    }
}

//Registro de usuario
async function registerUser(req, res){
    //Buscamos si existe algun usuario con ese correo ya registrado.
    const email = req.body.email;
    const user = await User.findOne({ where: { email: email } });
    //Validamos si se encontraron coincidencias.
    if(!user){
        //Encriptamos la contraseña...
        req.body.password = bcryptJS.hashSync(req.body.password, 10);
        //Validamos y formateamos la fecha de nacimiento.
        req.body.birthDate = moment('1981/06/12', 'YYYY/MM/DD');
        //Creamos el usuario.
        const newUser = await User.create(req.body);
        //Validamos si se creo.
        if(newUser){
            console.log(newUser)
            let rowsAfected = Object.keys(newUser).length;
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
                userData: newUser
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

module. exports = {
    loginUser,
    registerUser
}