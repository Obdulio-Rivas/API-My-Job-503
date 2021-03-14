const bcryptJS = require('bcryptjs');
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
                usersData: null
            });    
        }
    } else {
        res.status(200).json({
            isSuccessful: false,
            rowsAfected: 0,
            msg: "Credenciales incorrectas!",
            usersData: null
        });
    }
}

async function logoutUser(req, res){

}

module. exports = {
    loginUser,
    logoutUser
}