(function() {
    'use strict';

    var app = angular.module('app', ['ui.router', 'google-signin', 'LocalStorageModule']);

    app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    })
                })
            }
        };
    }])

    app.config(function($stateProvider, $urlRouterProvider, GoogleSigninProvider) {

        $urlRouterProvider.otherwise('/homePageState');

        GoogleSigninProvider.init({
            client_id: '422172130038-1r08dm1nvgc73l9couv1nd8trfc03103.apps.googleusercontent.com',
        });

        $stateProvider
            .state('/incubeesDisplayState', {
                url: "/incubeesDisplayState",
                views: {
                    nav: {
                        templateUrl: "app/partials/topNavBar.html",
                        controller: 'TopNavController',
                        controllerAs: 'vm',
                        data: {
                            css: 'app/styles/styles.css'
                        }
                    },
                    content: {
                        templateUrl: "app/partials/incubeesDisplayState.html",
                        controller: "InvestorController",
                        controllerAs: 'vm',
                        data: {
                            css: 'app/styles/styles.css'
                        }
                    }
                }
            })
            .state('/incubeeDetailsState', {
                url: "/incubeeDetailsState/:incubeeId",
                views: {
                    nav: {
                        templateUrl: "app/partials/topNavBar.html",
                        controller: 'TopNavController',
                        controllerAs: 'vm',
                        data: {
                            css: 'app/styles/styles.css'
                        }
                    },
                    content: {
                        templateUrl: "app/partials/incubeeDetailsState.html",
                        controller: "IncubeeDetailsController",
                        controllerAs: 'vm',
                        data: {
                            css: 'app/styles/styles.css'
                        }
                    }
                }
            })
            .state('/signinState', {
                url: "/signinState",
                views: {
                    content: {
                        templateUrl: "app/partials/signinState.html",
                        controller: "SigninController",
                        controllerAs: 'vm',
                        data: {
                            css: 'app/styles/styles.css'
                        }
                    }
                }
            })
            .state('/signupState', {
                // url: "/signupState/:incubeeId",
                url: "/signupState",
                views: {
                    content: {
                        templateUrl: "app/partials/signupState.html",
                        controller: "SignupController",
                        controllerAs: 'vm',
                        data: {
                            css: 'app/styles/styles.css'
                        }
                    }
                }
            })
            .state('/homePageState', {
                url: "/homePageState",
                views: {
                    nav: {
                        templateUrl: "app/partials/topNavBar.html",
                        controller: 'TopNavController',
                        controllerAs: 'vm',
                        data: {
                            css: 'app/styles/styles.css'
                        }
                    },
                    content: {
                        templateUrl: "app/partials/homePageState.html",
                        controller: "HomePageController",
                        controllerAs: 'vm',
                        data: {
                            css: 'app/styles/styles.css'
                        }
                    }
                }
            })
    });
})();
