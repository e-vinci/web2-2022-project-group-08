const db = require('./db_conf');

// const jwtSecret = 'iplearn!!!';
// const lifetimeJwt = 24 * 60 * 60 * 1000;

function getAllCourses(){
    return db.prepare('SELECT * FROM courses').all();
};

function getACourseById(idCourse){
    const course = db.prepare('select  *  from courses where course_id = ? ').get(idCourse);
    return course;
};


function getACourse(name){
    const course = db.prepare('select  *  from courses where name = ? ').get(name);
    return course;
};

function getACourseImage(name){
    const imageCourse = db.prepare('select picture from courses where name = ?').get(name);
    return imageCourse;
}

module.exports={
 getACourse, getAllCourses, getACourseImage,getACourseById
};