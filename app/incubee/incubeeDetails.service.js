(function() {
    'use strict';

    angular
        .module('app')
        .service('IncubeeDetailsService', IncubeeDetailsService);

    IncubeeDetailsService.$inject = ['$http', '$q', 'envService'];

    function IncubeeDetailsService($http, $q, envService) {
        this.func = func;
        var apiRequest = envService.read('apiUrl');

        ////////////////



        function func() {}

        this.submitReview = function(uid, title, description, incubeeId, rating, meeting, status) {

            var defer = $q.defer();

            console.log(title+ description+ rating+ meeting+ status);
            if (title == null || description == null || rating == null || meeting == "" || status == null) {
                alert("Please check that you have correctly filled out all of the fields");
            } else {
                return $http({
                    method: 'POST',
                    url: apiRequest+'/v1.0/review',
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
                        // console.log(response);
                        if (typeof response === 'object') {
                            defer.resolve(response);

                            return response;
                        } else {
                            defer.reject("No data here");
                        }

                    },
                    function(error) {
                        // console.log(error);
                        // console.log(defer);
                        defer.reject(error);
                        return error

                    });
            }
        }

        this.getReviewers = function(reviews) {

            var defer = $q.defer();
            var promises = [];
            angular.forEach(reviews, function(review){
                var promise = $http({
                    url   : apiRequest + '/v1.0/customer/details',
                    method: 'GET',
                    params: {
                        'id': review.user_id
                    }
                });
                promises.push(promise);
            })
                return $q.all(promises);

            // return $http({
            //     method: 'GET',
            //     url: apiRequest + '/v1.0/customer/details',
            //     params: {
            //         'id': nameId
            //     }
            // }).then(function(response) {
            //     $q.all(promises).then(function(result){
            //         console.log(result);
            //     })
            // })

        }

        this.deleteReview = function(userId, reviewId) {
            var defer = $q.defer();

            return $http({
                method: 'DELETE',
                url: apiRequest + '/v1.0/review',
                headers:{
                    'token' : 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImRhNjYyNWIzNmJjMDlkMzAwMzUzYjI4YTc0MWNlMTc1MjVhNGMzM2IifQ'
                },
                params:{
                    review_id: reviewId,
                    uid: userId
                }
            }).then(function(response){
                console.log(response);
                if (typeof response === 'object') {
                        defer.resolve(response);

                        return response;
                    } else {
                        defer.reject("No data here");
                    }

                },
                function(error) {
                    // console.log(error);
                    // console.log(defer);
                    defer.reject(error);
                    return error

                });
                
        }

        this.editReview = function(userId, reviewId, title, description, incubeeId, rating, meeting, status){

            var defer = $q.defer();

            return $http({
                method: 'PUT',
                url: apiRequest + '/v1.0/review?uid='+userId+'&review_id='+reviewId,
                headers: {
                    'Content-Type': 'application/json',
                    'token' : 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImRhNjYyNWIzNmJjMDlkMzAwMzUzYjI4YTc0MWNlMTc1MjVhNGMzM2IifQ'
                },
                data:{
                    "title": title,
                    "description": description,
                    "incubee_id": incubeeId,
                    "rating": rating,
                    "meeting": meeting,
                    "status": status
                }
            }).then(function(response){

                if (typeof response === 'object') {
                        console.log(response);
                        defer.resolve(response);

                        return response;
                    } else {
                        console.log(response);
                        defer.reject("No data here");
                    }

                },
                function(error) {
                    console.log(error);
                    console.log(defer);
                    defer.reject(error);
                    return error

                })
        }
    }
})();
