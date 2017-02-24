(function() {
	'use strict';

	angular
	  .module('app')
	  .controller('TopNavController', TopNavController);

	TopNavController.$inject = ['$http', 'localStorageService', '$state'];

	function TopNavController($http, localStorageService, $state) {
		var vm = this;
		vm.name;
		vm.homeDestination;
		
        activate();

        ////////////////

        function activate() {
        	vm.name = localStorageService.get('name');
        	if (localStorageService.get('investor') == false) {
        		vm.homeDestination = "/incubeeDetailsState({incubeeId: 'inc_952745e0-ea2e-4365-83b3-cd379072ce57'})";
        	} else {
        		vm.homeDestination = "/incubeesDisplayState";
        	}
        }

		vm.logout = function() {
	        localStorageService.set("investor_id", null);
	        localStorageService.set("loggedin", false);
	        localStorageService.set("name", null);
	        localStorageService.set('investor', null);
	        $state.go('/signinState');
     	}
	}
})();