(function() {
    'use strict';

    var production = 'production';
    console.log(production);

    var app = angular.module('app', ['ui.router', 'google-signin', 'LocalStorageModule', 'jkAngularRatingStars', 'production']);

    //****** To upload one image
    // app.directive('fileModel', ['$parse', function ($parse) {
    //     return {
    //         restrict: 'A',
    //         link: function (scope, element, attrs) {
    //             var model = $parse(attrs.fileModel);
    //             var modelSetter = model.assign;
    //             element.bind('change', function(){
    //                 scope.$apply(function(){
    //                     modelSetter(scope, element[0].files[0]);
    //                 })
    //             })
    //         }
    //     };
    // }])

    //****** To upload Multi images
    app.directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function() {
                    var values = [];
                    angular.forEach(element[0].files, function(item) {
                        var value = {
                            // File Name 
                            // name: item.name,
                            //File Size 
                            // size: item.size,
                            //File URL to view 
                            // url: URL.createObjectURL(item),
                            item
                            // File Input Value 
                            // _file: item
                        };
                        values.push(value);
                    });
                    scope.$apply(function() {
                        if (values.length > 4) {
                            alert("You are only allowed to upload up to 4 images.");
                            values = [];
                            return;
                        } else {
                            // console.log(values);
                            modelSetter(scope, values);
                        }
                    })
                })
            }
        };
    }])

    app.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])

    app.config(function($stateProvider, $urlRouterProvider, GoogleSigninProvider, envServiceProvider) {

        $urlRouterProvider.otherwise('/homePageState');

        GoogleSigninProvider.init({
            client_id: '1079218369753-3fg9sou40kdrjb5hsfnm0oo9jj0dok9a.apps.googleusercontent.com',
        });

        envServiceProvider.config({
            domains: {
                development: ['localhost'],
                production: ['incub.ee'],
                test: []
            },
            vars: {
                development: {
                    apiUrl: 'http://www.qa.incub.ee/rest'
                },
                production: {
                    apiUrl: 'http://www.incub.ee/rest'
                },
                defaults: {
                    apiUrl: 'http://www.incub.ee/rest'
                }
            }
        });

        envServiceProvider.check();

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
            .state('/registerState', {
                // url: "/signupState/:incubeeId",
                url: "/registerState",
                views: {
                    content: {
                        templateUrl: "app/partials/registerState.html",
                        controller: "RegisterController",
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
            .state('/adminState', {
                url: "/adminState",
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
                        templateUrl: "app/partials/adminState.html",
                        controller: "AdminController",
                        controllerAs: 'vm',
                        data: {
                            css: 'app/styles/styles.css'
                        }
                    }
                }
            })
    });
})();
