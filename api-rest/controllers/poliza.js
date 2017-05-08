'use strict'

const Poliza = require('../models/poliza');

function savePoliza(req, res){
	let poliza = new Poliza();
	let params = req.body;
	poliza.placa = params.placa;
	poliza.clase = params.clase;
	poliza.subtipo = params.subtipo;
	poliza.edad = params.edad;
	poliza.tasa = params.tasa;
	poliza.valorPrima = params.valorPrima;
	poliza.fosyga = params.fosyga;
	poliza.subtotal = params.subtotal;
	poliza.total = params.total;
	poliza.user = params.user;
	poliza.pago = params.pago;
	poliza.fechaInicio = params.fechaInicio;
	poliza.fechaVen = params.fechaVen;

	// console.log(pago)
	
	poliza.save((err, polizaStored)=>{
		if(err){
			var error = String(err)
			return res.status(500).send({message: error});
		}
		if(!polizaStored){
			return res.status(404).send({message: 'No se ha guardado la poliza'});
		}else{
			return res.status(200).send({poliza: polizaStored});
		}
	});
}

function getPolizas(req, res){
	Poliza.find()
    .populate('user pago')
    .exec(function (err, polizas) {
		if (err) {
			res.status(500).send({message: "Error en la petición"});
		}else{
			if(!polizas){
				res.status(404).send({message: "No hay polizas"});
			}else{				
					res.status(200).send({polizas: polizas});
				}	
			}
		
	});
}


function getPoliza(req, res){
	let polizaId = req.params.id;

	Poliza.findById(polizaId)
    .populate('user pago')
    .exec(function (err, poliza) {
		if (err) {
			res.status(500).send({message: "Error en la petición"});
		}else{
			if(!poliza){
				res.status(404).send({message: "No existe el poliza"});
			}else{				
					res.status(200).send({poliza: poliza});
				}	
			}
		
	});
}

function deletePoliza(req, res){
	var polizaId = req.params.id;

	Poliza.findByIdAndRemove(polizaId, (err, polizaRemoved)=>{
		if(err){
			res.status(500).send({message: "Error al borrar el Usuario"}); 
		}else{
			if(!polizaRemoved){
			res.status(404).send({message: "No se ha podido eliminar Usuario"});
			}else{
				res.status(200).send({poliza: polizaRemoved});
			}
		}
	});
}


function updatePoliza(req, res){
	let polizaId = req.params.id;
	let update = req.body;


	Poliza.findByIdAndUpdate(polizaId, update, (err, polizaUpdated)=>{
		if (err) {
			return res.status(500).send({message: 'No de ha podido actualizar la poliza'});
		}else{
			if(!polizaUpdated){
				return res.status(404).send({message: "No se ha actualizado la poliza"});
			}else{
				return res.status(200).send({poliza: polizaUpdated});
			}
		}
	});
}

function getPolizaPlaca(req, res){
	let polizaPlaca = req.params.placa;

	Poliza.findOne({placa: polizaPlaca})
    .populate('user pago')
    .exec(function (err, poliza) {
         if(err) {
			res.status(500).send({message: "Error en la petición"});
		}else{
			if(!poliza){
				res.status(202).send({message: "No existe el placa"});
			}else{
				res.status(200).send({poliza: poliza});
			}

		}
    });
}

module.exports = {
	savePoliza,
	getPolizas,
	getPoliza,
	deletePoliza,
	updatePoliza,
	getPolizaPlaca
}