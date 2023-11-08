// de ce avem nevoie de modele aici? cu ce ne ajuta?
var Todo = require('./models/todo');

// de ce avem functia asta aici? ce naiba sunt acronimele astea si la ce sunt bune?
function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        // ce chestie misto, poti sa returnezi toate entitatiile sub forma de json-uri.
        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // metodele astea ar trebui sa fie in controllere. Cine naiba le-a pus aici si cu ce scop?
    // api ---------------------------------------------------------------------
    // get all todos
    // e foarte straigh foward sintax, imi place
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
