const express = require('express');
const { getAllTeachers, getOneTeacher, getOneStudent } = require('../models/Register');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  const teachers = getAllTeachers();

  res.json(teachers);
});

let isUser;

router.post('/login', (req, res) => {
  const mail = req?.body?.username?.lenght !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.lenght !== 0 ? req.body.password : undefined;
  const student = '@student.vinci.be';
  const teacher = '@vinci.be';

  console.log(mail);
  console.log(password);

  if (!mail || !password) res.sendStatus(400);

  if (mail.includes(student)) {
    isUser = getOneStudent(mail, password);
    
  } else if (mail.includes(teacher)) {
    isUser = getOneTeacher(mail, password);
   
  }

  if (!isUser) res.sendStatus(401);
  
  res.json(isUser);
});

module.exports = router;
