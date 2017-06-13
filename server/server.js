let express = require('express');
let bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { user } = require('./models/user');


let app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    //  console.log(req.body);
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then(doc => {
        res.send(doc);
    }, err => {
        res.status(400).send(err);
    })

});

app.get('/todos', (req, res) => {
    Todo.find().then(todos => {
        res.send({ todos });
    }, err => {
        res.status(400).send(err);
    })
});


app.get('/todos/:id', (req, res) => {

    let paramId = req.params.id;


    if (!ObjectID.isValid(paramId)) {
        return res.status(404).send();
    }

    Todo.findById(paramId).then(todo => {
        if (!todo)
            return res.status(404).send();
        //   console.log(JSON.stringify(todo, undefined, 2));
        res.send({todo});

    }).catch(e => res.status(400).send());

});


app.listen(port, () => {
    console.log(`started up at ${port}`);
})


module.exports = { app };