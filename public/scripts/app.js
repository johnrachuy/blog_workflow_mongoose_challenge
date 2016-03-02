var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'BlogController'
        })
        .when('/write_blog', {
            templateUrl: '/views/templates/write_blog.html',
            controller: 'BlogController'
        })
        .when('/review_blog', {
            templateUrl: '/views/templates/review_blog.html',
            controller: 'BlogController'
        })
        .otherwise({
            redirectTo: 'home'
        });


}]);