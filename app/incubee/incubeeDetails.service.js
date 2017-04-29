(function() {
    'use strict';

    angular
        .module('app')
        .service('IncubeeDetailsService', IncubeeDetailsService);

    IncubeeDetailsService.$inject = ['$http', '$q'];

    function IncubeeDetailsService($http, $q) {
        this.func = func;

        ////////////////



        function func() {}

        this.submitReview = function(uid, title, description, incubeeId, rating, meeting, status) {

            var defer = $q.defer();

            return $http({
                method: 'POST',
                url: 'http://www.incub.ee/incubee/rest/v1.0/review',
                headers: {
                    'Content-Type': 'application/json',
                    'token': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImRhNjYyNWIzNmJjMDlkMzAwMzUzYjI4YTc0MWNlMTc1MjVhNGMzM2IifQ'
                },
                params: {
                    uid: uid
                },
                data: {
                    "title": title,
                    "description": description,
                    "incubee_id": incubeeId,
                    "rating": rating,
                    "meeting": meeting,
                    "status": status
                }
            }).then(function(response) {
                    console.log(response);
                    if (typeof response === 'object') {
                        defer.resolve(response);

                        return response;
                    } else {
                        defer.reject("No data here");
                    }

                },
                function(error) {
                    console.log(error);
                    console.log(defer);
                    defer.reject(error);
                    return error

                });
        }

        this.getReviewers = function(nameId) {

            return $http({
                method: 'GET',
                url: 'http://www.incub.ee/rest/v1.0/customer/details',
                params: {
                    'id': nameId
                }
            }).then(function(response) {
                console.log(response);
                return (response.data.customerList[0]);
            })

        }
    }
})();
