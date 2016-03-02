myApp.controller('BlogController', ['$scope', '$http', function($scope, $http) {

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

    console.log('Blog Controller');

}]);