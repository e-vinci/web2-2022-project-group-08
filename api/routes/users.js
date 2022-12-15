/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
const express = require('express');
const { getOneCourses, getAllAnswersOneQuestions,
  getAllQuestionsOneQuizz, getAllQuestions, getAllRegisteredQuestion, getOneQuestion } = require('../models/Question');

// eslint-disable-next-line import/order
const bcrypt = require('bcrypt');

const {
  getAllTeachers,
  getOneTeacher,
  getOneStudent,
  toRegisterAStudent,
  toRegisterATeacher,
  verifyIfStudentExists,
  verifyIfTeacherExists, getStudentId
} = require('../models/register');

const router = express.Router();

const { send } = require('../utils/mail');
const { generate } = require('../utils/passwordGenerator');

const saltRounds = 10;

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
  
  let isUser;

  if (mail.match(/^[äöüéèa-zA-Z0-9]+[-_.]*[äöüéèa-zA-Z0-9]*@student.vinci.be$/)) {

    if (!verifyIfStudentExists(mail))
      return res.status(404).json("Cet utilisateur n'existe pas ou l'email est non valide");
      
    isUser = getOneStudent(mail, password);
    

  } else if (mail.match(/^[äöüéèa-zA-Z0-9]+[-_.]*[äöüéèa-zA-Z0-9]*@vinci.be$/)) {
    /*   ATTENTION CHANGEMENT POUR LES TESTS */
    if (!verifyIfTeacherExists(mail))
      return res.status(404).json("Cet utilisateur n'existe pas ou l'email est non valide");

    isUser = getOneTeacher(mail, password);

  } else {
    return res.status(401).json("Cet email n'appartient pas au domaine vinci");
  }

  const cryptedPassword = isUser.recordUser.user_password;

  if (!bcrypt.compareSync(password, cryptedPassword))
    return res.status(401).json("Le mot de passe n'est pas correct");
  return res.json(isUser);
});

router.post('/register', (req, res) => {
  
  
  const {mail, registerPassword,registerConfPassword } = req.body

  if (registerPassword !== registerConfPassword)
    return res.status(404).json('les mots de passe ne correspondent pas');
  if (!mail.match(/^[äöüéèa-zA-Z0-9]+[-_.]*[äöüéèa-zA-Z0-9]*@student.vinci.be$/))
    return res.status(401).json("Email non valide ou n'appartenant pas à un étudiant vinci");

  if(verifyIfStudentExists(mail)) return res.status(401).json("L'étudiant existe déjà");
  const encryptedPassword = bcrypt.hashSync(registerPassword, saltRounds);
  const potentialUser = toRegisterAStudent(mail, encryptedPassword);
  return res.json(potentialUser);


});

router.post('/registerTeacher', (req, res) => {
  const {mail, teacherUsername} = req.body;
  // RAJOUTER INPUT ENREGISTREMENT TEACHER

  if (!mail.match(/^[äöüéèa-zA-Z0-9]+[-_.]*[äöüéèa-zA-Z0-9]*@student.vinci.be$/))
   return res
      .status(400)
      .json("Email non valide ou n'appartenant pas à un professeur vinci");
  const generatedPassword = generate();
  const encryptedPassword = bcrypt.hashSync(generatedPassword, saltRounds);
  const potentialUser = toRegisterATeacher(mail, encryptedPassword);
  send(mail, generatedPassword);

  return res.json(potentialUser);
});

module.exports = router;
