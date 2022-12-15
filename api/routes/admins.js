const express = require('express');
const {getAllteachers} = require('../models/User');
const {getAllCoursesForTeacher} = require('../models/User');
const {getCourseById} = require('../models/Course');


const router = express.Router();

router.get('/', (req, res) =>{

    const teachers = getAllteachers();
    return res.json(teachers);
});


/* router.get('/getInfo', (req, res) =>{

    const coursesForteacher = getAllCoursesForTeacher(); mettre l'id du prof mais pour l'instant je peux récup l'email
    puis je dois trouver via renvoyer tout les noms de cours via leurs id
    return res.json();
}); */

module.exports = router;