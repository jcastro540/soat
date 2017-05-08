'use strict'

const Email = require('../models/email');
const service = require('../services/service');

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'josecastro540@gmail.com',
        pass: '110-16542750-j'
    }
});

// send mail with defined transport object
function sendmail(req, err, next){
		let params = req.body;
		let email = new Email();
		let mailOptions = {
		    from: `${params.user[0].name} <${params.user[0].email}>`, // sender address
		    to: 'josecastro540@gmail.com', // list of receivers
		    subject: 'Resumen de Compra ✔', // Subject line
		    // text: 'Hello world ?', // plain text body
		    html: `
				<table style="border: 1px solid #95a5a6;">
				    <thead>
				    	<tr style="background-color: #34495e; color: white;">
				            <th width="14.28%" style="border: 1px solid #95a5a6 ;">
				                Fecha Inicio
				            </th>
				            <th width="14.28%" style="border: 1px solid #95a5a6 ;">
				                Fecha vencimiento
				            </th>
				            <th width="14.28%" style="border: 1px solid #95a5a6 ;">
				                Tasa comercial
				            </th>
				            <th width="14.28%" style="border: 1px solid #95a5a6 ;">
				                50% Fosyga
				            </th>
				            <th width="14.28%" style="border: 1px solid #95a5a6 ;">
				                Subtotal
				            </th>
				            <th width="14.28%" style="border: 1px solid #95a5a6 ;">
				               	RUNT
				            </th>
				            <th width="14.28%" style="border: 1px solid #95a5a6 ;">
				                TOTAL
				            </th>
				        </tr>
				    </thead>
				    <tr style="border: 1px solid #95a5a6;">
				        <td style="border: 1px solid #95a5a6;">
				           ${params.fechaInicio}
				        </td>
				        <td style="border: 1px solid #95a5a6;">
				           ${params.fechaVen}
				        </td>
				        <td style="border: 1px solid #95a5a6;">
				            ${params.tasa}
				        </td>
				        <td style="border: 1px solid #95a5a6;">
				            ${params.fosyga}
				        </td>
				        <td style="border: 1px solid #95a5a6;">
				            ${params.subtotal}
				        </td>
				        <td style="border: 1px solid #95a5a6;">
				            1.610,00 COP
				        </td>
				        <td style="border: 1px solid #95a5a6;">
				            ${params.total}
				        </td>
				    </tr>
				</table>

				<h3 style="color: #34495e">Vehiculo</h3>

				<table style="border: 1px solid #95a5a6;">
				  <thead>
				    <tr style="background-color: #34495e; color: white;">
				      <th width="25%" style="border: 1px solid #95a5a6 ;">Placa</th>
				      <th width="25%" style="border: 1px solid #95a5a6 ;">Clase</th>
				      <th width="25%" style="border: 1px solid #95a5a6 ;">Subtipo</th>
				      <th width="25%" style="border: 1px solid #95a5a6 ;">Edad</th>
				    </tr>
				  </thead>
				  <tbody>
				    <tr>
				      <td width="25%" style="border: 1px solid #95a5a6 ;">${params.placa}</td>
				      <td width="25%" style="border: 1px solid #95a5a6 ;">${params.clase}</td>
				      <td width="25%" style="border: 1px solid #95a5a6 ;">${params.subtipo}</td>
				      <td width="25%" style="border: 1px solid #95a5a6 ;">${params.edad}</td>
				    </tr>
				   </tbody>
				</table>

				<h3 style="color: #34495e">Cobertura</h3>

				<table style="border: 1px solid #95a5a6;">
				  <thead>
				    <tr style="background-color: #34495e; color: white;">
				      <th width="20%" style="border: 1px solid #95a5a6 ;">Muerte y gastos funerarios</th>
				      <th width="20%" style="border: 1px solid #95a5a6 ;">Gastos médicos</th>
				      <th width="20%" style="border: 1px solid #95a5a6 ;">Incapacidad permanente</th>
				      <th width="20%" style="border: 1px solid #95a5a6 ;">Gastos de transporte</th>
				      <th width="20%" style="border: 1px solid #95a5a6 ;">Inicio de vigencia del seguro</th>
				    </tr>
				  </thead>
				  <tbody>
					<td width="20%" style="border: 1px solid #95a5a6 ;">750 SMLDV</td>
					<td width="20%" style="border: 1px solid #95a5a6 ;">800 SMLDV</td>
					<td width="20%" style="border: 1px solid #95a5a6 ;">180 SMLDV</td>
					<td width="20%" style="border: 1px solid #95a5a6 ;">10 SMLDV</td>
					<td width="20%" style="border: 1px solid #95a5a6 ;">7 may. 2017 21:46:03</td>
				  </tbody>
				</table>
		    ` // html body
		};

		transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }else{
	        console.log('Message %s sent: %s', info.messageId, info.response);
	    }
	});
	
	next();
}


function getEmails(req, res){

	Email.find({},(err, emails)=>{
		if (err) {
			res.status(500).send({message: "Error en la petición"});
		}else{
			if(!emails){
				res.status(404).send({message: "No hay email"});
			}else{				
					res.status(200).send({emails: emails});
				}	
			}
		
	});
}



function saveEmail(req, res){
	let email = new Email();
	let params = req.body;

	email.name = params.name;
	email.email = params.email;
	email.message = params.message;

	email.save((err, emailStored)=>{
		if (err) {
			return res.status(500).send({message: 'Error al crear el email'});
		}
		if (!emailStored) {
			return res.status(404).send({message: "No se ha guardado el email"});
		}else{
			res.status(200).send({email: emailStored});
		}
	});
}


function deleteEmail(req,res){
	let emailId = req.params.id;

	Email.findByIdAndRemove(emailId, (err, emailDeleted)=>{
		if (err) {
			return res.status(500).send({message: 'No de ha podido eliminar el email'});
		}else{
			if(!emailDeleted){
				return res.status(404).send({message: "No se ha eliminado el email"});
			}else{
				return res.status(200).send({email: emailDeleted});
			}
		}
	})
}



module.exports = {
	getEmails,	
	saveEmail,
	sendmail,
	deleteEmail
}
