const express = require('express');
const { getAllcourses } = require('../models/Course');

const router = express.Router();


router.get('/', (req, res) =>{
    const courses = getAllcourses()
    res.status(200).json(courses);
});


module.exports = router;