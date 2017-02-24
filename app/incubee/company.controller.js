(function() {
    'use strict';

    angular
        .module('app')
        .controller('CompanyController', CompanyController);

    CompanyController.$inject = ['$http', 'CompanyService'];

    function CompanyController($http, CompanyService) {
        var vm = this;
        vm.companyInfo;

        activate();

        function activate() {
            CompanyService.getCompanyInfo().then(function(res) {
                console.log(res);
                vm.companyInfo = res;
            });
        }
    }
})();
