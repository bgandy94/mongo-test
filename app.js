const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./server/routes');

const errorHandler = require('./server/middleware/errorHandler');
const authService = require('./server/services/auth.service');

const app = express();


app.all('*', authService.validateToken);
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

routes(app);
app.use(errorHandler);


module.exports = app;
