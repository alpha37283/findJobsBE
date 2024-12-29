const express = require('express');
const routerSeller = express.Router();

const {createSeller, loginSeller, getSeller, updateSeller, deleteSeller} = require('../controller/seller.controller.js');

routerSeller.post('/register', createSeller);
routerSeller.post('/login', loginSeller);
routerSeller.get('/:id', getSeller);
routerSeller.patch('/:id', updateSeller);
routerSeller.delete('/:id', deleteSeller);

module.exports = routerSeller;


