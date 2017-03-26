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
        	var companyId = localStorageService.get('incubeeId');
        	vm.name = localStorageService.get('name');
        	if (localStorageService.get('investor') == false) {
        		vm.homeDestination = "/incubeeDetailsState({incubeeId:" + companyId +"})";
        	} else {
        		vm.homeDestination = "/incubeesDisplayState";
        	}
        }

		vm.logout = function() {
			localStorageService.set("userGoogleInfo", null);
	        localStorageService.set("investor_id", null);
	        localStorageService.set("loggedin", false);
	        localStorageService.set("name", null);
	        localStorageService.set('investor', null);
	        localStorageService.set('incubeeId', null);
	        $state.go('/signinState');
     	}
	}
})();