/* eslint-disable no-console */
const express = require('express');
const { getAllCoursesForTeacher } = require('../models/User');


const router = express.Router();

router.get('/', (req, res) =>{
    const courses = getAllCoursesForTeacher(1);
    console.log()
    res.status(200).json(courses);
});





module.exports = router;
