const db = require('./db_conf');

// const jwtSecret = 'iplearn!!!';
// const lifetimeJwt = 24 * 60 * 60 * 1000;

function getAllcourses(){
    return db.prepare('SELECT * FROM courses').all();
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
 getACourse, getAllcourses, getACourseImage
};