const express = require('express');
const { getAllcourses } = require('../models/Question');

const router = express.Router();

module.import ={ getAllcourses
     
};


router.get('/', (req, res) =>{
    const courses = getAllcourses;
    res.json(courses);
});

module.exports = router;
