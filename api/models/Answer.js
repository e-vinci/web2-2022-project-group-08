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

module.exports={
    addAnswerByQuestionId
};
