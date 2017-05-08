'use strict'

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

// Carga de Rutas
let userRoutes = require('./routes/user');
let pagoRoutes = require('./routes/pago');
let polizaRoutes = require('./routes/poliza');
var EmailRoutes = require('./routes/email');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) =>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');

	next();
});

// Rutas Base
app.use('/api', userRoutes);
app.use('/api', pagoRoutes);
app.use('/api', polizaRoutes);
app.use('/api', EmailRoutes);

module.exports = app;