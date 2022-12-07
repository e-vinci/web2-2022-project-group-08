const jwt = require('jsonwebtoken');


const db = require('./db_conf');

const jwtSecret = 'iplearn!!!';
const lifetimeJwt = 24 * 60 * 60 * 1000;

function getAllTeachers() {
    return db.prepare("SELECT * FROM teachers ").all();    
};

function getOneTeacher(mail,password){
  const teacher = db.prepare('select  *  from teachers where mail = ? ').get(mail);
  if(!teacher) return undefined;
  const token = jwt.sign(
    {mail},
    jwtSecret,
    {expiresIn: lifetimeJwt}
  );
  
  const recordUser = teacher;
  const authenticatedTeacher = { mail, token, recordUser};
  return authenticatedTeacher;
};

function getOneStudent(mail,password){
    const student = db.prepare('select * from students where mail = ?').get(mail);
    if(!student) return undefined;

    
    const token = jwt.sign(
      {mail},
      jwtSecret,
      {expiresIn: lifetimeJwt}
    );
  
    const recordUser = student;
    const authenticatedStudent = { mail, token, recordUser};
    return authenticatedStudent;
  };

  
  function toRegisterAStudent( mail, password){
    const student = db.prepare('INSERT INTO students (mail, user_password) VALUES(?,?) RETURNING student_id').all(mail,password);
    if(student === undefined ) return undefined;

    const token = jwt.sign(
      {mail},
      jwtSecret,
      {expiresIn : lifetimeJwt}
    );
    const  authenticatedStudent = {mail,token, student};
    return authenticatedStudent;
  };

  function toRegisterATeacher(mail, password){
    const teacher = db.prepare('INSERT INTO teachers(mail, user_password) VALUES(?,?) RETURNING teacher_id').get(mail,password);
    if(teacher === undefined ) return undefined;
    const token = jwt.sign(
      {mail},
      jwtSecret,
      {expiresIn : lifetimeJwt}
    );
    const  authenticatedStudent = {mail,token, teacher};
    return authenticatedStudent;
  }

  function verifyIfStudentExists (mail){
    const commande = db.prepare("SELECT * FROM students WHERE mail = ?");
    const info = commande.all( mail )
    if(info.length == 0){
        return false;
    }
    else{
        return true;
    }
  }

  function verifyIfTeacherExists (mail){
    const commande = db.prepare("SELECT * FROM teachers WHERE mail = ?");
    const info = commande.all( mail )
    if(info.length == 0){
        return false;
    }
    else{
        return true;
    }
  }




module.exports={
    getAllTeachers, getOneTeacher, getOneStudent, toRegisterAStudent, toRegisterATeacher, verifyIfStudentExists, verifyIfTeacherExists
};

