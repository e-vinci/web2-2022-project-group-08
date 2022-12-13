// const jwt = require('jsonwebtoken');

const db = require('./db_conf');

// const jwtSecret = 'iplearn!!!';
// const lifetimeJwt = 24 * 60 * 60 * 1000;


function getOneCourses(coursId){
    return db.prepare('select * from courses where courses_id =?').get(coursId);
};

function getAllQuizzOneCourses(coursId){
    return db.prepare('select * from quizzes where course=?').get(coursId);
};

function getAllQuestionsOneQuizz(quizzId){
    return db.prepare('select *  from questions where quizz=?').all(quizzId);
};

function getAllAnswersOneQuestions(question){
    return db.prepare('select * from answers where question = ?').all(question);
};

// eslint-disable-next-line camelcase
function getAllRegisteredQuestion(student_id){
    return db.prepare('select * from registered_questions where student = ?').all(student_id);
}

function getAllQuestions(){
    return db.prepare('select * from questions').all();
}


module.exports={
    getOneCourses, getAllAnswersOneQuestions,
    getAllQuestionsOneQuizz, getAllQuizzOneCourses, getAllRegisteredQuestion, getAllQuestions
};


