'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PagoSchema = new Schema({
	numeroTdc: {
		type:Number
	},
	nombreTitular: {
		type:String
	},
	fechaVen:{
		type:String
	},
	cvv:{
		type:String
	},
	numCuotas:{
		type:Number
	}
	

})


module.exports = mongoose.model('Pago', PagoSchema);