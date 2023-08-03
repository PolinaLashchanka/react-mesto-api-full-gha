// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const router = require('./routes');
const { errorHandler, DataNotFound } = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = ['http://miasto-pl.students.nomoreparties.co'];

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use((req, res, next) => {
  next(new DataNotFound());
});
app.use(errorHandler);

app.listen(3000);
