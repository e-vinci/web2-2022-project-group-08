const express = require('express');
const { getAllcourses } = require('../models/Question');

const router = express.Router();


let courses;

router.get('/', (req, res) =>{

     courses = getAllcourses;
    // eslint-disable-next-line no-console
    console.log(courses)
    res.json(courses);
});

module.exports = { courses };
