const express = require('express');
const bcrypt = require('bcrypt');

const {
  getAllTeachers,
  getOneTeacher,
  getOneStudent,
  toRegisterAStudent,
  toRegisterATeacher,
  verifyIfStudentExists,
  verifyIfTeacherExists,
} = require('../models/register');

const router = express.Router();

const { send } = require('../utils/mail');
const { generate } = require('../utils/passwordGenerator');

const saltRounds = 10;

/* GET users listing. */
router.get('/', (req, res) => {
  const teachers = getAllTeachers();

  res.json(teachers);
});

router.post('/login', (req, res) => {
  const mail = req?.body?.loginUsername?.lenght !== 0 ? req.body.loginUsername : undefined;
  const password = req?.body?.loginPassword?.lenght !== 0 ? req.body.loginPassword : undefined;

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

  return res.json(isUser);
});

router.post('/register', (req, res) => {
  const mail = req?.body?.mail?.lenght !== 0 ? req.body.registerUsername : undefined;
  const password = req?.body?.registerPassword?.lenght !== 0 ? req.body.registerPassword : undefined;
  const passwordConfirm =
    req?.body?.registerConfPassword?.lenght !== 0 ? req.body.registerConfPassword : undefined;
  if (!mail || !password || !passwordConfirm) return res.status(400).json('email ou password null');

  // comment configuer un message d'erreur ?
  if (password !== passwordConfirm)
    return res.status(400).json('les mots de passe ne correspondent pas');
  if (!mail.match(/^[äöüéèa-zA-Z0-9]+[-_.]*[äöüéèa-zA-Z0-9]*@student.vinci.be$/))
    return res.status(400).json("Email non valide ou n'appartenant pas à un étudiant vinci");
  const encryptedPassword = bcrypt.hashSync(password, saltRounds);

  const potentialUser = toRegisterAStudent(mail, encryptedPassword);
  if (!potentialUser) return res.status(400).json('enregistrement impossible ');

  return res.json(potentialUser);
});

router.post('/registerTeacher', (req, res) => {
  const mail = req?.body?.mail?.lenght !== 0 ? req.body.teacherUsername : undefined;
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
