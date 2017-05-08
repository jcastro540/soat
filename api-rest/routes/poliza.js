'use strict'

var express = require('express');
var polizaController = require('../controllers/poliza');
var service = require('../services/service');
var api = express.Router();

api.get('/polizas', service.ensureAuthenticated, polizaController.getPolizas);
api.get('/poliza/:id', service.ensureAuthenticated, polizaController.getPoliza);
api.get('/placa/:placa', service.ensureAuthenticated, polizaController.getPolizaPlaca);

api.post('/create-poliza', service.ensureAuthenticated, polizaController.savePoliza);
api.put('/poliza/:id', service.ensureAuthenticated, polizaController.updatePoliza);
api.delete('/poliza/:id', service.ensureAuthenticated, polizaController.deletePoliza);


module.exports = api;
