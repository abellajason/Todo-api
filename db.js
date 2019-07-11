var Sequelize = require('sequelize');

var env = process.env.DATABASE_URL || 'campeonatodb';
var sequelize;

console.log(process.env.DATABASE_URL , env);

if(!env) {
    sequelize = new Sequelize("postgres://postgres:postgres@localhost/urxfqucqjebtsz", {
        'dialect' : 'postgres'
    })
} else {
    sequelize = new Sequelize(undefined,undefined,undefined, {
        'dialect' : 'sqlite', 
        'storage' : __dirname + '/data/dev-todo-api.sqlite'
        // murag kani ang issue 
    })
}

var db = {};

db.Todo = sequelize.import(__dirname+'/models/todo.js');
db.User = sequelize.import(__dirname+'/models/user.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize; 
module.exports = db;