(function() {
   'use strict';

   angular
       .module('app')
       .controller('RegisterController', RegisterController);

   RegisterController.$inject = ['$http', 'localStorageService', '$stateParams', 'CompanyService', '$state', 'LoginFactory'];

   function RegisterController($http, localStorageService, $stateParams, CompanyService, $state, LoginFactory) {
       var vm = this;
       vm.imageFile;
       vm.imagesFile;
       vm.investor;
       vm.incubeeDetails;
       vm.startupPhaseOptions = ["Ideation", "Work-in-progress", "Just-launched", "Launched-with-customers"];
       vm.seekFundingOptions = ["Yes", "No"];
       vm.imagesChosen;
       var imageShow;
       vm.incubeeId;


       vm.company = {};

       activate();

       function activate() {

       }

       vm.cancelSignup = function(){
            $state.go('/homePageState');
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
               vm.company.id = localStorageService.get('incubeeId');
               console.log(vm.company)
               // console.log(vm.company.images);
               // if (vm.company.images.length > 1) {
               //    for(var i = 0; i < vm.company.images.length; i++){
               //      vm.company.testImg = vm.company.images[i].item;
               //       console.log(vm.company);

               //    }
               // }
               console.log(vm.company);
               CompanyService.signupCompany(vm.company).then(function(result){
                   console.log(result);
                   $state.go("/incubeeDetailsState", {incubeeId: vm.company.id});
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
           console.log(vm.imagesFile);
           console.log(preview);
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
