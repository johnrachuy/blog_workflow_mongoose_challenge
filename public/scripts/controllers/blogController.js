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
            $scope.title = '';
            $scope.author = '';
            $scope.date = '';
            $scope.entry = '';
        });
    };

    function getPost() {
        $http.get('/blog_post').then(function(response) {
            $scope.blogHistory = response.data;
        });
    }

    $scope.showPost = function(index) {
        $scope.blogHistory[index].showThis = true;
    };

    $scope.submitReview = function (index) {
        var comment = $scope.blogHistory[index];
        console.log(comment);

        $http.put('/blog_post', comment).then(function(response) {
            $scope.comment = response.data;
        });
    };

    $scope.delete = function(id) {
        console.log(id);
        $http.delete('/blog_post/' + id).then(function(response) {
            getPost();
            console.log(response.data);
        });
    };

    console.log('Blog Controller');
}]);