let jwt = require('jwt-simple');  
let moment = require('moment');  
let config = require('../config');


//Crear el Token
function createToken(user){
	let payload= {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14,"days").unix()
	}
	return jwt.encode(payload, config.TOKEN_SECRET);
};

//Asegurar las rutas con este middleware

function ensureAuthenticated(req, res, next){
	if (!req.headers.authorization) {
		return res.status(403).send({message: "Tu petición no tiene cabecera de autorización"});
	}

	let token = req.headers.authorization.split(" ")[0];
  	let payload = jwt.decode(token, config.TOKEN_SECRET);

	//verifico que el token no haya expirado
	if (payload.exp <= moment().unix()) {
		return res.status(401).send({message: "El token ha expirado"});
	}

	req.user = payload.sub;

	next();

}


module.exports = {
	createToken,
	ensureAuthenticated
}