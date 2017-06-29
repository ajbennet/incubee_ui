(function() {
	'use strict';

	angular
	  .module('app')
	  .controller('HomePageController', HomePageController);

	HomePageController.$inject = ['localStorageService', '$timeout', 'envService'];

	function HomePageController(localStorageService, $timeout, envService) {
		var vm = this;
		var isLoggedIn;
		var reviewsArray = [
		{
			name: "Steve McGeorge",
			rating: 3,
			review: "I really liked this company!",
			image: "http://api.randomuser.me/portraits/men/93.jpg"
		},
		{
			name: "Randy Johnson",
			rating: 4,
			review: "This was a great company, can't wait to see more!",
			image: "http://api.randomuser.me/portraits/men/91.jpg"
		},
		{
			name: "Sarah Smith",
			rating: 5,
			review: "Loved everything about this! Just what I have been looking for",
			image: "http://api.randomuser.me/portraits/women/90.jpg"
		}];
		vm.images = [
		{
			image: '/app/img/login.jpg',
			name: "Login"
		},{
			image: '/app/img/profile.jpg',
			name: "Profile"
		},{
			image: '/app/img/location.jpg',
			name: "Location"
		},{
			image: '/app/img/report.jpg',
			name: "Report"
		},{
			image: '/app/img/home.jpg',
			name: "Home"
		},{
			image: '/app/img/ftue.jpg',
			name: "Tutorial"
		}];
		vm.reviewShowing = 0;
		vm.activeReview;
		vm.rate = 7;
	    vm.max = 10;
	    vm.isReadonly = false;
		activate();

		function activate(){

			var isLoggedIn = localStorageService.get('loggedIn');
			// console.log(isLoggedIn);
			start();
		}
		function start() {
		if (vm.reviewShowing<=1) {
			vm.reviewShowing++;
		} else {
			vm.reviewShowing = 0;
		}
			vm.activeReview = reviewsArray[vm.reviewShowing];
 			$timeout(start, 4000);
		}
		vm.appStore = function(type){
			// console.log(type);
			if (type == 'android') {
				window.open("https://play.google.com/store/apps/details?id=incubee.android");
			} else {
				window.open("https://itunes.apple.com/ve/app/incubee/id1025315346?l=en&mt=8");
			}
		}

		vm.displayScreens = function(button) {
			if (button == 'profile') {

			} else if (button == 'messages') {

			}
		}
		  vm.hoveringOver = function(value) {
		    vm.overStar = value;
		    vm.percent = 100 * (value / vm.max);
		  };

		  vm.ratingStates = [
		    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
		    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
		    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
		    {stateOn: 'glyphicon-heart'},
		    {stateOff: 'glyphicon-off'}
		  ];
	}
})();