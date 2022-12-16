const jwt = require('jsonwebtoken');


const db = require('./db_conf');

const jwtSecret = 'iplearn!!!';
const lifetimeJwt = 24 * 60 * 60 * 1000;

const bcrypt = require('bcrypt');
const saltRounds = 10;
const { generate } = require('../utils/passwordGenerator');
const { send } = require('../utils/mail');

function getAllTeachers() {
    return db.prepare("SELECT * FROM teachers ").all();    
};

function loginTeacher(mail, password){
  const teacher = db.prepare('select  *  from teachers where mail = ? ').get(mail);
  if(!teacher) return undefined;

  if (!bcrypt.compareSync(password, teacher.user_password))
    return "IncorrectPWD";

  const token = jwt.sign(
    {mail},
    jwtSecret,
    {expiresIn: lifetimeJwt}
  );
  

  const authenticatedTeacher = { mail, token};
  console.log("ici", authenticatedTeacher);
  return authenticatedTeacher;
};


function loginStudent(mail, password){
    const student = db.prepare('select * from students where mail = ?').get(mail);
    if(!student) return undefined;
    
    if (!bcrypt.compareSync(password, student.user_password))
    return "IncorrectPWD";

    const token = jwt.sign(
      {mail},
      jwtSecret,
      {expiresIn: lifetimeJwt}
    );
  
    
    const authenticatedStudent = { mail, token};
    return authenticatedStudent;
  };

  
  function toRegisterAStudent( mail, password){
    const encryptedPassword = bcrypt.hashSync(password, saltRounds);
    const student = db.prepare('INSERT INTO students (mail, user_password) VALUES(?,?) RETURNING student_id').run(mail,encryptedPassword);
    if(student === undefined ) return undefined;

    const token = jwt.sign(
      {mail},
      jwtSecret,
      {expiresIn : lifetimeJwt}
    );
    const  authenticatedStudent = {mail,token};
    return authenticatedStudent;
  };

  function toRegisterATeacher(mail){
    const generatedPassword = generate();
    const encryptedPassword = bcrypt.hashSync(generatedPassword, saltRounds);

    const idTeacher = db.prepare('INSERT INTO teachers(mail, user_password) VALUES(?,?) RETURNING teacher_id').run(mail,encryptedPassword);
    if(idTeacher === undefined ) return undefined;


    const token = jwt.sign(
      {mail},
      jwtSecret,
      {expiresIn : lifetimeJwt}
    );

    send(mail, generatedPassword);
    const  authenticatedStudent = {mail,token};
    return authenticatedStudent;
  };

  function verifyIfStudentExists (mail){
    const commande = db.prepare("SELECT * FROM students WHERE mail = ?");
    const info = commande.all( mail )
    if(info.length === 0){
        return false;
    }
        return true;
  };

  function verifyIfTeacherExists (mail){
    const commande = db.prepare("SELECT * FROM teachers WHERE mail = ?");
    const info = commande.all( mail )
    if(info.length === 0){
        return false;
    }
        return true;
  };
 

  // GET STUDENT ID 
  function getStudentId(mail) {
    return db.prepare("SELECT student_id FROM students WHERE mail = ? ").get(mail);    
};


module.exports={
    getAllTeachers, 
     toRegisterAStudent,
     toRegisterATeacher, verifyIfStudentExists, 
     verifyIfTeacherExists, getStudentId, loginTeacher, loginStudent
};

