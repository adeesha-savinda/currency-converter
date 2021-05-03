const express = require('express');
const config = require('config');

const redisConnection = require('./lib/redisConnection');

const app = express();
const redisClient = redisConnection.init();

const PORT = config.port;

//default route - states that the server is up and running
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Server is running!"
    });
});

//404 handler


//error handler

app.listen(PORT, () => {
    console.log(`***** Server Listeneing on ${PORT} *****`)
});