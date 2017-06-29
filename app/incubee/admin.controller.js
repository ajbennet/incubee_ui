(function() {
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$http', 'CompanyService', 'localStorageService'];

    /* @ngInject */
    function AdminController($http, CompanyService, localStorageService) {
        var vm = this;
        vm.title = 'AdminController';

        activate();

        ////////////////

        function activate() {
        }

        vm.sendMsg = function() {
            messageService.sendMsg().then(function(response){
                console.log(response);
            });
        }

        vm.signupIncubee = function(token) {
            // if (localStorageService.get("loggedin") == true) {
            //     vm.company.token = localStorageService.get('userGoogleInfo');
            //     vm.company.token = JSON.stringify(vm.company.token);
            //     vm.company.id = localStorageService.get('incubeeId');
            //     // console.log(vm.company)
            //     // console.log(vm.company);
            //     CompanyService.signupCompany(vm.company).then(function(result){
            //      // console.log(result);
            //      alert("SUCCESS!");


            //     });
            // } else {
            //     alert('Please signin with google');
            //     LoginFactory.login();
            // }

                console.log(token);

                vm.company.company_name = ""
                vm.company.company_url = ""
                vm.company.high_concept = ""
                vm.company.description = ""
                vm.company.twitter_url = ""
                vm.company.video_url = ""
                vm.company.location = ""
                vm.company.founderInfo = ""
                vm.company.contact_email = ""
                vm.company.field = ""
                vm.company.project_status = ""
                vm.company.funding = ""
                vm.previousImages = ""
                // vm.picFile.value = "";
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