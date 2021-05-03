const express = require('express');
const config = require('config');

const redisConnection = require('./lib/redisConnection');

const app = express();
const redisClient = redisConnection.init();

const PORT = config.port;

//CORS handling
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        res.status(200).json({});
    }

    next();
});

//default route - states that the server is up and running
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Server is running!"
    });
});

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