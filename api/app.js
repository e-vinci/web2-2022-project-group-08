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
const answersRouter = require('./routes/answers');
const quizRouter = require('./routes/quiz');
const coursesRouter = require('./routes/courses');



const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', cors(corsOptions), usersRouter);
app.use('/index', cors(corsOptions), indexRouter);
app.use('/questions', cors(corsOptions), questionsRouter);
app.use('/quiz', cors(corsOptions), quizRouter);
app.use('/courses', cors(corsOptions), coursesRouter);
app.use('/answers', cors(corsOptions), answersRouter);

module.exports = app;
