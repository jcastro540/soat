'use strict'

var express = require('express');
var pagoController = require('../controllers/pago');
var service = require('../services/service');
var api = express.Router();

api.get('/pagos', service.ensureAuthenticated, pagoController.getPagos);
api.get('/pago/:id', service.ensureAuthenticated, pagoController.getPago);

api.post('/create-pago', service.ensureAuthenticated, pagoController.savePago);

api.delete('/pago/:id', service.ensureAuthenticated, pagoController.deletePago);


module.exports = api;
