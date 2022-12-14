const express = require('express');
const {getAllCourses} = require('../models/Course')


const router = express.Router();



router.get('/', (req, res) =>{
    const courses = getAllCourses();
    return res.json(courses);
   });


module.exports = router;