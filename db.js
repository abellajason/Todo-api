var Sequelize = require('sequelize');

var env = process.env.DATABASE_URL || 'dev-todo-api';
var sequelize;

if(!process.env.DATABASE_URL) {
    sequelize = new Sequelize("postgres://postgres:postgres@localhost/urxfqucqjebtsz", {
        'dialect' : 'postgres'
    })
} else {
    sequelize = new Sequelize(undefined, undefined, undefined, {
        'dialect' : 'sqlite', 
        'storage' : __dirname + '/data/dev-todo-api.sqlite'
    })
}

var db = {

};

db.Todo = sequelize.import(__dirname+'/models/todo.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize; 
module.exports = db;