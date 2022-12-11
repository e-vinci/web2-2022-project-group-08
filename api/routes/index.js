const express = require('express');
const { getAllQuestionsOneQuizz,  
     } = require('../models/Question');

const router = express.Router();


router.get('/', (req, res) =>{
 
    const  questions =  getAllQuestionsOneQuizz(1);
    console.log( `les questions ${questions}`);
    
    let answers;
    // for (const quest in questions) {
        
    //     console.log(`la question ${quest.content}`);
    //     answers = getAllAnswersOneQuestions(quest.number);
    //     console.log(`la réponse ${answers}`);
    // };
    
    res.json(answers);
});



module.exports = router;
