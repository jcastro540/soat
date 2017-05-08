'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var min = [5, 'El valor de `{PATH}` (`{VALUE}`) es mas corto de lo permitido ({MINLENGTH}).'];
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


let UserSchema = new Schema({
  tipoDoc:{
    type: String     
  },
  numDoc:{
    type: String
  },
	nombre: {
        type: String
      },
	apellido: {
        type: String
      },
  password: {
        type: String,
        required: 'El password es requerido',
        minlength: min
      },
	email: {
        type: String,
        required: 'El email es requerido',
        unique: true,
        validate: [validateEmail, 'Por favor escriba una dirección de correo valida'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor escriba una dirección de correo valida']
      },
  telefono: {
    type: String
  },
	role: {
    type: String,
    default: "guess"
  }
	
});


module.exports = mongoose.model('User', UserSchema);