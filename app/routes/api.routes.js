const {Router} = require('express');
const router = Router();
//Manejadores de las rutas.
const apiAuthRouter = require('./api/auth.routes');
const apiUserRouter = require('./api/user.routes');
//Middleware's
const authJwt = require('../middleware/authJwt')

//Ruta Inicial.
router.get('/', (req, res) =>{
    res.send('Api ETPS-3');
});

//Rutas de Login, Logout.
router.use('/auth', apiAuthRouter);
//Rutas de regitro.
router.use('/register', apiAuthRouter);
//Rutas de CRUD de Usuarios.
router.use('/users', authJwt.verifyToken, apiUserRouter);


module.exports = router;