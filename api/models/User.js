const db = require('./db_conf');

function getAllteachers(){
    return db.prepare('SELECT * FROM teachers').all();
};

function getAllCoursesForTeacher(idTeacher){
    return db.prepare('SELECT c.name FROM courses c, teachers t, professors_courses pf WHERE c.course_id = pf.course AND t.teacher_id = pf.teacher AND t.teacher_id = ?;').all(idTeacher);
};

function registerTeacherForforCourses(idTeacher,idCourse){
    return db.prepare('INSERT INTO professors_courses(teacher, course) VALUES (?,?)').run(idTeacher,idCourse);
};

function deleteFromProfessorsCourses(idTeacher, idCourse){
    return db.prepare('DELETE FROM professors_courses WHERE teacher = ? AND course = ?;').run(idTeacher, idCourse);
}

module.exports={
    getAllteachers,getAllCoursesForTeacher,registerTeacherForforCourses,deleteFromProfessorsCourses
};