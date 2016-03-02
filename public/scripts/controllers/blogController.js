myApp.controller('BlogController', ['$scope', '$http', function($scope, $http) {

    getPost();

    $scope.savePost = function() {
        var post = {
            title: $scope.title,
            author: $scope.author,
            date: $scope.date,
            entry: $scope.entry
        };

        $http.post('/blog_post', post).then(function(response) {
            $scope.post = response.data;
            console.log(response.data);
        });
    };

    function getPost() {
        $http.get('/blog_post').then(function(response) {
            $scope.blogHistory = response.data;

        });
    }

    console.log('Blog Controller');

}]);