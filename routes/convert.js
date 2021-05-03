const express = require('express');

const convertController = require('../controllers/convert')

const router = express.Router();

router.post('/', convertController.convertCurrency);

module.exports = router;