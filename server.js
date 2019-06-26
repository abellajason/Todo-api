var express = require('express');
var bodyParser = require('body-parser');
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
    var matchedTodo;
    todos.forEach(element => {
        if(todoid ===  element.id) {
            matchedTodo = element;
        }
    });
    if(matchedTodo) {
        res.json(matchedTodo);
    }
    else {
        res.status(404).send();
    }
})

app.post('/todos' , (req,res) => {
    var body = req.body;

    body.id = todoNextId++;

    todos.push(body);

    res.json(postedTodo);
});


app.listen(PORT, () => {
    console.log('App started on ' + PORT);
})
