'use strict'

var express = require('express');
var emailController = require('../controllers/email');
var service = require('../services/service');
var api = express.Router();

api.get('/emails', service.ensureAuthenticated, emailController.getEmails);
// api.get('/email/:id', emailController.getEmail);
api.post('/sendmail', emailController.sendmail, emailController.saveEmail);
// api.put('/email/:id', service.ensureAuthenticated, emailController.updateEmail);
api.delete('/email/:id', service.ensureAuthenticated, emailController.deleteEmail);

module.exports = api; 