'use strict'

const Pago = require('../models/pago');
const service = require('../services/service');


function savePago(req, res){
	let pago = new Pago();
	let params = req.body;
	pago.numeroTdc = params.numeroTdc;
	pago.nombreTitular = params.nombreTitular;
	pago.fechaVen = params.fechaVen;
	pago.cvv = params.cvv;
	pago.numCuotas = params.numCuotas;
	pago.user = params.user;

	// console.log(pago)
	
	pago.save((err, pagoStored)=>{
		if(err){
			var error = String(err)
			return res.status(500).send({message: error});
		}
		if(!pagoStored){
			return res.status(404).send({message: 'No se ha guardado el pago'});
		}else{
			return res.status(200).send({pago: pagoStored});
		}
	});
}

function getPagos(req, res){

	Pago.find({},(err, pagos)=>{
		if (err) {
			res.status(500).send({message: "Error en la petición"});
		}else{
			if(!pagos){
				res.status(404).send({message: "No hay pagos"});
			}else{				
					res.status(200).send({pagos: pagos});
				}	
			}
		
	});
}

function getPago(req, res){
	let pagoId = req.params.id;

	Pago.findById(pagoId,(err, pago)=>{
		if (err) {
			res.status(500).send({message: "Error en la petición"});
		}else{
			if(!pago){
				res.status(404).send({message: "No existe el pago"});
			}else{				
					res.status(200).send({pago: pago});
				}	
			}
		
	});
}

function deletePago(req, res){
	var pagoId = req.params.id;

	Pago.findByIdAndRemove(pagoId, (err, pagoRemoved)=>{
		if(err){
			res.status(500).send({message: "Error al borrar el Usuario"}); 
		}else{
			if(!pagoRemoved){
			res.status(404).send({message: "No se ha podido eliminar Usuario"});
			}else{
				res.status(200).send({pago: pagoRemoved});
			}
		}
	});
}



module.exports = {
	savePago,
	getPagos,
	getPago, 
	deletePago
}