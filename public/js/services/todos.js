angular.module('todoService', ['ngRoute'])

    .factory('Todos', function($http) {
        return {
            get : function() {
                return $http.get('/api/todos');
            },
            create : function(todoData) {
                return $http.post('/api/todos', todoData);
            },
            update : function(todo) {
                return $http.put('/api/todos', todo);
            },
            delete : function(id) {
                return $http.delete('/api/todos/' + id);
            }
        }
    });