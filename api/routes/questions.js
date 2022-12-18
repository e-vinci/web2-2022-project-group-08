const express = require('express');
// eslint-disable-next-line no-unused-vars
const {getAllQuestionsOneQuizz, addQuestionByQuizId, modifyQuestionByID, deleteQuestionById} = require('../models/Question');


const router = express.Router();


router.get('/', (req, res) => {
    const quiz = req?.query ? parseInt(req.query.quiz, 10) : undefined;
    console.log(quiz);
    if ( quiz && (typeof quiz !== 'number' || quiz <= 0)  )
      return res.sendStatus(400);
  
    if (!quiz) return res.json([]);
  
    return res.json(getAllQuestionsOneQuizz(quiz));
  });


router.post('/', (req, res) => {
  const question = addQuestionByQuizId(req.body.question, req.body.quizID);
  return res.json(question); 
  });

router.patch('/:id', (req, res) => {
  const question = modifyQuestionByID(req.params.id, req.body.question);
  return res.json(question); 
  });

router.delete('/:id', (req, res)=> {
  const question = deleteQuestionById(req.params.id);
  return res.json(question);
});

module.exports = router;
