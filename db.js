const Sequelize = require('sequelize');

let env = process.env.NODE_ENV || 'development';
let sequelize;

if(env === 'production') {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        'dialect' : 'postgres'
    })
} else {
    sequelize = new Sequelize(undefined, undefined, undefined, {
        'dialect' : 'sqlite', 
        'storage' : __dirname + '/data/dev-todo-api.sqlite'
    })
}

const db = {

};

db.Todo = sequelize.import(__dirname+'/models/todo.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize; 
module.exports = db;