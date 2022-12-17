/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
const express = require('express');
const { getAllRegisteredQuestion, getOneQuestion } = require('../models/Question');

const {loginTeacher, loginStudent,toRegisterAStudent,toRegisterATeacher,verifyIfStudentExists,verifyIfTeacherExists} = require('../models/register');
const {getAllCoursesForTeacher} = require('../models/User');
const router = express.Router();

teacherMailRegex = new RegExp(/^[äöüéèa-zA-Z0-9]+[-_.]*[äöüéèa-zA-Z0-9]*@vinci.be$/);
studentMailRegex = new RegExp(/^[äöüéèa-zA-Z0-9]+[-_.]*[äöüéèa-zA-Z0-9]*@student.vinci.be$/)


/* GET USER PAGE */
router.get('/', (req, res) => {
  const tabOfKeyQuestions = [];
  const tabContentQuestions = [];
  const registeredQuestions = getAllRegisteredQuestion(3);
  console.log('Question enregistres : ')
  console.log(registeredQuestions)
  // PARCOURS la table contenant la question_id de l'etudiant puis on la push dans le tableau
  for (const key in registeredQuestions) {
      tabOfKeyQuestions.push(registeredQuestions[key].question);
  }

  // PARCOURS la table qu'on vient de creer contenant les questions_id et on la push dans un tab
  for (const index of tabOfKeyQuestions) {
    const question = getOneQuestion(index);
    tabContentQuestions.push(question)
  }

console.log('tab questions key')
console.log(tabOfKeyQuestions)
console.log('tab contenu des questions')
console.log(tabContentQuestions)

  res.status(200).json(tabContentQuestions);
});


router.post('/login', (req, res) => {

  const {mail, password } = req.body
  
  let authentificateUser;


  if (studentMailRegex.test(mail)) {

    if (!verifyIfStudentExists(mail)) return res.status(404).json("Cet utilisateur n'existe pas ou l'email est non valide");
      
    authentificateUser = loginStudent(mail, password);
    
  } else if (teacherMailRegex.test(mail)) {
    /*   ATTENTION CHANGEMENT POUR LES TESTS */
    if (!verifyIfTeacherExists(mail)) return res.status(404).json("Cet utilisateur n'existe pas ou l'email est non valide");
      authentificateUser = loginTeacher(mail, password);
  }else{
    return res.status(401).json("Cet utilisateur n'appartient pas au domaine Vinci")
  }

  if (authentificateUser === "IncorrectPWD") res.status(401).json("Le mot de passe n'est pas correct");

  console.log(authentificateUser);
  return res.json(authentificateUser);
});

router.post('/register', (req, res) => {
  
  
  const {mail, registerPassword,registerConfPassword } = req.body

  if (registerPassword !== registerConfPassword) return res.status(404).json('Les mots de passe ne correspondent pas');

  if (!studentMailRegex.test(mail)) return res.status(401).json("Email non valide ou n'appartenant pas à un étudiant vinci");

  if(verifyIfStudentExists(mail)) return res.status(401).json("L'étudiant existe déjà");

 
  const authentificateStudent = toRegisterAStudent(mail, registerPassword);
  return res.json(authentificateStudent);


});

router.post('/registerTeacher', (req, res) => {
    const mail = req.body.mail;

  if (!teacherMailRegex.test(mail))
   return res
      .status(400)
      .json("Email non valide ou n'appartenant pas à un professeur vinci");
  if(verifyIfTeacherExists(mail)) return res.status(401).json("Le professeur existe déjà");
  
  const authentificateTeacher = toRegisterATeacher(mail);

  

  return res.json(authentificateTeacher);
});


router.get('/:id', (req, res) => {
  const idteacher = req.params.id;
  const tabCourseTeacher = getAllCoursesForTeacher(idteacher); 
  return res.json(tabCourseTeacher);
});


module.exports = router;
