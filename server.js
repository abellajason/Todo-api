var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
const PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;


app.use(bodyParser.json());

app.get('/',(req, res)=>{
    res.send('Todo API Root');
});

app.get('/todos', (req,res) => {
    res.json(todos);
});

app.get('/todos/:id', (req,res) => {
    var todoid = parseInt(req.params.id);
    var matchedTodo = _.findWhere(todos,{id:todoid});

    if(matchedTodo) {
        res.json(matchedTodo);
    }
    else {
        res.status(404).send();
    }
})

app.post('/todos' , (req,res) => {
    var body = _.pick(req.body, 'description', 'completed');

    if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
        return res.status(400).send();
    }

    body.description=body.description.trim();

    body.id = todoNextId++;

    todos.push(body);

    res.json(body);
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



app.listen(PORT, () => {
    console.log('App started on ' + PORT);
})
