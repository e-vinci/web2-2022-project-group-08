const express = require('express');
const { getAllTeachers, getOneTeacher, getOneStudent, 
  toRegisterAStudent, toRegisterATeacher, } 
  = require('../models/Register');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  const teachers = getAllTeachers();

  res.json(teachers);
});



router.post('/login', (req, res) => {
  const mail = req?.body?.username?.lenght !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.lenght !== 0 ? req.body.password : undefined;
  const student = '@student.vinci.be';
  const teacher = '@vinci.be';
  let isUser;
  
  if (!mail || !password) return  res.status(400).json('utilisateur inexistant');

  if (mail.includes(student)) {
    isUser = getOneStudent(mail, password);
    
  } else if (mail.includes(teacher)) {
    isUser = getOneTeacher(mail, password);
   
  }
  if (!isUser) return res.status(401).json('utilisateur inconnu');
  console.log(isUser);
  
  return res.json(isUser);
});


router.post('/register', (req,res) => {
   const mail = req?.body?.mail?.lenght !== 0 ? req.body.username : undefined;
   const password = req?.body?.password?.lenght !== 0 ? req.body.password : undefined ;
   const passwordConfirm = req?.body?.confirmationPassword?.lenght !== 0 ? req.body.confirmationPassword : undefined ;
   
   if (!mail || !password || !passwordConfirm) return res.status(400).json('email ou password null');

   console.log(`mail :  ${mail}`);
   console.log(`password :  ${password}`);
   console.log(`confi :  ${passwordConfirm}`);


   // comment configuer un message d'erreur ? 
  if(password !== passwordConfirm) return res.status(400).json('le mot de passe ne correspond pas'); 

   const student = '@student.vinci.be';
   const teacher = '@vinci.be';

   let potentialUser;
   
   if(mail.includes(student)){
    potentialUser = toRegisterAStudent(mail, password);
   } else
   if(mail.include(teacher)){
    potentialUser = toRegisterATeacher(mail, password);
   }
   
   console.log(`etudiant :  ${potentialUser}`);
    
   if(!potentialUser) return res.status(400).json('enregistrement impossible ');
   
   return res.json(potentialUser);
});

module.exports = router;
