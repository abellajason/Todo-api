var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js')


var app = express();
const PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;


app.use(bodyParser.json());

app.get('/',(req, res)=>{
    res.send('Todo API Root');
});

app.get('/todos', (req,res) => {
    var query = req.query;
    var where = {};

    if(query.hasOwnProperty('completed') && query.completed === 'true') {
        where.completed = true;
    } else if( query.hasOwnProperty('completed') && query.completed === 'false') {
        where.completed = false;
    }
    if(query.hasOwnProperty('q') && query.q.length > 0){
        where.description = {
            $like : '%'+query.q+'%'
        }
    }
    db.Todo.findAll({where : where}).then(todos => {
        // if(todos) {            
        //     const todos_arr = ['123'];
        //     todos.forEach(todo => {
        //         todos_arr.push(todo);
        //     });
        //     return res.json(todos_arr);
        // } else {
        //     return res.status(404).json('ERROR: NO TODO FOUND');
        // }
        res.json(todos);
    }, e => {
        res.status(500).json(e);
    })
    console.log(where);
    // var filteredTodos = todos;
    
    // if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
    //     filteredTodos = _.where(filteredTodos ,{completed : true});
    // } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
    //     filteredTodos = _.where(filteredTodos ,{completed : false});
    // }
    // if(queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
    //     filteredTodos = _.filter(filteredTodos,(todo) => {
    //         return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
    //     });
    // }

    // res.json(filteredTodos);
});

app.get('/todos/:id', (req,res) => {
    var todoid = parseInt(req.params.id);

    db.Todo.findById(todoid).then(todo => {
        if(todo) {
            return res.json(todo.toJSON());
        } else {
            return res.status(404).json('ERROR: NO TODO FOUND');
        }
    }, e => {
        return res.status(500).json(e);
    })

    // var matchedTodo = _.findWhere(todos,{id:todoid});

    // if(matchedTodo) {
    //     res.json(matchedTodo);
    // }
    // else {
    //     res.status(404).send();
    // }
})

app.post('/todos' , (req,res) => {
    var body = _.pick(req.body, 'description', 'completed');

    db.Todo.create(body).then((todo)=> {
        return res.json(todo.toJSON());
    },(e)=> {
        return res.status(400).json(e);
    });

    // if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
    //     return res.status(400).send();
    // }

    // body.description=body.description.trim();

    // body.id = todoNextId++;

    // todos.push(body);

    // res.json(body);
});


app.delete('/todos/:id' , (req,res) => {
    var todoid = parseInt(req.params.id,10);
    var matchedTodo = _.findWhere(todos, {id:todoid});
    console.log(todoid,matchedTodo, todos);

    if(matchedTodo) {
        // todos = todos.filter(id => id !== matchedTodo);
        // res.json(matchedTodo);
        todos = _.without(todos, matchedTodo);
        res.json(matchedTodo);
    }
    else {
        res.status(404).json({"error" : "no todo found with that id"});
    }

});

app.put('/todos/:id', (req,res) => {
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};
    var todoid = parseInt(req.params.id,10);
    var matchedTodo = _.findWhere(todos, {id:todoid});

    if(!matchedTodo) {
        return res.status(404).send();
    }

    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return res.status(400).json({"error" : "invalid data type"});
    }

    if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        return res.status(400).json({"error" : "invalid data type"})
    }


    _.extend(matchedTodo , validAttributes);
    res.json(matchedTodo);
})

db.sequelize.sync().then(()=> {
    app.listen(PORT, () => {
        console.log('App started on ' + PORT);
    })
})


