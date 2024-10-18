const express = require('express');
const routerServices = express.Router();

const {createService, getService, updateService, deleteService} = require('../controller/services.controller.js')

routerServices.post('/create', createService);
routerServices.get('/:id', getService);
routerServices.patch('/:id', updateService);
routerServices.delete('/:id', deleteService);

module.exports = routerServices;