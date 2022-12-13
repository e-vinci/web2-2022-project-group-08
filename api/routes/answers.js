const express = require('express');
const { getAllAnswersOneQuestions} = require('../models/Question');

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



module.exports = router;
