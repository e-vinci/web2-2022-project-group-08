const express = require('express');
const { getAllTeachers,
  } = require('../models/Register');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  const  teachers = getAllTeachers();
  res.json(teachers);
});

module.exports = router;
