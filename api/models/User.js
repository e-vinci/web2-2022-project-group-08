const db = require('./db_conf');

function getAllteachers(){
    return db.prepare('SELECT * FROM teachers').all();
};

function getAllCoursesForTeacher(idTeacher){
    return db.prepare('SELECT c.name FROM courses c, teachers t, professors_courses pf WHERE c.course_id = pf.course AND t.teacher_id = pf.teacher AND t.teacher_id = ?;').all(idTeacher);
};

function getAllCoursesTeacherdDontHave(idTeacher){
    return db.prepare('SELECT c.name FROM courses c, teachers t WHERE t.teacher_id = 1 AND t.teacher_id NOT IN(SELECT pc.teacher FROM professors_courses pc WHERE pc.teacher = t.teacher_id AND c.course_id = pc.course);').all(idTeacher);
};

function registerTeacherForCourses(idTeacher,idCourse){
    return db.prepare('INSERT INTO professors_courses(teacher, course) VALUES (?,?)').run(idTeacher,idCourse);
};

function deleteFromProfessorsCourses(idTeacher, idCourse){
    return db.prepare('DELETE FROM professors_courses WHERE teacher = ? AND course = ?;').run(idTeacher, idCourse);
}

function deleteFromProfesseurCourses(idTeacher){
    return db.prepare('DELETE FROM professors_courses WHERE teacher = ?').run(idTeacher);
}




module.exports={
    getAllteachers,
    getAllCoursesForTeacher,
    registerTeacherForCourses,
    deleteFromProfessorsCourses,
    getAllCoursesTeacherdDontHave,
    deleteFromProfesseurCourses
};