const express = require('express');
const {getAllcourses} = require('../models/Course')


const router = express.Router();



router.get('/', (req, res) =>{
    const courses = getAllcourses();
    return res.json(courses);
   });


module.exports = router;