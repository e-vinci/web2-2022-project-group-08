// const jwt = require('jsonwebtoken');

const db = require('./db_conf');
const {deleteAnswersByQuizId} = require('../models/Answer')

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

function getAllQuestionsOneQuizz(quizzId){
    return db.prepare('select *  from questions where quizz=?').all(quizzId);
};

function getAllAnswersOneQuestions(question){
    return db.prepare('select * from answers where question = ?').all(question);
};

// eslint-disable-next-line camelcase
function getAllRegisteredQuestion(studentId){
    return db.prepare('select * from registered_questions where student = ?').get(studentId);
    // console.log('question')
    // console.log(question)
    // return question.student;
}

function getAllQuestions(){
    return db.prepare('select * from questions').all();
}

// eslint-disable-next-line camelcase
function getOneQuestion(data){
    return db.prepare('SELECT * FROM questions WHERE question_id = ?').all(data);
}


function addQuestionByQuizId(question, quizID){
    const maxNumber = db.prepare('SELECT max(number) FROM questions').get();
    console.log("max", maxNumber);
    return db.prepare('INSERT INTO questions (quizz, number, content) VALUES (?,?,?)').run(quizID,maxNumber['max(number)'] + 1,question);
}


function deleteQuestionsByQuizId(quizID){
    deleteAnswersByQuizId(quizID);
    return db.prepare('DELETE FROM questions WHERE quizz = ?').run(quizID);
    
    
}


module.exports={
    getOneCourses, getAllAnswersOneQuestions, getAllcourses,
    getAllQuestionsOneQuizz, getAllQuizzOneCourses, getAllRegisteredQuestion, getAllQuestions, getOneQuestion, addQuestionByQuizId,deleteQuestionsByQuizId
};


