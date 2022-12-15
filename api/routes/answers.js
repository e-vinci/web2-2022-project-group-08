const express = require('express');
const { getAllAnswersOneQuestions} = require('../models/Question');
const {addAnswerByQuestionId,  deleteAnswersByQuestionId} = require('../models/Answer');

const router = express.Router();


router.get('/', function (req, res) {
    const question = req?.query
      ? parseInt(req.query.question)
      : undefined;
    console.log(question);
    if (
      question &&
      (typeof question !== 'number' || question <= 0)
    )
      return res.sendStatus(400);
  
    if (!question) return res.json([]);
  
    return res.json(getAllAnswersOneQuestions(question));
  });

 router.post('/', function (req, res) {
    const answers = [];
    const answer1 = addAnswerByQuestionId(req.body.answer1, req.body.questionID, req.body.goodAnswerNumber === '1', req.body.feedback);
    answers.push(answer1);
    const answer2 = addAnswerByQuestionId(req.body.answer2, req.body.questionID, req.body.goodAnswerNumber === '2', req.body.feedback);
    answers.push(answer2);
    const answer3 = addAnswerByQuestionId(req.body.answer3, req.body.questionID, req.body.goodAnswerNumber === '3', req.body.feedback);
    answers.push(answer3);
    const answer4 = addAnswerByQuestionId(req.body.answer4, req.body.questionID, req.body.goodAnswerNumber === '4', req.body.feedback);
    answers.push(answer4);

    return res.json(answers); 
    });

  router.patch('/:id', function (req, res) { /* Attention, c'est l'id de la question*/
    const answers = [];
    deleteAnswersByQuestionId(req.params.id);
    const answer1 = addAnswerByQuestionId(req.body.answer1, req.body.questionID, req.body.goodAnswerNumber === '1', req.body.feedback);
    answers.push(answer1);
    const answer2 = addAnswerByQuestionId(req.body.answer2, req.body.questionID, req.body.goodAnswerNumber === '2', req.body.feedback);
    answers.push(answer2);
    const answer3 = addAnswerByQuestionId(req.body.answer3, req.body.questionID, req.body.goodAnswerNumber === '3', req.body.feedback);
    answers.push(answer3);
    const answer4 = addAnswerByQuestionId(req.body.answer4, req.body.questionID, req.body.goodAnswerNumber === '4', req.body.feedback);
    answers.push(answer4);
    return res.json(answers); 
      });



module.exports = router;
