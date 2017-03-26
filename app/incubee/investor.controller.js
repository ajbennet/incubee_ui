(function() {
    'use strict';

    angular
        .module('app')
        .controller('InvestorController', InvestorController);

    InvestorController.$inject = ["InvestorService", '$window', 'localStorageService', '$state'];

    /* @ngInject */
    function InvestorController(InvestorService, $window, localStorageService, $state) {
        var vm = this;
        vm.title = 'InvestorController';
        vm.customersArray = [];
        vm.sortType = "company_name";

        activate();

        ////////////////

        function activate() {
            if (localStorageService.get("loggedin") == true) {
                //Gets an array of all incubee id's the investor has liked in the past
                InvestorService.getAllUserLikes(localStorageService.get("investor_id")).then(function(response) {

                    //Loops through the array of incubee Id's and gets their details
                    for (var i = 0; i < response.data.incubeeList.length; i++) {
                        InvestorService.getIncubeeById(response.data.incubeeList[i]).then(function(incubeeResponse) {

                            //Checks if the incubee is still in the database
                            if (incubeeResponse[0].data !== "") {
                                var fullDescriptionString = incubeeResponse[0].data.description;
                                var trimmedDescriptionString = fullDescriptionString.replace(/(([^\s]+\s\s*){20})(.*)/, "$1…");
                                console.log(trimmedDescriptionString);
                                //Checks if the incubee has reviews and adds them to an array
                                if (incubeeResponse[1].data.reviewData != null) {
                                    vm.customersArray.push({ incubeeDetails: incubeeResponse[0], incubeeDescription: trimmedDescriptionString, averageRating: incubeeResponse[1].data.reviewData.averageRating, numberOfRatings: incubeeResponse[1].data.reviewData.noOfRatings });
                                } else {
                                    //If the incubee has no reviews default set is 0
                                    vm.customersArray.push({ incubeeDetails: incubeeResponse[0], incubeeDescription: trimmedDescriptionString, averageRating: 0, numberOfRatings: 0 });
                                }
                                console.log(vm.customersArray);
                            }
                        });

                    }

                })
            } else {
                console.log("You are not logged in");
                $state.go('/signinState');
            }
        }
    }
})();
