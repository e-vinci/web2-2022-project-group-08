const db = require('./db_conf');

function getAllteachers(){
    return db.prepare('SELECT * FROM teachers').all();
};

module.exports={
    getAllteachers
};