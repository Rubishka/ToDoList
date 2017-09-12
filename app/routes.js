// load the todo model
var Todo = require('./models/todo');

// expose the routes to our app with module.exports
module.exports = function(app) {

    app.get('/api/todos', function (req, res) {
        Todo.find(function (err, todos) {
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function (err, todos) {
                if (err)
                    res.send(err)
                console.log(todos);
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);
            // get and return all the todos after you create another
            Todo.find(function (err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    app.put('/api/todos/', function (req, res) {
        Todo.findById(req.body._id, function (err, todo) {
            if (err) {
                res.send(err);
            } else if (req.body._id !=null){
                todo.text = req.body.text || todo.text;
                todo.done = req.body.done;
                // Save the updated document back to the database
                todo.save(function (err, todo) {
                    if (err) {
                        res.send(err)
                    }
                    // get and return all the todos after you create another
                    Todo.find(function (err, todos) {
                        if (err)
                            res.send(err)
                        res.json(todos);
                    });
                });
            }
        });
    });
}