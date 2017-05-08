'use strict'

var express = require('express');
var userController = require('../controllers/user');
var service = require('../services/service');
var api = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads/users' });

api.get('/users', service.ensureAuthenticated, userController.getUsers);
api.get('/user/:id', service.ensureAuthenticated,userController.getUser);
api.post('/create-user', userController.saveUser);
api.put('/user/:id', service.ensureAuthenticated, userController.updateUser);
api.delete('/user/:id', service.ensureAuthenticated, userController.deleteUser);

api.post('/login', userController.userLogin);

module.exports = api;
