(function() {
    'use strict';

    angular
        .module('app')
        .service('CompanyService', CompanyService);

    CompanyService.$inject = ['$http', '$q'];

    function CompanyService($http, $q) {
        this.func = func;

        function func() {}

        this.getCompanyInfo = function(incubeeId) {
            console.log(incubeeId);
            return $http({
                method: 'GET',
                url: 'http://www.incub.ee/rest/v1.0/' + incubeeId
            }).then(function(response) {
                console.log(response);
                return response;
            })
        }

        this.signupCompany = function(data){

        //     var fd = new FormData();
        // for(var key in data)
        //     fd.append(key, data[key]);
        // $http.post('http://www.incub.ee/rest/v1.0/handle', fd, {
        //     transformRequest: angular.indentity,
        //     headers: { 'Content-Type': undefined }
        // });
            var defer = $q.defer();
            console.log(data);

            var fd = new FormData();
            for(var key in data)
                fd.append(key,data[key]);
            return $http.post('http://www.incub.ee/rest/handle', fd, {
                transformRequest: angular.identity,
                headers:{'Content-Type': undefined}
            }).then(function(response){
                // if (typeof response === 'object') {
                //         defer.resolve(response);

                //         return response;
                //     } else {
                //         defer.reject("No Data Here!");
                //     }

                // },
                // function(error) {
                //     console.log(error);
                //     console.log(defer);
                //     defer.reject(error);
                    console.log(response);
                    return response;
                });

            // $http({
            //     method:'POST',
            //     url: 'http://www.incub.ee/rest/v1.0/handle', fd,
            //     transformRequest: angular.identity,
            //     headers:{ 'Content-Type':undefined}
            // }).
            // success(function(data, status, headers, config){
            //     defer.resolve(data);
            //     console.log(defer.resolve(data));
            // }).
            // error(function(data, status, headers, config){
            //     defer.reject(status);
            //     console.log(defer.reject(status));
            // });
            // return deferred.promise
                    
        }

        this.postImage = function(message){

            var defer = $q.defer();
            console.log(token);

            // $http({
            //     method:'POST',
            //     url: 'http://www.incub.ee/rest/v1.0/handle',
            //     data: message,
            //     transformRequest: formDataObject,
            //     headers:{ 'Content-Type':undefined}
            // }).
            // success(function(data, status, headers, config){
            //     defer.resolve(data);
            // }).
            // error(function(data, status, headers, config){
            //     defer.reject(status);
            // });
            // return deferred.promise

            // return $http({
            //     method: 'POST',
            //     url: 'http://www.incub.ee/rest/v1.0/handle',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'token': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImRhNjYyNWIzNmJjMDlkMzAwMzUzYjI4YTc0MWNlMTc1MjVhNGMzM2IifQ'
            //     },
            //     data:{
            //         company_name:"TEST",
            //         token:token
            //         // id:100262006902753805448
            //     }
            // }).then(function(response){
            //     if (typeof response === 'object') {
            //             defer.resolve(response);

            //             return response;
            //         } else {
            //             defer.reject("No Data Here!");
            //         }

            //     },
            //     function(error) {
            //         console.log(error);
            //         console.log(defer);
            //         defer.reject(error);

            //     });
        }
    }
})();
