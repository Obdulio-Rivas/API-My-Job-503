const moment = require("moment");
const jwtSimple = require("jwt-simple");
const config = require("../config/auth.config.js");

//Options
const expiredTime = 10


createToken = (user) => {
  const userData = user;
  const payload = {
    idUser: userData.idUser,
    createAt: moment().unix(),
    expiredAt: moment().add(expiredTime, 'minutes').unix()
  }
  //Retornamos el jwt unico del Usuario.
  return jwtSimple.encode(payload, config.secret);
}

updateToken = (idUser) => {
  
  const userData = {
    idUser: idUser
  }

  const payload = {
    idUser: userData.idUser,
    createAt: moment().unix(),
    expiredAt: moment().add(expiredTime, 'minutes').unix()
  }
  //Retornamos el jwt unico del Usuario.
  return jwtSimple.encode(payload, config.secret);
}

verifyToken = (req, res, next) => {
  //Obtenemos el token.
  let token = req.headers["user-access-token"];
  //Validamos que exista un token.
  if (!token) {
    return res.status(403).json({
      auth: false,
      msg: 'Necesitas un token para continuar.',
      jwt: null
    });
  }else{
    //Salvamos la cabecera con el token.
    const userToken = req.headers["user-access-token"];
    let payload = {};
    //Validamos que el token sea correcto.
    try {
      payload = jwtSimple.decode(userToken, config.secret);
    } catch (error) {
      return res.status(403).json({
        isSuccessful: false,
        msg: "El token es incorrecto!",
        jwt: null
      });
    }
    //Validamos si no a expirado el token.
    if(payload.expiredAt < moment().unix()){
      return res.status(403).json({
        isSuccessful: false,
        msg: "El token a expirado!",
        jwt: null
      });
    }else{
      //Generamos y actualizamos el nuevo token.
      //Id del usuario....
      req.idUser = payload.idUser;
      req.jwt = updateToken(payload.idUser)
    }
    //Seguimos con el siguiente manejador
    next();
  }
};

const authJwt = {
  createToken: createToken,
  verifyToken: verifyToken
};

module.exports = authJwt;