//Requires node-modules.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
//Require personal modules.
const apiRouter = require('./app/routes/api.routes');

//Instanciando servidor...
const app = express();

//Variables de Configuracion...
app.set('port', process.env.PORT || 3000)

//Tablas
require('./app/db/database.db');

//Configuracion del servidor...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Middlesware's
app.use(cors())

//Rutas...
app.use('/api', apiRouter);

app.listen(app.get('port'), ()=>{
  console.log(`🚀 Servidor corriendo on port: https:localhost:${port}`);
});