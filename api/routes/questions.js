const express = require('express');
// eslint-disable-next-line no-unused-vars
const {getAllQuestionsOneQuizz, addQuestionByQuizId, modifyQuestionByID, deleteQuestionById} = require('../models/Question');


const router = express.Router();


router.get('/', function (req, res) {
    const quiz = req?.query ? parseInt(req.query.quiz) : undefined;
    console.log(quiz);
    if ( quiz && (typeof quiz !== 'number' || quiz <= 0)  )
      return res.sendStatus(400);
  
    if (!quiz) return res.json([]);
  
    const questions = getAllQuestionsOneQuizz(quiz);
    return res.json(questions);
  });


router.post('/', function (req, res) {
  const question = addQuestionByQuizId(req.body.question, req.body.quizID);
  return res.json(question); 
  });

router.patch('/:id', function (req, res) {
  const question = modifyQuestionByID(req.params.id, req.body.question);
  return res.json(question); 
  });

router.delete('/:id', function (req, res){
  const question = deleteQuestionById(req.params.id);
  return res.json(question);
});

module.exports = router;
