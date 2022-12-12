const express = require('express');
const { getAllcourses } = require('../models/Question');

const router = express.Router();


router.get('/', (req, res) =>{
 const courses = getAllcourses()
// const registeredQuestions = getAllRegisteredQuestion(3)

     res.status(200).json(courses);
   //  res.status(200).json(registeredQuestions);

router.get('/', (req, res) =>{
    const courses = getAllcourses()
        res.json(courses);
    });


module.exports = router;
