 const express = require('express');
const {addQuizzByCourseName, getQuizById, getQuizzes} = require ('../models/Quiz');


const router = express.Router();




router.get('/', (req, res) =>{
  const quizzes = getQuizzes();
  return res.json(quizzes);
   });

router.get('/:id', (req, res) =>{
  const quizID = req.params.id;
  const quiz = getQuizById(quizID);
  console.log(quiz)
  return res.json(quiz);
  });


router.post('/', (req, res) => {
  const quiz = addQuizzByCourseName(req.body.selectedCourse);
  if (!quiz) return res.status(400).json("Il existe déjà un quizz pour ce cours");
  return res.json(quiz);
  });

 module.exports = router;
