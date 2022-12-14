const db = require('./db_conf');


function addAnswerByQuestionId(answer, questionID, isGoodAnswer, feedback){
    if(isGoodAnswer) {
        isGoodAnswer = 1;
    }
    else {
        isGoodAnswer = 0;
        feedback = null;
    }

    return db.prepare('INSERT INTO answers (question, content, correct, good_answer_feedback) VALUES (?,?,?,?)').run(questionID, answer,isGoodAnswer, feedback);
}

function getAnswersByQuizId(quizID){
    return db.prepare("SELECT * FROM answers a , questions q WHERE a.question = q.question_id AND q.quizz = ?").all(quizID);
}

function deleteAnswersByQuizId(quizID){
    const answers = getAnswersByQuizId(quizID);
    for (let index = 0; index < answers.length; index+=1) {
        db.prepare('DELETE FROM answers WHERE answers_id = ? ').run(answers[index].answers_id);  
    }
}

function deleteAnswersByQuestionId(questionID){
    db.prepare('DELETE FROM answers WHERE question = ? ').run(questionID);  
    
}




module.exports={
    deleteAnswersByQuizId, addAnswerByQuestionId, deleteAnswersByQuestionId
};
