const Sequelize = require('sequelize');
const sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect' : 'sqlite',
    'storage' : __dirname+'/basic-sqlite-database.sqlite'
});

const Todo = sequelize.define('todo', {
    description : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            len : [1,250]
            
        }

    },
    completed : {
        type : Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false
    }
})

sequelize.sync({
    // force:true
}).then(() => {
    console.log('Everything is synced');

    Todo.findById(3).then((todo)=> {
        if(todo) {
            console.log(todo.toJSON());
        } else {
            console.log("ERROR: NO TODO FOUND");
        }
    });


    // Todo.create({
    //     description : "Walk the dog",
    //     completed : false
    // }).then((todo) => {
    //     return Todo.create({
    //         description: 'Clean office'
    //     })
    // }).then(()=> {
    //     // return Todo.findById(1);
    //     return Todo.findAll({
    //         where : {
    //             description : {
    //                 $like : '%dog%'
    //             }
    //         }
    //     })
    // }).then((todos) =>{
    //     if(todos) {
    //         todos.forEach((todo) => {
    //             console.log(todo.toJSON());
    //         })
    //     } else {
    //         console.log('no todo found');
    //     }
    // })
    // .catch((e) => {
    //     console.log(e);
    // })


});