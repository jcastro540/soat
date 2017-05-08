'use strict'

let mongoose = require('mongoose');
let port = process.env.PORT || 3700;
let app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://jcastro:9736393@ds133221.mlab.com:33221/soat', (err, res)=>{
	if (err) {
		throw err;
	}else{
		console.log("Base de datos funcionando correctamente");

		app.listen(port, ()=>{
			console.log(`API REST de app escuchando en el puerto ${port}`)
		});
	}
});



// mongodb://localhost:27017/api_rest_soat