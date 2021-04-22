const {Router} = require('express');
const router = Router();
//Manejadores de las rutas.
const apiAuthRouter = require('./api/auth.routes');
const apiUserRouter = require('./api/user.routes');
const apiCompanyRouter = require('./api/company.router');
const apiCurriculumRouter = require('./api/curriculum.router');
const apiVacantRouter = require('./api/vacant.router');
//Middleware's
const authJwt = require('../middleware/authJwt')

//Ruta Inicial.
router.get('/', (req, res) =>{
    res.sendFile('/' + __dirname.split('/', 2)[1] + '/public/pageApiWiki.html');
});

//Rutas de Login, Logout de Usuarios.
router.use('/auth', apiAuthRouter);
//Rutas de Sign In de Usuarios.
router.use('/signIn', apiAuthRouter);
//Rutas de Sign In de Usuarios.
router.use('/confirm', apiAuthRouter);
//Rutas de validacion JWT.
router.use('/validate', authJwt.verifyToken, apiAuthRouter);
//Rutas de CRUD de Usuarios.
router.use('/users', authJwt.verifyToken, apiUserRouter);
//Rutas de CRUD de Empresas.
router.use('/company', authJwt.verifyToken, apiCompanyRouter);
//Rutas de CRUD de Curriculum.
router.use('/curriculum', authJwt.verifyToken, apiCurriculumRouter);
//Rutas de CRUD de las vacantes.
router.use('/vacant', authJwt.verifyToken, apiVacantRouter);

module.exports = router;