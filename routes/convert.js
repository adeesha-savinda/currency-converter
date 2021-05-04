const express = require('express');

const convertController = require('../controllers/convert');
const cacheMiddleware = require('../middlewares/cacheMiddleware');

const router = express.Router();

router.post('/', cacheMiddleware, convertController.convertCurrency);

module.exports = router;