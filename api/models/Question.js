// const jwt = require('jsonwebtoken');

const db = require('./db_conf');

// const jwtSecret = 'iplearn!!!';
// const lifetimeJwt = 24 * 60 * 60 * 1000;

function getAllcourses(){
    const cours = db.prepare('select * from courses').all();
    return  cours;
};

function getOneCourses(coursId){
    return db.prepare('select * from courses where course_id =?').get(coursId);
};

function getAllQuizzOneCourses(coursId){
    return db.prepare('select * from quizzes where course = ?').all(coursId);
};

function getAllQuestionsOneQuizz(quizzeId){
    const questions =  db.prepare('select *  from questions where quizz = ?').all(quizzeId);
    return questions;
};

function getAllAnswersOneQuestions(question){
    return db.prepare('select * from answers where question = ?').all(question);
};

module.exports={
    getOneCourses, getAllcourses, getAllAnswersOneQuestions,
     getAllQuestionsOneQuizz, getAllQuizzOneCourses
};


