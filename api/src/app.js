const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const errorHandler = require("./utils//middlewares/errorHandler");
const setHeaders = require("./utils/middlewares/setHeaders");
const axios = require('axios');

require('./db.js');

const server = express();

server.name = 'API';


server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(setHeaders);

server.use('/', routes);

server.get('/', (req,res,next)=>{
  res.send("pagina de inicio")
  next();
})

/* server.get('/', async(req,res)=>{
 
  .then(function (response) {
    // handle success
    res.send.json(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
    
  });
}) */
// Error catching endware.

server.use(errorHandler);

module.exports = server;
