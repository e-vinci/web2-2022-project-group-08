const db = require('./db_conf');


function addAnswerByQuestionId(answer, questionID, isGoodAnswer){
    if(isGoodAnswer) isGoodAnswer = 1;
    else isGoodAnswer = 0;
    return db.prepare('INSERT INTO answers (question, content, correct) VALUES (?,?,?)').run(questionID, answer,isGoodAnswer);
}

module.exports={
    addAnswerByQuestionId
};
