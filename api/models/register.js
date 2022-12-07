const jwt = require('jsonwebtoken');

const db = require('./db_conf');

const jwtSecret = 'iplearn!!!';
const lifetimeJwt = 24 * 60 * 60 * 1000;

function getAllTeachers() {
    return db.prepare("SELECT * FROM teachers ").all();    
};

function getOneTeacher(mail,password){
  const teacher = db.prepare('select  *  from teachers where mail = ? and user_password = ?').get(mail,password);
  if(!teacher) return undefined;
  if(teacher.user_password !== password ) return undefined ; 
  
  const token = jwt.sign(
    {mail},
    jwtSecret,
    {expiresIn: lifetimeJwt}
  );
  
  const authenticatedTeacher = { mail, token};

  return authenticatedTeacher;
};

function getOneStudent(mail,password){
    const student = db.prepare('select * from students where mail = ?').all(mail,password);
    if(!student) return undefined;
    if(student.user_password !== password ) return undefined ;
    
    const token = jwt.sign(
      {mail},
      jwtSecret,
      {expiresIn: lifetimeJwt}
    );
  
    const authenticatedStudent = { mail, token};
  
    return authenticatedStudent;
  };






module.exports={
    getAllTeachers, getOneTeacher, getOneStudent
};

