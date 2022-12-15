const db = require('./db_conf');

function getAllteachers(){
    return db.prepare('SELECT * FROM teachers').all();
};

function getAllCoursesForTeacher(idTeacher){
    return db.prepare('SELECT pf.* FROM courses c, teachers t, professors_courses pf WHERE c.course_id = pf.course AND t.teacher_id = pf.teacher AND t.teacher_id = ?;').get(idTeacher);
};


module.exports={
    getAllteachers,getAllCoursesForTeacher
};