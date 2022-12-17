const db = require('./db_conf');

function addNote(note, studentId){
    return db.prepare("INSERT INTO personal_user_notes (content, student) VALUES (?,?)").run(note, studentId);
}

function getNotes(student){
    return db.prepare("SELECT id_personal_note, content, date_creation FROM personal_user_notes WHERE student = ?").all(student);
}

module.exports={
    addNote, getNotes
}
