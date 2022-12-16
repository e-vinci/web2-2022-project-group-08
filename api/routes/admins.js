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
    console.log('router POST ajout cours')

    const {nameCourse, codeCourse, descriptionCourse, urlPictureCourse} = req.body
    

    console.log('VALEUR : ')
    console.log(nameCourse)
    console.log(codeCourse)

    // if(codeName === null || courseName === null || courseDescription === null || coursePicture === null ){
    //     return res.status(400).json('Une donnee est vide')
    // }

    createCourse(nameCourse, codeCourse, descriptionCourse, urlPictureCourse);
    
    return res.json('Cours bien ajoute dans la db');
});

/* router.get('/getInfo', (req, res) =>{

    const coursesForteacher = getAllCoursesForTeacher(); mettre l'id du prof mais pour l'instant je peux récup l'email
    puis je dois trouver via renvoyer tout les noms de cours via leurs id
    return res.json();
}); */

module.exports = router;