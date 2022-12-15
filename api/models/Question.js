// const jwt = require('jsonwebtoken');

const db = require('./db_conf');
const {deleteAnswersByQuizId, deleteAnswersByQuestionId} = require('../models/Answer')

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
    return db.prepare('INSERT INTO questions (quizz, content) VALUES (?,?)').run(quizID,question);
}


function deleteQuestionsByQuizId(quizID){
    deleteAnswersByQuizId(quizID);
    return db.prepare('DELETE FROM questions WHERE quizz = ?').run(quizID);
    
}

function deleteQuestionById(questionID){
    deleteAnswersByQuestionId(questionID);
    return db.prepare('DELETE FROM questions WHERE question_id = ?').run(questionID);
     
}

function modifyQuestionByID(questionID, content){
    return db.prepare('UPDATE questions SET content = ? WHERE question_id = ?').run(content,questionID);

}
module.exports={ getOneCourses, getAllAnswersOneQuestions, getAllcourses, 
    getAllQuestionsOneQuizz, getAllQuizzOneCourses, getAllRegisteredQuestion, 
    getAllQuestions, getOneQuestion, addQuestionByQuizId,deleteQuestionsByQuizId, modifyQuestionByID,
    deleteQuestionById
};


