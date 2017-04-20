(function() {
	'use strict';

	angular
	  .module('app')
	  .factory('LoginFactory', LoginFactory);

	LoginFactory.$inject = ['$http', 'localStorageService', 'SigninService', '$state'];

	function LoginFactory($http, localStorageService, SigninService, $state) {
		var vm = this;
		vm.googleId = "";
		return{
			login: function(page) {

	            var auth2 = gapi.auth2.getAuthInstance();
	            // Sign the user in, and then retrieve their ID.
	            auth2.signIn().then(function() {
	                var response = auth2.currentUser.get();
	                //Name
	                console.log(response.w3.ig);
	                //ID
	                console.log(response.El);
	                // vm.userId = response.El;
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
	                        SigninService.signinUser(response.config.data.name, response.config.data.id, response.config.data.image_url, response.config.data.email, response.config.data.token).then(function(response) {
	                            console.log(response);
	                            localStorageService.set("userGoogleInfo",response.config.data);
		                        localStorageService.set("name", response.config.data.name);
		                        localStorageService.set("loggedin", true);
	                            if (page == "loginPage") {
		                            localStorageService.set("investor_id", response.config.data.id);
		                            if (response.data.servicedata.user_type == "I") {
		                            	console.log(response.data.servicedata.user_type);
										localStorageService.set('investor', true);
										$state.go('/incubeesDisplayState');
		                            } else {
		                            	localStorageService.set("investor", false);
		                            	localStorageService.set("incubeeId", response.data.servicedata.company_id);
		                            	$state.go('/incubeeDetailsState',{incubeeId: response.data.servicedata.company_id});
		                            }
	                            } else {
	                            	console.log("done");
	                            }

	                        })
	                    }

	                })
	            });
	        }
		}

	}
})();