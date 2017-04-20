(function() {
	'use strict';

	angular
	  .module('app')
	  .controller('HomePageController', HomePageController);

	HomePageController.$inject = ['localStorageService'];

	function HomePageController(localStorageService) {
		var vm = this;
		var isLoggedIn;
		activate();

		function activate(){
			var isLoggedIn = localStorageService.get('loggedIn');
			console.log(isLoggedIn);
		}
		vm.appStore = function(type){
			console.log(type);
			if (type == 'android') {
				window.open("https://play.google.com/store/apps/details?id=incubee.android");
			} else {
				window.open("https://itunes.apple.com/ve/app/incubee/id1025315346?l=en&mt=8");
			}
		}
	}
})();