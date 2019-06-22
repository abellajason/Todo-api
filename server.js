var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;


app.get('/',(req, res)=>{
    res.send('Todo API Root');
});

app.listen(PORT, () => {
    console.log('App started on ' + PORT);
})
