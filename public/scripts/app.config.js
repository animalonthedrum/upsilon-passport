// routing
angular
  .module("passportApp")
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
        controller: "HomeController as home",
        authRequired: true
      })
      .when("/newUser", {
        templateUrl: "views/register.html",
        controller: "RegisterController as register"
      })
      .otherwise({
        templateUrl: "views/login.html",
        controller: "LoginController as login"
      });
  })
  .run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      AuthService.checkLoginStatus().then(function(loggedIn) {
        console.log(loggedIn);
        if (next.authRequired && !loggedIn) {
          $location.path("/login");
          $route.reload();
        }
      });
    });
  });
