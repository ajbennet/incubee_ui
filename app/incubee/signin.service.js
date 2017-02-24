(function() {
    'use strict';

    angular
        .module('app')
        .service('SigninService', SigninService);

    SigninService.$inject = ['$http'];

    function SigninService($http) {
        this.func = func;

        ////////////////

        function func() {}

        this.signupUser = function(name, id, imageUrl, email, token) {
            var URL = 'http://www.incub.ee/rest/v1.0/signup';

            return $http({
                method: 'POST',
                url: URL,
                data: {
                    "name": name,
                    "id": id,
                    "image_url": imageUrl,
                    "email": email,
                    "token": token
                }
            }).then(function(response) {
                return response;
            }, function errorCallback(response) {
                console.log(response);
                return response;
                alert(response.data.statusMessage);
            });
        }

        this.signinUser = function(name, id, imageUrl, email, token) {
            var URL = 'http://www.incub.ee/rest/v1.0/login';

            return $http({
                method: 'POST',
                url: URL,
                data: {
                    "name": name,
                    "id": id,
                    "image_url": imageUrl,
                    "email": email,
                    "token": token
                }
            }).then(function(response) {
                return response;
            });

        }

    }
})();
