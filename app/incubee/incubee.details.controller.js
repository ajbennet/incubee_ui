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
        vm.editingIndex;
        vm.originalReview;
        vm.originalReviewTitle;
        vm.notEditing = true;

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
        vm.uid = '';

        vm.meetingTypeArray = ["PHO", "PER"];

        vm.statusArray = [{title: "Invested", value: "INV"},{title: "Interested", value:"INT"}, {title: "Passed", value:"PAS"}];

        vm.fakeArray = [100262006902753805443,100262006902753805448,100262006902753805441,1002620069027538054489,100262006902753805444,100262006902753805442];

        activate();

        ////////////////

        function activate() {
            if (localStorageService.get("loggedin") == true) {
                vm.incubeeId = localStorageService.get('incubeeId');
                vm.uid = localStorageService.get("investor_id");


                // FOR INVESTOR
                // vm.investorId = 100262006902753805448;

                // FOR FOUNDER
                vm.investor = localStorageService.get('investor');
                vm.investorId = localStorageService.get('investor_id');




                // console.log(vm.investor);
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
                    if (vm.incubeeDetailsArray[1].data.reviewData != null){
                        vm.rating = vm.incubeeDetailsArray[1].data.reviewData.averageRating
                    }
                    vm.incubeeDetailsArray[1].data.reviews.sort(compare);
                    if (vm.incubeeDetailsArray[1].data) {
                        IncubeeDetailsService.getReviewers(vm.incubeeDetailsArray[1].data.reviews).then(function(response) {
                                vm.reviewNamesArray = response;
                        });
                    }

                });
            } else {
                // console.log("You are not logged in");
                $state.go('/signinState');
            }
        }

        function compare(a,b) {
          if (a.date > b.date)
            return -1;
          if (a.date < b.date)
            return 1;
          return 0;
        }

        vm.showCompanyWebsite = function(companyUrl) {
            window.open('http://'+companyUrl);
        }

        vm.meetingType = function(type) {

            // if (type == "PHO") {
            //     vm.selectedPhoColor = '#07947a';
            //     vm.selectedPerColor = 'white';
            // } else {
            //     vm.selectedPerColor = '#07947a';
            //     vm.selectedPhoColor = 'white';
            // }
            vm.meeting = type;

            console.log(vm.meeting);

            // console.log(vm.detailReviewStatus);

            // console.log(vm.detailReviewRating);
        }

        vm.onItemRating = function(rating) {
            vm.userRating = rating;
            // console.log(vm.userRating);
        }

        vm.submitReview = function(title, description) {

            var incubeeId = $stateParams.incubeeId;
            var rating = vm.userRating;
            var meeting = vm.meeting;
            var status = vm.detailReviewStatus;


            IncubeeDetailsService.submitReview(vm.uid, title, description, incubeeId, rating, meeting, status).then(function(response) {
                // console.log(response);
                if (response.status == 409) {
                    alert(response.data.statusMessage)
                } else {
                $window.location.reload();
                // console.log("THIS IS BEING RETURNED");
            }
            });
        }

        vm.editReview = function(review) {
            vm.editing = false;
            if (vm.editingIndex) {
                document.getElementById("userReview"+vm.editingIndex).contentEditable = "false"
                document.getElementById("userReviewTitle"+vm.editingIndex).contentEditable = "false"
            }
            vm.detailReviewStatus = vm.incubeeDetailsArray[1].data.reviews[review].status;
            vm.meetingType = vm.incubeeDetailsArray[1].data.reviews[review].meeting;
            vm.userRating = vm.incubeeDetailsArray[1].data.reviews[review].rating;
            document.getElementById("userReview"+review).contentEditable = "true"
            document.getElementById("userReview"+review).focus();
            vm.originalReview = document.getElementById("userReview"+review).innerHTML;
            document.getElementById("userReviewTitle"+review).contentEditable = "true"
            vm.originalReviewTitle = document.getElementById("userReviewTitle"+review).innerHTML;
            vm.editingIndex = review;
        }

        vm.cancelReviewEdit = function() {
            vm.editing = true;
            document.getElementById("userReview"+vm.editingIndex).innerHTML = vm.originalReview;
            document.getElementById("userReview"+vm.editingIndex).contentEditable = "false"
            document.getElementById("userReviewTitle"+vm.editingIndex).innerHTML = vm.originalReviewTitle;
            document.getElementById("userReviewTitle"+vm.editingIndex).contentEditable = "false"
            vm.editingIndex = null;
        }

        vm.updateReview = function(reviewId, rating, meeting, status, incubeeId) {
            
            console.log("REVIEWID" + incubeeId);
            var title = document.getElementById("userReviewTitle"+vm.editingIndex).innerHTML;
            var description = document.getElementById("userReview"+vm.editingIndex).innerHTML;
            document.getElementById("userReview"+vm.editingIndex).contentEditable = "false"
            document.getElementById("userReviewTitle"+vm.editingIndex).contentEditable = "false"
            console.log(description);
            if (title == "" || description == "" || vm.userRating == 0 || meeting == "" || status == null) {
                if (vm.userRating == 0) {
                    alert("you are not allowed to have a rating of 0")
                } else {
                    alert("Please check that the fields are filled our correctly");
                }
            } else {
                IncubeeDetailsService.editReview(vm.uid, reviewId, title, description, incubeeId, vm.userRating, meeting, status).then(function(response){
                    console.log(response);
                    vm.editing = true;
                    vm.editingIndex = null;
                    // $window.location.reload();
                })
            }
        }

        vm.deleteReview = function(index){
            var reviewId = vm.incubeeDetailsArray[1].data.reviews[index].review_id;
            var userId = vm.incubeeDetailsArray[1].data.reviews[index].user_id;
            IncubeeDetailsService.deleteReview(userId, reviewId).then(function(response){
                console.log(response);
                $window.location.reload();
            })
        }
    }
})();
