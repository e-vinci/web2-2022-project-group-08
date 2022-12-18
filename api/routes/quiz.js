 const express = require('express');
const {addQuizzByCourseName, getQuizById, getQuizzes, deleteQuizById, updateQuizById, getQuizByCourse} = require ('../models/Quiz');


const router = express.Router();




router.get('/', (req, res) =>{
  const course = req.query?.course;
  if(course){
    const quiz = getQuizByCourse(course);
    if(!quiz) return res.status(200)
    return res.json(quiz)
  }else{

  const quizzes = getQuizzes();
  return res.json(quizzes);
  }
   });

router.get('/:id', (req, res) =>{
  const quizID = req.params.id;
  const quiz = getQuizById(quizID);
  console.log(quiz)
  return res.json(quiz);
  });






router.post('/', (req, res) => {
  const quiz = addQuizzByCourseName(req.body.selectedCourse);
  return res.json(quiz);
  });


router.delete('/:id', (req,res) => {
  const deletedQuiz = deleteQuizById(req.params.id);
  return res.json(deletedQuiz);
});


router.patch('/:id', (req, res) => {
  const updatedQuiz = updateQuizById(req.params.id, req.body.newCourse)
  console.log(updatedQuiz);
  if(!updatedQuiz) return res.status(409).json("");
  return res.json(updatedQuiz);
})

 module.exports = router;
