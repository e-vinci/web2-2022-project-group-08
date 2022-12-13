const express = require('express');
const { getAllcourses , getACourseImage} = require('../models/Course');

const router = express.Router();


router.get('/', (req, res) =>{
    const courses = getAllcourses()
    res.status(200).json(courses);
    const picture = getACourseImage()
    res.status(200).json(picture);
});


module.exports = router;