const express = require('express');
const { getAllcourses } = require('../models/Question');

const router = express.Router();




router.get('/', (req, res) =>{
    const courses = getAllcourses()
        res.json(courses);
    });

module.exports = router;
