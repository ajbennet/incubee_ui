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
            return $http({
                method: 'GET',
                url: 'http://www.incub.ee/rest/v1.0/' + 'inc_19932556-6581-42ca-af22-074c4811fea0'
            }).then(function(response) {
                return response;
            })
        }

        this.signupCompany = function(name, url, highConcept, images, description, twitter, video, location, founder, field, status, funding){
            return $http({
                method: 'POST',
                url: 'http://www.incub.ee/rest/v1.0/handle',
                data: {
                    company_name : name,
                    company_url : url,
                    images: images,
                    high_concept : highConcept,
                    description : description,
                    twitter_url : twitter,
                    video_url : video,
                    location : location,
                    founder : founder,
                    field : field,
                    project_status : status,
                    funding : funding
                }
            }).then(function(response){
                console.log(response);
                return response;
            })
        }

        this.postImage = function(image){

            var defer = $q.defer();

            return $http({
                method: 'POST',
                url: 'http://www.incub.ee/rest/v1.0/handle',
                headers: {
                    'Content-Type': 'application/json',
                    'token': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImRhNjYyNWIzNmJjMDlkMzAwMzUzYjI4YTc0MWNlMTc1MjVhNGMzM2IifQ'
                },
                data:{
                    company_name:"TEST"
                }
            }).then(function(response){
                if (typeof response === 'object') {
                        defer.resolve(response);

                        return response;
                    } else {
                        defer.reject("No Data Here!");
                    }

                },
                function(error) {
                    console.log(error);
                    console.log(defer);
                    defer.reject(error);

                });
        }
    }
})();
