var app = angular.module('velmenniApp',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
	// $urlRouterProvider.otherwise("index");
	$stateProvider.state("index",{
		url: "/",
		templateUrl: "partials/video.html"
	}).state("products",{
		url: "/products",
		templateUrl: "partials/products.html"
	}).state("team",{
		url: "/team",
		templateUrl: "partials/team.html"
	}).state("contact",{
		url: '/contact',
		templateUrl: 'partials/contact.html'
	});
	$locationProvider.html5Mode(true);
});


app.controller('videoCounter', ['$scope','$http', function($scope,$http){
	$scope.video = function(videoId) {
		
	}
}])