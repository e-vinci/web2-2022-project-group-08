const express = require('express');
const { getAllCourses , getACourseImage} = require('../models/Course');
const {  getAllAnswersOneQuestions, getAllQuestionsOneQuizz, 
     } = require('../models/Question');

const router = express.Router();

router.get('/', (req, res) =>{
    const courses = getAllCourses()
    console.log(courses)
    res.status(200).json(courses);
    const picture = getACourseImage()
    res.status(200).json(picture);
});


router.get('/', (req, res) =>{ 
    const  questions   = getAllQuestionsOneQuizz(1);
    const  answers = [];
     questions.forEach(element => (
     answers.push(getAllAnswersOneQuestions(element.question_id))));
     console.log( answers );
    res.json({questions,answers});
});


module.exports = router;
