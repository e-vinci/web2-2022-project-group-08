 const express = require('express');
const {addQuizzByCourseName, getQuizById, getQuizzes, deleteQuizById, updateQuizById} = require ('../models/Quiz');


const router = express.Router();




router.get('/', (req, res) =>{
  const quizzes = getQuizzes();
  return res.json(quizzes);
   });

router.get('/:id', (req, res) =>{
  const quizID = req.params.id;
  const quiz = getQuizById(quizID);
  console.log(quiz)
  return res.json(quiz);
  });


router.post('/', (req, res) => {
  const quiz = addQuizzByCourseName(req.body.selectedCourse);
  if (!quiz) return res.status(400).json("Il existe déjà un quizz pour ce cours");
  return res.json(quiz);
  });


router.delete('/:id', (req,res) => {
  const deletedQuiz = deleteQuizById(req.params.id);
  return res.json(deletedQuiz);
});


router.patch('/:id', (req, res) => {
  const updatedQuiz = updateQuizById(req.params.id, req.body.newCourse)
  console.log(updatedQuiz);
  if(!updateQuizById) return res.status(400).json("Le cours possède déjà un quizz ! Veuillez d'abord supprimer le quizz pour le cours en question ou choisir un autre cours.");
  return res.json(updatedQuiz);
})

 module.exports = router;
