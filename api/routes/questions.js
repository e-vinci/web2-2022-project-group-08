const express = require('express');
// eslint-disable-next-line no-unused-vars
const { getAllRegisteredQuestion, getAllQuestionsOneQuizz, getOneCourses } = require('../models/Question');

const router = express.Router();


router.get('/', (req, res) =>{
    if(req.query.id){
        res.json(getAllQuestionsOneQuizz(req.query.id));
    }
    res.json(getAllQuestionsOneQuizz()); // mieux vaut l'id du quiz direct ou le cours puis trouver le quiz via requete
});


router.get('/course', (req, res) =>{
    
    res.json(getOneCourses(req.query.id)); // mieux vaut l'id du quiz direct ou le cours puis trouver le quiz via requete
});



module.exports = router;
