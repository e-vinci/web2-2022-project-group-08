 const express = require('express');
const {addQuizzByCourseName, getQuizById, getQuizzes, deleteQuizById, updateQuizById, getQuizByCourse} = require ('../models/Quiz');


const router = express.Router();




router.get('/', (req, res) =>{
  const course = req.query?.course;
  if(course){
    const quiz = getQuizByCourse(course);
    if(!quiz) return res.status(404).json("Pas de quizz pour ce cours");
    return res.json(quiz)
  }else{

  const quizzes = getQuizzes();
  return res.json(quizzes);
  }
   });

router.get('/:id', (req, res) =>{
  const quizID = req.params.id;
  const quiz = getQuizById(quizID);
  return res.json(quiz);
  });



router.post('/', (req, res) => {
  const quiz = addQuizzByCourseName(req.body.selectedCourse);
  if(!quiz) return res.status(401).json("Vous ne pouvez pas ajouter un quizz pour un cours où il y en a déjà un !");
  return res.json(quiz);
  });


router.delete('/:id', (req,res) => {
  const deletedQuiz = deleteQuizById(req.params.id);
  return res.json(deletedQuiz);
});


router.patch('/:id', (req, res) => {
  const updatedQuiz = updateQuizById(req.params.id, req.body.newCourse)
  if(!updatedQuiz) return res.status(409).json("");
  return res.json(updatedQuiz);
})

 module.exports = router;
