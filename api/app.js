const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {

  origin: 'http://localhost:8080',

};

const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const questionsRouter = require('./routes/questions');



const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users',  usersRouter);
app.use('/index', cors(corsOptions), indexRouter);
app.use('/questions', cors(corsOptions), questionsRouter);

module.exports = app;
