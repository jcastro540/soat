'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EmailSchema = new Schema({
	nombre: {
		type:String
	},
	apellido:String,
	email: {
		type:String,
	},
	fechaInicio:String,
	fechaVen:String,
	tasa:String,
	valorPrima:String,
	fosyga:String,
	subtotal:String,
	total:String,
	nombreTDC:String,
	numeroTDC:String,
	numeroCuotas:String,
	placa:String,
	clase:String,
	subtipo:String,
	edad:String

});

module.exports = mongoose.model('Email', EmailSchema);