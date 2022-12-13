 const express = require('express');
const { getAllcourses, getAllQuestionsOneQuizz, getAllAnswersOneQuestions } = require('../models/Question');

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

 module.exports = router;
