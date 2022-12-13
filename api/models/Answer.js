const db = require('./db_conf');


function addAnswerByQuestionId(answer, questionID){
    console.log(answer, questionID);
    return db.prepare('INSERT INTO answers (question, content, correct) VALUES (?,?,?)').run(questionID, answer,0);
}

module.exports={
    addAnswerByQuestionId
};
