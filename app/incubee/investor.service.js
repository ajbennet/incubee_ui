(function() {
    'use strict';

    angular
        .module('app')
        .service('InvestorService', InvestorService);

    InvestorService.$inject = ['$http', '$q'];

    /* @ngInject */
    function InvestorService($http, $q) {
        this.func = func;

        ////////////////

        function func() {}

        //Gets all of the incubee id's that the investor has liked
        this.getAllUserLikes = function(investor_id) {

            var URL = "http://www.incub.ee/rest/v1.0/like"

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

            var incubeeURL = "http://www.incub.ee/rest/v1.0/" + incubeeId;
            var reviewsURL = "http://www.incub.ee/incubee/rest/v1.0/review/" + incubeeId;

            var getIncubeeDetails = $http({
                method: 'GET',
                url: incubeeURL
            });

            var getIncubeeReviews = $http({
                method: 'GET',
                url: reviewsURL
            });

            //Returns them together
            return $q.all([getIncubeeDetails, getIncubeeReviews]).then(function(results) {
                return results;
            })
        }

        //Gets all of the reviews for the selected incubee
        this.getReviews = function(incubeeId) {

            var reviewsURL = "http://www.incub.ee/incubee/rest/v1.0/review/" + incubeeId;

            return $http({
                method: 'GET',
                url: reviewsURL
            }).then(function(reviews) {
                return reviews;
            })
        }

        //Gets the user information for a users Id
        this.getUserById = function(userId) {

            var userURL = 'http://www.incub.ee/rest/v1.0/customer/details';

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
