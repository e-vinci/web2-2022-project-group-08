const express = require('express');
const {getAllteachers} = require('../models/User');
const {getAllCoursesForTeacher} = require('../models/User');
const {getCourseById, createCourse} = require('../models/Course');


const router = express.Router();

router.get('/', (req, res) =>{

    const teachers = getAllteachers();
    return res.json(teachers);
});


// CREATE COURSE
router.post('/addCourse', (req, res) =>{
    const codeName = req.body.courseCode;
    const courseName = req.body.coursName;
    const courseDescription = req.body.courseTextarea;
    const coursePicture = 'test';

    console.log('VALEUR : ')
    console.log(codeName)
    console.log(courseName)

    if(codeName === null || courseName === null || courseDescription === null || coursePicture === null ){
        return res.status(400).json('Une donnee est vide')
    }
    createCourse(codeName.value, courseName.value, courseDescription.value, coursePicture.value);
    
    return res.json('Cours bien ajoute dans la db');
});

/* router.get('/getInfo', (req, res) =>{

    const coursesForteacher = getAllCoursesForTeacher(); mettre l'id du prof mais pour l'instant je peux récup l'email
    puis je dois trouver via renvoyer tout les noms de cours via leurs id
    return res.json();
}); */

module.exports = router;