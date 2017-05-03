(function() {
	'use strict';

	angular
	  .module('app')
	  .factory('LoginFactory', LoginFactory);

	LoginFactory.$inject = ['$http', 'localStorageService', 'SigninService', '$state'];

	function LoginFactory($http, localStorageService, SigninService, $state) {
		var vm = this;
		vm.googleId = "";
		vm.loginStatus;
		return{
			login: function(page) {

	            var auth2 = gapi.auth2.getAuthInstance();
	            // Sign the user in, and then retrieve their ID.
	            auth2.signIn().then(function() {
	                var signinResponse = auth2.currentUser.get();
	                //Name
	                // console.log(signinResponse.w3.ig);
	                // //ID
	                // console.log(signinResponse.El);
	                // // vm.userId = response.El;
	                // //Image URL
	                // console.log(signinResponse.w3.Paa);
	                // //Email
	                // console.log(signinResponse.w3.U3);
	                // //Token
	                // console.log(signinResponse.Zi.id_token);
	                // //Entire Response
	                // console.log(signinResponse);

	                SigninService.signupUser(signinResponse.w3.ig, signinResponse.El, signinResponse.w3.Paa, signinResponse.w3.U3, signinResponse.Zi.id_token).then(function(response) {
	                    // console.log(response);
	                    vm.loginStatus = response.data.statusCode;
	                    if (vm.loginStatus == "SIGN_1004" || vm.loginStatus == "SIGN_1000") {
	                        SigninService.signinUser(response.config.data.name, response.config.data.id, response.config.data.image_url, response.config.data.email, response.config.data.token).then(function(response) {
	                            // console.log(response);
	                            localStorageService.set("incubeeId", response.data.servicedata.company_id);
	                            localStorageService.set("userGoogleInfo",response.config.data);
		                        localStorageService.set("name", response.config.data.name);
		                        localStorageService.set("loggedin", true);
	                            if (page == "loginPage") {
	                            	// console.log(signinResponse);
		                            localStorageService.set("investor_id", response.config.data.id);
		                            if (response.data.servicedata.user_type == "I") {
		                            	// console.log(response.data.servicedata.user_type);
										localStorageService.set('investor', true);
										$state.go('/incubeesDisplayState');
		                            } else {
		                            	localStorageService.set("investor", false);
		                            	if (vm.loginStatus == "SIGN_1000" || !response.data.servicedata.company_id) {
		                            		$state.go('/registerState');
		                            	} else {
		                            		$state.go('/incubeeDetailsState',{incubeeId: response.data.servicedata.company_id});
		                            	}
		                            }
		                            localStorageService.set("incubeeId", response.data.servicedata.company_id);
	                            } else if (page == "registerPage") {
	                            	$state.go('/incubeeDetailsState',{incubeeId: response.data.servicedata.company_id});
	                            }

	                        })
	                    }
	                })
	            });
	        }
		}

	}
})();