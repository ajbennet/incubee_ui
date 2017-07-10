(function() {
    'use strict';

    angular
        .module('app')
        .controller('SigninController', SigninController);

    SigninController.$inject = ['$http', '$state', 'SigninService', 'localStorageService', 'LoginFactory'];

    /* @ngInject */
    function SigninController($http, $state, SigninService, localStorageService, LoginFactory) {
        var vm = this;
        // vm.userId = '';

        activate();

        ////////////////

        function activate() {
            console.log("FIRING FIRST");
            if (localStorageService.get("loggedin") == true && localStorageService.get("investor") == true) {
                $state.go('/incubeesDisplayState');
                console.log("Currently Loggedin");
            } else if (localStorageService.get("loggedin") == true && localStorageService.get("investor") == false) {
                vm.incubeeId = localStorageService.get("incubeeId");
                $state.go('/incubeeDetailsState',{incubeeId: vm.incubee});
            } else {
                console.log("Not Loggedin");
            }
        }

        vm.signIn = function() {
            LoginFactory.login('loginPage');
        }

        vm.showCompany = function() {
            localStorageService.set('investor', false);
        }

    }
})();
