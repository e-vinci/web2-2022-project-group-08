 const express = require('express');
const { getAllcourses, getAllQuestionsOneQuizz, getAllAnswersOneQuestions } = require('../models/Question');
const {addQuizzByCourseName} = require ('../models/Quiz');

const router = express.Router();




router.get('/', (req, res) =>{
    const courses = getAllcourses()
    res.json(courses);
   });


router.get('/questions', (req, res) => {
    const questions = getAllQuestionsOneQuizz(2);
    return res.json(questions);
  });

router.get('/answers', (req, res) => {
    const answers = getAllAnswersOneQuestions(1);
    return res.json(answers);
  });



router.post('/add', (req, res) => {
  console.log(req.body.selectedCourse);
  const quiz = addQuizzByCourseName(req.body.selectedCourse);
  if (!quiz) return res.status(400).json("Il existe déjà un quizz pour ce cours");
  return res.json(quiz);
  });

 module.exports = router;
