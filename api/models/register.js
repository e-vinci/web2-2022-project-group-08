const db = require('./db_conf');

function getAllTeachers() {
    return db.prepare("SELECT * FROM teachers ").all();    
};



module.exports={
    getAllTeachers
};

