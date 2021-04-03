const {Router} = require('express');
const router = Router();
//Manejadores de las rutas.
const apiAuthRouter = require('./api/auth.routes');
const apiUserRouter = require('./api/user.routes');
//Middleware's
const authJwt = require('../middleware/authJwt')

//Ruta Inicial.
router.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/pageApiWiki.html');
});

//Rutas de Login, Logout de Usuarios.
router.use('/auth', apiAuthRouter);
//Rutas de Sign In de Usuarios.
router.use('/signIn', apiAuthRouter);
//Rutas de Sign In de Usuarios.
router.use('/confirm', apiAuthRouter);
//Rutas de CRUD de Usuarios.
router.use('/users', authJwt.verifyToken, apiUserRouter);
//Rutas de CRUD de Empresas.
router.use('/company', authJwt.verifyToken, apiUserRouter);
//Rutas de CRUD de Curriculum.
router.use('/curriculum', authJwt.verifyToken, apiUserRouter);


module.exports = router;