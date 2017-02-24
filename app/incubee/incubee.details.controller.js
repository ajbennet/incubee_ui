(function() {
    'use strict';

    angular
        .module('app')
        .controller('IncubeeDetailsController', IncubeeDetailsController);

    IncubeeDetailsController.$inject = ['$stateParams', '$window', 'InvestorService', 'IncubeeDetailsService', 'localStorageService'];

    /* @ngInject */
    function IncubeeDetailsController($stateParams, $window, InvestorService, IncubeeDetailsService, localStorageService) {
        var vm = this;
        vm.title = 'IncubeeDetailsController';
        vm.incubeeDetailsArray = [];
        vm.reviewTitle = "";
        vm.selectedRowIndex = "";
        vm.meeting = "";
        vm.reviewNamesArray = [];
        vm.investor;
        vm.ratingLabel;
        vm.selectedPerColor = "white";
        vm.selectedPhoColor = "white";

        activate();

        ////////////////

        function activate() {

            vm.investor = localStorageService.get('investor');
            console.log(vm.investor);

            InvestorService.getIncubeeById($stateParams.incubeeId).then(function(response) {

                vm.incubeeDetailsArray = response;
                console.log(vm.incubeeDetailsArray);
                if (vm.incubeeDetailsArray[1].data.reviews.length > 1) {
                    vm.ratingLabel = "ratings";
                } else {
                    vm.ratingLabel = "rating";
                }
                for (var i = 0; i < vm.incubeeDetailsArray[1].data.reviews.length; i++) {
                    console.log(vm.incubeeDetailsArray[1].data.reviews[i].user_id);

                    IncubeeDetailsService.getReviewers(vm.incubeeDetailsArray[1].data.reviews[i].user_id).then(function(response) {
                        console.log(response);
                        if (response.image_url == null) {

                            response.image_url = '/app/img/profilePlaceholder.jpg';
                        }
                        vm.reviewNamesArray.push(response);

                    });
                }
                console.log(vm.reviewNamesArray);

                console.log(vm.incubeeDetailsArray[0].data.images.length);

            });
        }

        vm.showCompanyWebsite = function(companyUrl) {
            window.open('http://' + companyUrl);
        }

        vm.meetingType = function(type) {

            if (type == "PHO") {
                vm.selectedPhoColor = '#07947a';
                vm.selectedPerColor = 'white';
            } else {
                vm.selectedPerColor = '#07947a';
                vm.selectedPhoColor = 'white';
            }
            vm.meeting = type;

            console.log(vm.meeting);

            console.log(vm.detailReviewStatus);

            console.log(vm.detailReviewRating);
        }

        vm.submitReview = function(title, description) {

            $window.location.reload();

            var uid = localStorageService.get("investor_id");
            var incubeeId = $stateParams.incubeeId;
            var rating = vm.detailReviewRating;
            var meeting = vm.meeting;
            var status = vm.detailReviewStatus;

            IncubeeDetailsService.submitReview(uid, title, description, incubeeId, rating, meeting, status).then(function(response) {
                console.log(response);
                console.log("THIS IS BEING RETURNED");
            });
        }
    }
})();
