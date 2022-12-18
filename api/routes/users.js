/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
const express = require('express');
const { getAllRegisteredQuestion, getOneQuestion } = require('../models/Question');

const {loginTeacher, loginStudent,toRegisterAStudent,toRegisterATeacher,verifyIfStudentExists,verifyIfTeacherExists} = require('../models/register');
const {getAllCoursesForTeacher, registerTeacherForCourses,deleteFromProfesseurCourses} = require('../models/User');
const router = express.Router();

teacherMailRegex = new RegExp(/^[äöüéèa-zA-Z0-9]+[-_.]*[äöüéèa-zA-Z0-9]*@vinci.be$/);
studentMailRegex = new RegExp(/^[äöüéèa-zA-Z0-9]+[-_.]*[äöüéèa-zA-Z0-9]*@student.vinci.be$/)


/* GET USER PAGE */
router.get('/:id', (req, res) => {
  const tabOfKeyQuestions = [];
  const tabContentQuestions = [];
  const registeredQuestions = getAllRegisteredQuestion(req.params.id);
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

    /* En temps normal, on devrait juste vérifier que l'adresse mail corresponde à celle d'un étudiant, ici nous avons laissé les professeurs se connecter en tant qu'étudiant pour les tests
    étant donné que la DB nous avons séparés les professeurs des étudiants */
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

  
  if (registerPassword !== registerConfPassword) return res.status(409).json('Les mots de passe ne correspondent pas');

  /* En temps normal, on devrait juste vérifier que l'adresse mail corresponde à celle d'un étudiant, ici nous avons laissé les professeurs se connecter en tant qu'étudiant pour les tests
  étant donné que la DB nous avons séparés les professeurs des étudiants */
  if (!studentMailRegex.test(mail) && !teacherMailRegex.test(mail)) return res.status(401).json("Email non valide ou n'appartenant pas à un étudiant vinci");

  if(verifyIfStudentExists(mail)) return res.status(401).json("L'étudiant existe déjà");

 
  const authentificateStudent = toRegisterAStudent(mail, registerPassword);
  return res.json(authentificateStudent);


});

router.post('/registerTeacher', (req, res) => {
    const mail = req.body.mail;

    const {email, courses} = req.body;

  
  if (!teacherMailRegex.test(email))
   return res
      .status(400)
      .json("Email non valide ou n'appartenant pas à un professeur vinci");
  if(verifyIfTeacherExists(mail)) return res.status(401).json("Le professeur existe déjà");
  
  const authentificateTeacher = toRegisterATeacher(mail);

  for (let i = 0; i < courses.length; i+=1) {
    let addCourse = registerTeacherForforCourses(email, courses.item(i).value);
}

  return res.json(authentificateTeacher);
});


router.get('/:id', (req, res) => {
  const idteacher = req.params.id;
  const tabCourseTeacher = getAllCoursesForTeacher(idteacher); 
  return res.json(tabCourseTeacher);
});


router.put('/:id', (req, res) => {
  const idteacher = req.params.id;
  const {courses} = req.body;
  
  const deleteAllCourses = deleteFromProfesseurCourses(idteacher);
  
  

  const reponse = registerTeacherForCourses(idteacher, courses);
  /* let reponse;
  for (let i = 0; i < courses.length; i+=1) {
    reponse = registerTeacherForCourses(idteacher, courses[i]);
} */

  return res.json(reponse);
});


router.post('/registerTeacher', (req, res) => {
  const mail = req.body.mail;

  const {email, courses} = req.body;


if (!teacherMailRegex.test(email))
 return res
    .status(400)
    .json("Email non valide ou n'appartenant pas à un professeur vinci");
if(verifyIfTeacherExists(mail)) return res.status(401).json("Le professeur existe déjà");

const authentificateTeacher = toRegisterATeacher(mail);

for (let i = 0; i < courses.length; i+=1) {
  let addCourse = registerTeacherForforCourses(email, courses.item(i).value);
}

return res.json(authentificateTeacher);
});

module.exports = router;
