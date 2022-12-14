const db = require('./db_conf');

const {deleteQuestionsByQuizId} = require('../models/Question')




function addQuizzByCourseName(course){
    const courseID = db.prepare('SELECT course_id FROM courses WHERE name=?').get(course).course_id;
    if (verifyIfQuizzExists(courseID)) {
        return;
    }
    const date = new Date().toLocaleDateString();
    const add  = db.prepare('INSERT INTO quizzes (creation_date, course) VALUES (?,?)').run(date, courseID);
    return db.prepare(`SELECT * FROM quizzes WHERE quizz_id = ? `).get(add.lastInsertRowid);
}

function verifyIfQuizzExists(courseID){
    const quiz = db.prepare('SELECT * FROM quizzes WHERE course = ?').get(courseID);
    if (!quiz) return false;
    return true; 
}


function getQuizById(quizz){
    return db.prepare('SELECT * FROM quizzes WHERE quizz_id = ?').get(quizz);
    
}


function getQuizzes(){
    return db.prepare('SELECT * FROM quizzes').all();
    
}

function deleteQuizById(quizID){
    deleteQuestionsByQuizId(quizID);
    return db.prepare('DELETE FROM quizzes WHERE quizz_id = ? ').run(quizID);
}


module.exports={
    addQuizzByCourseName,
    getQuizById,
    getQuizzes,
    deleteQuizById
   };