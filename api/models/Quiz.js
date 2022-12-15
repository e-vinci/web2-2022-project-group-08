const db = require('./db_conf');




function addQuizzByCourseName(course){
    const courseID = db.prepare('SELECT course_id FROM courses WHERE name=?').get(course).course_id;
    
    if (verifyIfQuizzExists(courseID)) {
        return;
    }
    const date = new Date().toLocaleDateString();
    const add  = db.prepare('INSERT INTO quizzes (creation_date, course) VALUES (?,?)').run(date, courseID);
    const res = db.prepare(`SELECT * FROM quizzes WHERE quizz_id = ? `).get(add.lastInsertRowid);

    // eslint-disable-next-line consistent-return
    return   res
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


module.exports={
    addQuizzByCourseName,
    getQuizById,
    getQuizzes
   };