'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PolizaSchema = new Schema({
	placa:{
		type:String,
		required: true,
		unique: true
	},
	clase: {
		type:String,
		required: true
	},
	subtipo: {
		type:Number
	},
	edad:{
		type:Number,
		required: true
	},
	//De aca en adelante lo genera automatico el front
	fechaInicio:{
		type:Date
	},
	fechaVen:{
		type:Date
	},
	tasa:{
		type:Number
	},
	valorPrima:{
		type:Number
	},
	fosyga:{
		type:Number
	},
	subtotal:{
		type:Number
	},
	total:{
		type:Number
	},
	user: [{type: Schema.ObjectId, ref: 'User'}],
	pago: [{type: Schema.ObjectId, ref: 'Pago'}],
	

})


module.exports = mongoose.model('Poliza', PolizaSchema);