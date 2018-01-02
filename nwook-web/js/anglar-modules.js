(function() {
    //'use strict';
	
	//var $nwookHost = "http://ec2-13-126-176-192.ap-south-1.compute.amazonaws.com:8888";
	//var $nwookHost = "http://13.126.176.192:8888";
	var $nwookHost = "/nwook";
	var $phoneNumber;
	
    var nwook = angular.module('nwook',['ngRoute']);

    nwook.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.
            when('/', {
                /*controller: '',*/
                templateUrl: 'templates/index.html'
            }).
            when('/home', {
                /*controller: '',*/
                templateUrl: 'templates/home.html'
            }).

            when('/welcome', {
                controller: 'signupController',
                templateUrl: 'templates/welcome.html'
            }).
            when('/verify-otp', {                            
                controller: 'signupController',
                templateUrl: 'templates/verify-otp.html'
            }).
            when('/verification-step', {
                controller: 'signupController',
                templateUrl: 'templates/verification-step.html'
            }).

            when('/login', {
                controller: 'loginController',
                templateUrl: 'templates/welcome.html'
            }).
            when('/login-otp', {                            
                controller: 'loginController',
                templateUrl: 'templates/verify-otp.html'
            }).
            when('/verification-login', {
                controller: 'loginController',
                templateUrl: 'templates/login.html'
            }).
            
            when('/setup-password', {
                /*controller: 'resetPasswordController',*/
                templateUrl: 'templates/setup-password.html'
                
            }).
            when('/reset-password', {
                controller: 'resetPasswordController',
                templateUrl: 'templates/reset-password.html'
            }).
		
			when('/profile', {
                controller: 'profileController',
                templateUrl: 'templates/profile.html'
            }).
		  
            when('/space', {
                /*controller: 'profileController',*/
                templateUrl: 'templates/space.html'
            }).
            when('/checkout', {
                /*controller: 'profileController',*/
                templateUrl: 'templates/checkout.html'
            }).
            when('/booking-engine', {
                /*controller: 'profileController',*/
                templateUrl: 'templates/booking-engine.html'
            }).
			
			when('/search-results', {
                /*controller: 'searchController',*/
                templateUrl: 'templates/search-results.html'
            }).
        
            when('/faq', {
                /*controller: 'searchController',*/
                templateUrl: 'templates/faq.html'
            }).
            when('/invite', {
                /*controller: 'searchController',*/
                templateUrl: 'templates/invite.html'
            }).
			
		
            otherwise({
                redirectTo: '/'
            }
        );
    }]);

    nwook.controller('loginController', function($scope, $http) {
        $scope.sendNumber = function() {
			/*$scope.countryCode = "+91";
            $scope.phoneNumber = $scope.phNumber.replace("-", "").replace("-", "");
			$phoneNumber = $scope.countryCode+$scope.phoneNumber;*/
			
			location.hash = "#/verification-login";
		};
		
		$scope.login = function() {
			/*$http.get($nwookHost + "/loginByCode", data).then(function(res){
				return res.data.data;
			});*/
			
			location.hash = "#/profile";
		};
		
		$scope.verifyOTP = function() {
			/*$http.get($nwookHost + "/uniqueCode/verify/mobile/"+$phoneNumber+"/"+$scope.otp, data).then(function(res){
				return res.data.data;
			});*/
            
			location.hash = "#/profile";
		};
		
    });

    nwook.controller('signupController', function($scope, $http) {
		
		$scope.sendNumber = function() {
			/*$scope.countryCode = "+91";
			$scope.phoneNumber = $scope.phNumber.replace("-", "").replace("-", "");
			$phoneNumber = $scope.countryCode+$scope.phoneNumber;
			
			var dataJson = {
				"otpType": "MOBILE",
				"smsAction": "MOBILE_VERIFICATION",
				"to": $phoneNumber
			}; 
			
			$http.post($nwookHost + "/uniqueCode/generate", dataJson).then(function(res){
				return res.data;
				console.log(res);
			});*/
			
			location.hash = "#/verify-otp";
            /*var url = $nwookHost + "/uniqueCode/generate";
			$.ajax({
			  	type : 'POST',
				url : url,
				data: JSON.stringify(dataJson),
				contentType: 'application/json'
			}).success(function(data) {
				console.log(data);
				console.log(data.message);
				
			}).error(function( errorThrown) {
				console.log(errorThrown);
				console.log(errorThrown);
			});*/
        };
		
		$scope.verifyOTP = function() {
			/*var dataJson = {
				"phoneNumber": $phoneNumber,
				"uniqueCode": $scope.otp
			};
			
			$http.post($nwookHost + "/signup", dataJson).then(function(res){
				return res.data;
				console.log(res);
			});*/
            
			location.hash = "#/verification-step";
		};
        
		
        $scope.completeRegt = function() {
			location.hash = "#/profile";
		};
	});
	
	
	nwook.controller('profileController', function($scope, $http) {
		
	});
	
	
})();