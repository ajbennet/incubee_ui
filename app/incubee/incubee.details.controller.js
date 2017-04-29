(function() {
    'use strict';

    angular
        .module('app')
        .controller('IncubeeDetailsController', IncubeeDetailsController);

    IncubeeDetailsController.$inject = ['$stateParams', '$window', 'InvestorService', 'IncubeeDetailsService', 'localStorageService', '$state'];

    /* @ngInject */
    function IncubeeDetailsController($stateParams, $window, InvestorService, IncubeeDetailsService, localStorageService, $state) {
        var vm = this;
        vm.title = 'IncubeeDetailsController';
        vm.incubeeDetailsArray = [];
        vm.reviewTitle = "";
        vm.selectedRowIndex = "";
        vm.meeting = "";
        vm.reviewNamesArray = [];
        vm.video;
        vm.trimmedUrl;

        // FOR INVEST
        // vm.investor = true;

        // FOR FOUNDER
        vm.investor;


        vm.rating = 0;
        vm.selectedPerColor = "white";
        vm.selectedPhoColor = "white";
        vm.incubeeId;
        vm.hasVideo;
        vm.userRating = 0;

        activate();

        ////////////////

        function activate() {
            if (localStorageService.get("loggedin") == true) {
                vm.incubeeId = localStorageService.get('incubeeId');



                // FOR FOUNDER
                vm.investor = localStorageService.get('investor');




                console.log(vm.investor);
                InvestorService.getIncubeeById($stateParams.incubeeId).then(function(response) {

                    vm.incubeeDetailsArray = response;
                    console.log(vm.incubeeDetailsArray);
                    if (vm.incubeeDetailsArray[0].data.video != null) {
                        vm.hasVideo = false;
                    } else {
                        vm.hasVideo = true;
                    }
                    vm.video = vm.incubeeDetailsArray[0].data.video;
                    videoId.load();
                    vm.rating = vm.incubeeDetailsArray[1].data.reviewData.averageRating
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

                    console.log(vm.incubeeDetailsArray[0].data.images);

                });
            } else {
                console.log("You are not logged in");
                $state.go('/signinState');
            }
        }

        vm.showCompanyWebsite = function(companyUrl) {
            window.open('http://'+companyUrl);
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

        vm.onItemRating = function(rating) {
            vm.userRating = rating;
            console.log(vm.userRating);
        }

        vm.submitReview = function(title, description) {

            var uid = localStorageService.get("investor_id");
            var incubeeId = $stateParams.incubeeId;
            var rating = vm.userRating;
            var meeting = vm.meeting;
            var status = vm.detailReviewStatus;

            IncubeeDetailsService.submitReview(uid, title, description, incubeeId, rating, meeting, status).then(function(response) {
                console.log(response);
                if (response.status == 409) {
                    alert(response.data.statusMessage)
                } else {
                $window.location.reload();
                console.log("THIS IS BEING RETURNED");
            }
            });
        }
    }
})();
