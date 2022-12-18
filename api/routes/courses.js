const express = require('express');
const {getAllCourses, createCourse, modifyCourse, deleteCourseById} = require('../models/Course')
const {getQuizIdByCourseId, deleteQuizById} = require('../models/Quiz')


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

router.put('/:id', (req, res) =>{
    console.log('router put modification cours cours')

    const idCourse = req.params.id;

    const {nameCourse, codeCourse, descriptionCourse, urlPictureCourse} = req.body
    
    const reponse = modifyCourse(codeCourse, nameCourse, descriptionCourse, urlPictureCourse, idCourse);
    return res.json(reponse);
});


router.delete('/:id', (req, res) =>{
    console.log('router DELETE modification cours cours')

    const idCourse = req.params.id;
    const reponse = getQuizIdByCourseId(idCourse);
    const quizId = reponse.quizz_id;

    if (Number.isInteger(quizId)) {
        const reponse2 = deleteQuizById(quizId);
    }
    let reponse3= deleteCourseById(idCourse);

    return res.json(reponse3);
});


module.exports = router;