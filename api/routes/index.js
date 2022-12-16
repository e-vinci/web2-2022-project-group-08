/* eslint-disable no-console */
const express = require('express');
const { getAllCourses } = require('../models/Course');
const {  getAllAnswersOneQuestions, getAllQuestionsOneQuizz, 
     } = require('../models/Question');

const router = express.Router();

router.get('/', (req, res) =>{
    const courses = getAllCourses()
    console.log(courses)
    res.status(200).json(courses);
//    const picture = getACourseImage()
//     res.status(200).json(picture); 
});


router.get('/questions', (req, res) =>{ 
    const  questions  = getAllQuestionsOneQuizz(1);
    const  answers = [];
     questions.forEach(element => (
     answers.push(getAllAnswersOneQuestions(element.question_id))));
     console.log( answers );
    res.json({questions,answers});
});

router.get('/:idQuestion', (req,res) => {
    const idQuestion = parseInt(req?.params?.idQuestion, 10);

    if(idQuestion === undefined || idQuestion<=0 )
    return res.status(400).json('réponse inconue ');

    const answers = getAllAnswersOneQuestions(idQuestion);
   
     let goodAnswer; 
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    answers.forEach(element =>{ 
        if( element.correct === 1){
        goodAnswer = element
        }
     });
         
    if(goodAnswer === undefined )
      return res.status(400).json('réponse non trouvé ');

    return res.json(goodAnswer);
});


module.exports = router;
