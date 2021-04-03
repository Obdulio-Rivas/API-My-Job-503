//Requires node-modules.
const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require('cors');
//Require personal modules.
const apiRouter = require('./app/routes/api.routes');

//Instanciando servidor...
const app = express();

//Tablas
require('./app/db/database.db');

//Middlesware's
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors())
app.use(express.static('public'))

//Rutas...
//Ruta API.
app.use('/api', apiRouter);

//Ruta 404.
app.use('*', (req, res) =>{
  res.sendFile(__dirname + '/public/page404.html');
});

app.listen(process.env.PORT || port, ()=>{
  console.log(`🚀 Servidor corriendo on port: https:localhost:${process.env.PORT}`);
});