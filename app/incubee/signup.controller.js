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
       vm.previousImages;


       vm.company = {};

       activate();

       function activate() {
           vm.investor = localStorageService.get('investor');
           // **** UNCOMMENT FOR REGULAR USE!
           // if (vm.investor == false) {
               vm.incubeeId = localStorageService.get('incubeeId');
               vm.uploadButtonText = "Save";
               CompanyService.getCompanyInfo(localStorageService.get('incubeeId')).then(function(response) {
                   // console.log(response);
                   vm.company.company_name = response.data.company_name;
                   vm.company.company_url = response.data.company_url;
                   vm.company.high_concept = response.data.high_concept;
                   vm.company.description = response.data.description;
                   vm.company.twitter_url = response.data.twitter_url;
                   vm.company.video_url = response.data.video_url;
                   vm.company.location = response.data.location;
                   vm.company.founder = response.data.founder;
                   vm.company.contact_email = response.data.contact_email;
                   vm.company.field = response.data.field;
                   vm.company.project_status = response.data.project_status;
                   if (response.data.funding == true) {
                       var fundingIndex = "Yes";
                   } else {
                       var fundingIndex = "No";
                   }
                   // console.log(vm.company);
                   // console.log(fundingIndex);
                   vm.company.funding = fundingIndex;
                   // console.log(response.data.images);
                   vm.previousImages = response.data.images;
               });
           // **** UNCOMMENT FOR REGULAR USE!
           // } else {
           //     vm.cancelDestination = '/signinState';
           //     vm.uploadButtonText = "Signup Company";
           // }
       }

       vm.cancelSignup = function(){
           if (vm.investor == false) {
               $state.go('/incubeeDetailsState',{incubeeId: vm.incubeeId});
           } else {
               $state.go('/homePageState');
           }

       }

           vm.signupIncubee = function(token) {
           if (localStorageService.get("loggedin") == true) {
               vm.company.token = localStorageService.get('userGoogleInfo');
               vm.company.token = JSON.stringify(vm.company.token);
               vm.company.id = localStorageService.get('incubeeId');
               // console.log(vm.company)
               // console.log(vm.company);
               CompanyService.signupCompany(vm.company).then(function(result){
                   // console.log(result);
                   $state.go("/incubeeDetailsState", {incubeeId: vm.company.id});
               });
           } else {
               alert('Please signin with google');
               LoginFactory.login();
           }

       }

       vm.signupFunction = function(){

       }

       vm.choose = function(){
        // console.log('Hello');
       }

       vm.uploadMultipleFiles = function(event) {
           vm.imagesFile = event.target.files;
           var preview = document.querySelector('#signupImagepreview');
           // console.log(vm.imagesFile);
           // console.log(preview);
           function readAndPreview(file) {
               imageShow = file;
               // console.log(file);
               // console.log('show hide');
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
