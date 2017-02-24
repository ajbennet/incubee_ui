(function() {
    'use strict';

    angular
        .module('app')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$http', 'localStorageService', '$stateParams', 'CompanyService', '$state'];

    function SignupController($http, localStorageService, $stateParams, CompanyService, $state) {
        var vm = this;
        vm.imageFile;
        vm.imagesFile;
        vm.investor;
        vm.incubeeDetails;
        vm.startupPhaseOptions = ["Ideation", "Work-in-progress", "Just-launched", "Launched-with-customers"];
        vm.seekFundingOptions = ["Yes", "No"];
        vm.uploadButtonText;
        vm.imagesChosen;
        var imageShow;
        activate();

        function activate() {

            vm.investor = localStorageService.get('investor');
            if (vm.investor == false) {
                vm.uploadButtonText = "Save";
                CompanyService.getCompanyInfo($stateParams.incubeeId).then(function(response) {
                    console.log(response);
                    vm.companyName = response.data.company_name;
                    vm.companyUrl = response.data.company_url;
                    vm.highConcept = response.data.high_concept;
                    vm.description = response.data.description;
                    vm.twitterUrl = response.data.twitter_url;
                    vm.videoUrl = response.data.video_url;
                    vm.location = response.data.location;
                    vm.founderInfo = response.data.founder;
                    vm.field = response.data.field;
                    vm.phase = response.data.project_status;
                    if (response.data.funding == true) {
                        var fundingIndex = "Yes";
                    } else {
                        var fundingIndex = "No";
                    }
                    console.log(fundingIndex);
                    vm.funding = fundingIndex;
                });
                vm.cancelDestination = "/incubeeDetailsState({incubeeId: 'inc_952745e0-ea2e-4365-83b3-cd379072ce57'})";
            } else {
                vm.cancelDestination = '/signinState';
                vm.uploadButtonText = "Signup Company";
            }
        }

        vm.signupIncubee = function(name, url, logo, highConcept, description, twitter, video, location, founderInfo, field, phase, funding) {
            //console.log(name + " / " + url + " / " + logo + " / " + highConcept + " / " + description + " / " + twitter + " / " + video + " / " + location + " / " + founderInfo + " / " + field + " / " + phase + " / " + funding);
            // CompanyService.postImage(imageShow).then(function(res){
                // console.log(res);
                $state.go("/incubeeDetailsState", {incubeeId: 'inc_952745e0-ea2e-4365-83b3-cd379072ce57'});
            // });
            console.log(imageShow);
        }

        vm.uploadMultipleFiles = function(event) {
            vm.imagesFile = event.target.files;
            var preview = document.querySelector('#signupImagepreview');

            function readAndPreview(file) {
                imageShow = file;
                console.log(file);
                console.log('show hide');
                // Make sure `file.name` matches our extensions criteria
                if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                    var reader = new FileReader();

                    reader.addEventListener("load", function() {
                        var image = new Image();
                        image.style.maxHeight = '15em';
                        image.style.maxWidth = '30em';
                        image.title = file.name;
                        image.id = "companyImage"
                        image.src = this.result;
                        imageShow = image;
                        preview.appendChild(image);
                    }, false);

                    
                    reader.readAsDataURL(file);
                }
            }

            if (vm.imagesFile) {
                [].forEach.call(vm.imagesFile, readAndPreview);
            }
        }
    }

})();
