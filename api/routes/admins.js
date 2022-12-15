const express = require('express');
const {getAllteachers} = require('../models/User');


const router = express.Router();

router.get('/', (req, res) =>{

    const teachers = getAllteachers();
    return res.json(teachers);
});

module.exports = router;