(function() {
    'use strict';

    angular
        .module('app')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$http', 'localStorageService', '$stateParams', 'CompanyService', '$state', 'LoginFactory'];

    function SignupController($http, localStorageService, $stateParams, CompanyService, $state, LoginFactory) {
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
        vm.incubeeId;

        vm.company = {};

        activate();

        function activate() {
            vm.investor = localStorageService.get('investor');
            if (vm.investor == false) {
                vm.incubeeId = localStorageService.get('incubeeId');
                vm.uploadButtonText = "Save";
                CompanyService.getCompanyInfo(localStorageService.get('incubeeId')).then(function(response) {
                    console.log(response);
                    vm.company.company_name = response.data.company_name;
                    vm.company.url = response.data.company_url;
                    vm.company.highConcept = response.data.high_concept;
                    vm.company.description = response.data.description;
                    vm.company.twitterUrl = response.data.twitter_url;
                    vm.company.videoUrl = response.data.video_url;
                    vm.company.location = response.data.location;
                    vm.company.founderInfo = response.data.founder;
                    vm.company.field = response.data.field;
                    vm.company.phase = response.data.project_status;
                    // vm.comapany.id = "inc_a817515d-416f-4822-b6dd-a603b996e9a2";
                    if (response.data.funding == true) {
                        var fundingIndex = "Yes";
                    } else {
                        var fundingIndex = "No";
                    }
                    console.log(fundingIndex);
                    vm.company.funding = fundingIndex;
                });
                // vm.cancelDestination = "/incubeeDetailsState({incubeeId: " +  "inc_a817515d-416f-4822-b6dd-a603b996e9a2" + "})";
            } else {
                vm.cancelDestination = '/signinState';
                vm.uploadButtonText = "Signup Company";
            }
        }

        vm.cancelSignup = function(){
            if (vm.investor == false) {
                $state.go('/incubeeDetailsState',{incubeeId: vm.incubeeId});
            } else {
                $state.go('/signinState');
            }

        }

        // vm.signupIncubee = function(name, url, logo, highConcept, description, twitter, video, location, founderInfo, field, phase, funding) {
            vm.signupIncubee = function(token) {
            //console.log(name + " / " + url + " / " + logo + " / " + highConcept + " / " + description + " / " + twitter + " / " + video + " / " + location + " / " + founderInfo + " / " + field + " / " + phase + " / " + funding);
            // CompanyService.postImage(imageShow).then(function(res){
                // console.log(res);
                // $state.go("/incubeeDetailsState", {incubeeId: 'inc_952745e0-ea2e-4365-83b3-cd379072ce57'});
            // });
            // console.log(token.value);
            if (localStorageService.get("loggedin") == true) {
                vm.company.token = localStorageService.get('userGoogleInfo');
                vm.company.token = JSON.stringify(vm.company.token);
                vm.company.id = "";
                console.log(vm.company);
                CompanyService.signupCompany(vm.company).then(function(result){
                    console.log(result);
                });
            } else {
                alert('Please signin with google');
                LoginFactory.login();
            }

        }

        vm.signupFunction = function(){

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
