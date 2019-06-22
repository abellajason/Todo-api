var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;
var todos = [{
    id : 1, 
    description : "Meet mom for lunch",
    completed : false
}, {
    id : 2,
    description : "Go to Market",
    completed : false
}, {
    id : 3,
    description : "Feed the fish",
    completed : true
}];


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

app.listen(PORT, () => {
    console.log('App started on ' + PORT);
})
