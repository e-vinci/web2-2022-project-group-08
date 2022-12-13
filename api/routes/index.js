const express = require('express');
const { getAllcourses , getAllAnswersOneQuestions, getAllQuestionsOneQuizz, 
     } = require('../models/Question');

const router = express.Router();

router.get('/', (req, res) =>{
    const courses = getAllcourses()
    console.log(courses)
    res.status(200).json(courses);
});


router.get('/questions', (req, res) =>{ 
    const  questions  = getAllQuestionsOneQuizz(1);
    const  answers = [];
     questions.forEach(element => (
     answers.push(getAllAnswersOneQuestions(element.question_id))));
     console.log( answers );
    res.json({questions,answers});
});


module.exports = router;
