(function() {
    'use strict';

    angular
        .module('app')
        .service('InvestorService', InvestorService);

    InvestorService.$inject = ['$http', '$q', 'envService'];

    /* @ngInject */
    function InvestorService($http, $q, envService) {
        this.func = func;
        var apiRequest = envService.read('apiUrl');

        ////////////////

        function func() {}

        //Gets all of the incubee id's that the investor has liked
        this.getAllUserLikes = function(investor_id) {

            var URL = apiRequest + "/v1.0/like"

            return $http({
                method: 'GET',
                url: URL,
                params: {
                    //Using this id for testing
                    id: investor_id
                }
            }).then(function(response) {
                return response;
            });
        }

        //Gets all of the incubee details and reviews
        this.getIncubeeById = function(incubeeId) {

            var defer = $q.defer();

            var incubeeDetailURL = apiRequest + "/v1.0/" + incubeeId;
            var incubeeReviewURL = apiRequest + "/v1.0/review/" + incubeeId;
            // var reviewsURL = "http://www.incub.ee/incubee/rest/v1.0/review/" + incubeeId;

            http://www.qa.incub.ee/rest

            var getIncubeeDetails = $http({
                method: 'GET',
                url: incubeeDetailURL
            });

            var getIncubeeReviews = $http({
                method: 'GET',
                url: incubeeReviewURL
            });

            //Returns them together
            console.log(getIncubeeDetails);
            return $q.all([getIncubeeDetails, getIncubeeReviews]).then(function(results) {
                return results;
            })
        }

        //Gets all of the reviews for the selected incubee
        this.getReviews = function(incubeeId) {

            var incubeeURL = apiRequest + "/v1.0/review/" + incubeeId;
            // var reviewsURL = "http://www.incub.ee/incubee/rest/v1.0/review/" + incubeeId;

            return $http({
                method: 'GET',
                url: incubeeURL
            }).then(function(reviews) {
                return reviews;
            })
        }

        //Gets the user information for a users Id
        this.getUserById = function(userId) {

            var userURL = apiRequest + '/v1.0/customer/details';

            return $http({
                method: 'GET',
                url: userURL,
                params: {
                    id: userId
                }
            }).then(function(userDetails) {
                return userDetails;
            })
        }

    }
})();
