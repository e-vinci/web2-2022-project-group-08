const db = require('./db_conf');




function addQuizzByCourseName(course){
    const courseID = db.prepare('SELECT course_id FROM courses WHERE name=?').get(course).course_id;
    if (verifyIfQuizzExists(courseID)) {
        return;
    }
    const date = new Date().toLocaleDateString();
<<<<<<< HEAD
    return  db.prepare('INSERT INTO quizzes (creation_date, course) VALUES (?,?)').run(date, courseID);
=======
    const add  = db.prepare('INSERT INTO quizzes (creation_date, course) VALUES (?,?)').run(date, courseID);

    return db.prepare(`SELECT * FROM quizzes WHERE quizz_id = ? `).get(add.lastInsertRowid);
>>>>>>> 4cc3e92d65dcfcdbcb72c011179d47f6cb1df0fe
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