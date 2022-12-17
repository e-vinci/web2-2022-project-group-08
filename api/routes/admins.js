const express = require('express');
const {getAllteachers} = require('../models/User');
const {getAllCoursesForTeacher} = require('../models/User');
const {getCourseById, createCourse} = require('../models/Course');


const router = express.Router();

router.get('/', (req, res) =>{

    const teachers = getAllteachers();
    return res.json(teachers);
});


module.exports = router;