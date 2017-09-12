angular.module('todoController', [])
    .controller('mainController', function($scope, $http, Todos) {
        $scope.formData = {};
        $scope.editTodo = false;
        $scope.button = "Add Task";

        // GET =====================================================================
        // use the service to get all the todos
        Todos.get()
            .success(function(data) {
                $scope.todos = data;
            });

        // CREATE ==================================================================
        $scope.createTodo = function() {
                if( $scope.editTodo === false) {
                    Todos.create($scope.formData)
                        .success(function (data) {
                            $scope.todos = data; // assign our new list of todos
                        });
                }else{
                    $scope.button = "Update";
                    Todos.update($scope.formData)
                        .success(function(data) {
                            $scope.todos = data; // assign our new list of todos
                        });
                }
                $scope.editTodo = false;
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.button = "Add Task"
          //  }
        };

        // EDIT ==================================================================
        $scope.editTask = function (updatedtodo) {
            $scope.formData=updatedtodo;
            $scope.editTodo = updatedtodo;
            $scope.button = "Update";
        }

        // DELETE ==================================================================
        // delete a todo after checking it
        $scope.deleteTodo = function(id) {
            $scope.button = "Add Task";
            $scope.editTodo = false;

            if (confirm("Are you sure you want to delete task?") == true) {
                Todos.delete(id)
                    .success(function (data) {
                        $scope.todos = data; // assign our new list of todos
                    });

           }
        }

        // STATUS ==================================================================
        //Set if task done or not
        $scope.setTaskStatus = function (todo) {
            $scope.button = "Add Task";
            $scope.editTodo = false;

            if(todo.done===true){
                todo.done=false;
            }else {todo.done=true;}
            Todos.update(todo)
                .success(function(data) {
                    $scope.todos = data; // assign our new list of todos
                });
        }

    });