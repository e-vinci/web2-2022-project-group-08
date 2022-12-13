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

// eslint-disable-next-line camelcase
function getOneQuestion(id_question){
    return db.prepare('SELECT * FROM questions WHERE question_id = ?').all(id_question);
}


function addQuestionByQuizId(question, quizID){
    const maxNumber = db.prepare('SELECT max(number) FROM questions').get();
    console.log("max", maxNumber);
    return db.prepare('INSERT INTO questions (quizz, number, content) VALUES (?,?,?)').run(quizID,maxNumber['max(number)'] + 1,question);
}


module.exports={
    getOneCourses, getAllAnswersOneQuestions, getAllcourses,
    getAllQuestionsOneQuizz, getAllQuizzOneCourses, getAllRegisteredQuestion, getAllQuestions, getOneQuestion, addQuestionByQuizId
};


