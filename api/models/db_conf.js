
let db = require('better-sqlite3');
const config = require('../config');

db = require('better-sqlite3') (config.dbPath, { verbose: console.log })




module.exports = db;
