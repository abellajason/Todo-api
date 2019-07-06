const Sequelize = require('sequelize');

const sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect' : 'sqlite', 
    'storage' : __dirname + '/data/dev-todo-api.sqlite'
})

const db = {

};

db.Todo = sequelize.import(__dirname+'/models/todo.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize; 
module.exports = db;