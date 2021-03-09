//Requires node-modules.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
//Require personal modules.
const apiRouter = require('./app/routes/api.routes');

//Instanciando servidor...
const app = express();

//Variables de Configuracion...
const port = 3000
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

app.use('/', (req, res) =>{
  res.send('Welcome Api ETPS-3!');
});

app.listen(process.env.PORT || 5000, ()=>{
  console.log(`🚀 Servidor corriendo on port: https:localhost:${port}`);
});