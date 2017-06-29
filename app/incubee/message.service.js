(function() {
    'use strict';

    angular
        .module('app')
        .service('messageService', messageService);

    messageService.$inject = ['$http', 'envService'];

    /* @ngInject */
    function messageService($http, envService) {
        this.func = func;
        var apiRequest = envService.read('apiUrl');

        ////////////////

        function func() {}

        this.sendMsg = function(msgText){
        	return $http({
        		method:'POST',
        		url: apiRequest + '/v1.0/msg?eid=100262006902753805448',
        		data:{
        			"body":"Hi I like this idea",
					"eid":100262006902753805448,
					"name":"Cam Wilcox",
					"to":118325768954389912956,
					"longitude":914,
					"latitude":323,
					"type":"USR"
        		}
        	}).then(function(response){
        		console.log(response);
        		return response;
        	});
        }
    }
})();