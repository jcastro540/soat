'use strict'

const User = require('../models/user');
const service = require('../services/service');

let bcrypt = require('bcrypt');
let salt = bcrypt.genSaltSync(10);

function getUsers(req, res){

	
	User.find({},(err, users)=>{
		if (err) {
			res.status(500).send({message: "Error en la petición"});
		}else{
			if(!users){
				res.status(404).send({message: "No hay usuarios"});
			}else{
				res.status(200).send({users: users});
			}
		}
	});
}


function getUser(req, res){
	let userId = req.params.id;
	User.findById(userId,( err ,user)=>{
		if(err){
			return res.status(500).send({message: "Error en la petición"});
		}else{
			if(!user){
				return res.status(404).send({message: "El usuario no existe"});
			}else{
				return res.status(200).send({user});
			}
		}
	});

}


function saveUser(req, res){
	var user = new User();
	var params = req.body;
	user.tipoDoc= params.tipoDoc;
	user.numDoc = params.numDoc;
	user.nombre = params.nombre;
	user.apellido = params.apellido;
	user.nick = params.nick;
	user.email = params.email;
	user.role = params.role;
	user.telefono = params.telefono;
	//encryptar pass
	var hash = bcrypt.hashSync(params.password, salt);
	user.password = hash;

	User.findOne({email: user.email.toLowerCase()}, (err, email)=>{
		if(err){
			return res.status(500).send({message: 'Error al consultar el usuario'});
		}if(email){
			return res.status(200).send({message: 'El email ya existe'}); 
		}else{
			user.save((err, userStored)=>{
				if(err){
					var error = String(err)
					return res.status(500).send({message: error});
				}
				if(!userStored){
					return res.status(404).send({message: 'No se ha guardado el usuario'});
				}else{
					return res.status(200).send({token: service.createToken(user), identity:user});
				}
			});
		}
	}); 
}

function updateUser(req, res){
	var userId = req.params.id;
	var update = req.body;

	//encryptar pass
	// var hash = bcrypt.hashSync(update.password, salt);
	// update.password = hash;

	User.findByIdAndUpdate(userId, update, (err, userUpdated)=>{
		if(err){
			res.status(500).send({message: "Error al actualizar el usuario"}); 
		}else{

		}if(!userUpdated){
			res.status(404).send({message: "No se ha podido actualizar usuario"});
		}else{
			res.status(200).send({user: userUpdated});
			}
	});
}

function deleteUser(req, res){
	var userId = req.params.id;

	User.findByIdAndRemove(userId, (err, userRemoved)=>{
		if(err){
			res.status(500).send({message: "Error al borrar el Usuario"}); 
		}else{
			if(!userRemoved){
			res.status(404).send({message: "No se ha podido eliminar Usuario"});
			}else{
				res.status(200).send({user: userRemoved});
			}
		}
	});
}




function userLogin(req, res) {  
	var params = req.body;
		User.findOne({email: req.body.email}, function(err, user) {
       	 // Comprobar si hay errores
	        if(err){
				res.status(500).send({message: 'Error al consultar el usuario'});
			}
			 // Si el usuario no existe
			if(!user){
				res.status(200).send({message: 'El email no existe'});
			}
			//si existe el usuario
			if(user){
				//Comprobar si el pass pasado por paramentro es igual al de la base datos
				var hash = bcrypt.compareSync(params.password, user.password );
				// Y si la contraseña es incorrecta
		     	 if(hash == false || params.password == null){
					res.status(200).send({message: 'El password es incorrecto'});
					//console.log(hash);
					// console.log(params.password);
				}else{
					res.status(200).send({token: service.createToken(user), identity: user});		 
					//console.log(hash); 	  
				}
			}
	            
	    });
    
}



module.exports = {
	saveUser,
	getUsers,
	getUser, 
	updateUser,
	deleteUser,
	userLogin
}