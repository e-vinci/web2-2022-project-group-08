const express = require('express');
const {getAllCourses, createCourse} = require('../models/Course')


const router = express.Router();



router.get('/', (req, res) =>{
    const courses = getAllCourses();
    return res.json(courses);
   });


router.post('/', (req, res) =>{
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


module.exports = router;