const db = require('./db_conf');

// const jwtSecret = 'iplearn!!!';
// const lifetimeJwt = 24 * 60 * 60 * 1000;



function addQuizz(course){
    const courseID = db.prepare('SELECT course_id FROM courses WHERE name  = ?').get(course);
    return db.prepare('INSERT INTO quizz (creation_date, course) VALUES (?,?').run(Date.now(), courseID);
}


module.exports={
    
};