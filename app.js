const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');

const redisConnection = require('./lib/redisConnection');
const convertRoutes = require('./routes/convert');

const app = express();
const redisClient = redisConnection.init();

const PORT = config.port;

//body parser middleware
app.use(bodyParser.json());

//CORS handling middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        res.status(200).json({});
    }

    next();
});

//use a middleware to pass redisClient
app.use((req, res, next) => {
    req.redisClient = redisClient;
    next();
});

//default route - states that the server is up and running
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Server is running!"
    });
});

//add the routes
app.use('/convert', convertRoutes);

//404 handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//Server fault error handler
app.use((error, req, res, next) => {
    console.log('error --> ', error);
    res.status(error.status || 500).json({
        code: error.code || 'ERROR',
        message: error.message || 'Unknown Server Error',
        error
    });
});

app.listen(PORT, () => {
    console.log(`***** Server Listeneing on ${PORT} *****`)
});