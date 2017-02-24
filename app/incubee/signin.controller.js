(function() {
    'use strict';

    angular
        .module('app')
        .controller('SigninController', SigninController);

    SigninController.$inject = ['$http', '$state', 'SigninService', 'localStorageService'];

    /* @ngInject */
    function SigninController($http, $state, SigninService, localStorageService) {
        var vm = this;
        vm.userId = '';

        activate();

        ////////////////

        function activate() {


        }

        vm.signUp = function() {

            var auth2 = gapi.auth2.getAuthInstance();
            // Sign the user in, and then retrieve their ID.
            auth2.signIn().then(function() {
                var response = auth2.currentUser.get();
                //Name
                console.log(response.w3.ig);
                //ID
                console.log(response.El);
                //Image URL
                console.log(response.w3.Paa);
                //Email
                console.log(response.w3.U3);
                //Token
                console.log(response.Zi.id_token);
                //Entire Response
                console.log(response);

                SigninService.signupUser(response.w3.ig, response.El, response.w3.Paa, response.w3.U3, response.Zi.id_token).then(function(response) {
                    console.log(response);
                    if (response.data.statusCode == "SIGN_1004") {
                        vm.signIn();
                    }

                })
            });
        }

        vm.signIn = function() {

            var auth2 = gapi.auth2.getAuthInstance();
            // Sign the user in, and then retrieve their ID.
            auth2.signIn().then(function() {
                var response = auth2.currentUser.get();
                //Name
                console.log(response.w3.ig);
                //ID
                console.log(response.El);
                vm.userId = response.El;
                //Image URL
                console.log(response.w3.Paa);
                //Email
                console.log(response.w3.U3);
                //Token
                console.log(response.Zi.id_token);
                //Entire Response
                console.log(response);

                SigninService.signinUser(response.w3.ig, response.El, response.w3.Paa, response.w3.U3, response.Zi.id_token).then(function(response) {
                    console.log(response);
                    localStorageService.set("name", response.config.data.name);
                    localStorageService.set("investor_id", vm.userId);
                    localStorageService.set("loggedin", true);
                    localStorageService.set("investor", true);
                    $state.go('/incubeesDisplayState');

                })
            });
        }

        vm.showCompany = function() {
            localStorageService.set('investor', false);
        }

    }
})();
