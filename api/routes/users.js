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
  const registeredQuestions = getAllRegisteredQuestion(3);
  const specificQuestion = getOneQuestion(registeredQuestions.question);
  console.log(registeredQuestions)
  console.log('specific question :')
  console.log(specificQuestion)
  res.status(200).json(specificQuestion);
});

// /* GET users listing. */
// router.get('/userAccount', (req, res) => {
//   console.log('Router user account')
//   const registeredQuestions = getAllRegisteredQuestion(3);
//   res.json(registeredQuestions);
// });

router.post('/login', (req, res) => {
  // const mail = req?.body?.loginUsername?.length !== 0 ? req.body.loginUsername : undefined;
  // const password = req?.body?.loginPassword?.length !== 0 ? req.body.loginPassword : undefined;

  const {mail, password } = req.body
  

  let isUser;
  if (!mail || !password) return res.status(400).json('utilisateur inexistant');

  if (mail.match(/^[äöüéèa-zA-Z0-9]+[-_.]*[äöüéèa-zA-Z0-9]*@student.vinci.be$/)) {

    if (!verifyIfStudentExists(mail))
      return res.status(400).json("Cet utilisateur n'existe pas ou l'email est non valide");
      
    isUser = getOneStudent(mail, password);
    

  } else if (mail.match(/^[äöüéèa-zA-Z0-9]+[-_.]*[äöüéèa-zA-Z0-9]*@vinci.be$/)) {
    /*   ATTENTION CHANGEMENT POUR LES TESTS */
    if (!verifyIfTeacherExists(mail))
      return res.status(400).json("Cet utilisateur n'existe pas ou l'email est non valide");

    isUser = getOneTeacher(mail, password);

  } else {
    return res.status(400).json('Pas un mail vinci');
  }

  const cryptedPassword = isUser.recordUser.user_password;

  if (!bcrypt.compareSync(password, cryptedPassword))
    return res.status(400).json("Le mot de passe n'est pas correct");
  const userId = getStudentId(mail);
  return res.json(isUser);
});

router.post('/register', (req, res) => {
  
  
  const {mail, registerPassword,registerConfPassword } = req.body

  console.log('mail : ')
  console.log(req.body.registerUsername)
  console.log('password : ')
  console.log(registerPassword)
  console.log('confirmpassword : ')
  console.log(registerConfPassword)
// const mail = req?.body?.mail?.length !== 0 ? req.body.registerUsername : undefined;
//   const password = req?.body?.registerPassword?.length !== 0 ? req.body.registerPassword : undefined;
//   const passwordConfirm =
//     req?.body?.registerConfPassword?.length !== 0 ? req.body.registerConfPassword : undefined;
  if (!mail || !registerPassword || !registerConfPassword) return res.status(400).json('email ou password null');
  // comment configuer un message d'erreur ?
  if (registerPassword !== registerConfPassword)
    return res.status(400).json('les mots de passe ne correspondent pas');
  if (!mail.match(/^[äöüéèa-zA-Z0-9]+[-_.]*[äöüéèa-zA-Z0-9]*@student.vinci.be$/))
    return res.status(400).json("Email non valide ou n'appartenant pas à un étudiant vinci");
  const encryptedPassword = bcrypt.hashSync(registerPassword, saltRounds);

  const potentialUser = toRegisterAStudent(mail, encryptedPassword);
  if (!potentialUser) return res.status(400).json('enregistrement impossible ');

  return res.json(potentialUser);


});

router.post('/registerTeacher', (req, res) => {
  // const mail = req?.body?.mail?.lenght !== 0 ? req.body.teacherUsername : undefined;
  const {mail, teacherUsername} = req.body;
  // RAJOUTER INPUT ENREGISTREMENT TEACHER
  if (!mail) return res.status(400).json('email ou password null');
  if (!mail.match(/^[äöüéèa-zA-Z0-9]+[-_.]*[äöüéèa-zA-Z0-9]*@student.vinci.be$/))
    /* gérer l'erreur */ return res
      .status(400)
      .json("Email non valide ou n'appartenant pas à un professeur vinci");
  const generatedPassword = generate();
  const encryptedPassword = bcrypt.hashSync(generatedPassword, saltRounds);
  const potentialUser = toRegisterATeacher(mail, encryptedPassword);
  if (!potentialUser) return res.status(400).json('enregistrement impossible ');
  send(mail, generatedPassword);

  return res.json(potentialUser);
});

module.exports = router;
