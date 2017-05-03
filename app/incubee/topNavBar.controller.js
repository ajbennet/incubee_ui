(function() {
    'use strict';

    angular
        .module('app')
        .controller('TopNavController', TopNavController);

    TopNavController.$inject = ['$http', 'localStorageService', '$state', '$window', 'LoginFactory'];

    function TopNavController($http, localStorageService, $state, $window, LoginFactory) {
        var vm = this;
        vm.name;
        vm.userImage;
        vm.homeDestination;
        vm.login;
        vm.login == "Login";
        vm.showNavImg;
        vm.signin = false;
        vm.loginTitle;
        activate();

        ////////////////

        function activate() {
            var l = window.localStorage;
            // console.log(l)
            if (localStorageService.get('loggedin') == false || l.length == 0) {
                vm.login = "Login"
                vm.showNavImg = false;
                // console.log("LOGIN");

            } else {
                vm.login = "Logout"
                // console.log("LOGOUT");
                vm.showNavImg = true;
                var companyId = localStorageService.get('incubeeId');
                vm.name = localStorageService.get('name');
                vm.userImage = localStorageService.get('userGoogleInfo').image_url;
                if (localStorageService.get('investor') == false) {
                    vm.homeDestination = "/incubeeDetailsState/" + companyId;
                } else {
                    vm.homeDestination = "/incubeesDisplayState";
                }
            }
        }

        vm.logoutClick = function(){
        	vm.modalModel.modal('show');
        }

        vm.logout = function() {
            if (vm.login == "Logout") {
                localStorageService.set("userGoogleInfo", null);
                localStorageService.set("investor_id", null);
                localStorageService.set("loggedin", false);
                localStorageService.set("name", null);
                localStorageService.set('investor', null);
                localStorageService.set('incubeeId', null);
                $window.location.reload();
                $state.go('/homePageState');
            } else {
            	$state.go('/signinState');
            }
        }

        vm.viewProfile = function(){
            // console.log("GO");


            // FOR FOUNDER
            if (localStorageService.get('investor') == false) {
                $state.go('/incubeeDetailsState',{incubeeId: localStorageService.get('incubeeId')});
            } else {
                $state.go("/incubeesDisplayState");
            }


            // FOR INVEST
            // $state.go("/incubeesDisplayState");

            
        }

        vm.signIn = function() {
            LoginFactory.login('loginPage');
        }

        vm.loginOutButtonPress = function(){
            if (vm.login == "Logout") {
            vm.signin = true;
            vm.loginTitle = "Logout?";
        } else {
            vm.loginTitle = "Sign in"
        }
        }
    }
})();
