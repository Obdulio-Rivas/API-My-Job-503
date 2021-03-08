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

verifyToken = (req, res, next) => {
  let token = req.headers["user-access-token"];

  if (!token) {
    return res.status(403).json({
      auth: false,
      msg: 'Necesitas un token para continuar.'
    });
  }else{
    //Salvamos la cabecera con el token.
    const userToken = req.headers["user-access-token"];
    let payload = {};
    try {
      payload = jwtSimple.decode(userToken, config.secret);
    } catch (error) {
      return res.status(403).json({
        isSuccessful: false,
        msg: "El token es incorrecto!",
      });
    }
    //Validamos si no a expirado el token.
    if(payload.expiredAt < moment().unix()){
      return res.status(403).json({
        isSuccessful: false,
        msg: "El token a expirado!",
      });
    }
    //Id del usuario....
    req.idUser = payload.idUser;
    //Seguimos con el siguiente manejador
    next();
  }
};

const authJwt = {
  createToken: createToken,
  verifyToken: verifyToken
};

module.exports = authJwt;