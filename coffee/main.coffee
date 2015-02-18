
angular.module 'baseApp', ['baseApp.controllers', 'baseApp.services', 'ui.router']

.run ($window, mainServ) ->
  console.log "ready!"
  mainServ.init


.config ($stateProvider, $urlRouterProvider) ->

  $urlRouterProvider.otherwise "/home"

  $stateProvider

  .state 'home', {
    url: "/home",
    views:
      "main":
        templateUrl: "templates/home.html"
        controller: "mainCtrl"
  }

  .state 'about', {
    url: "/about",
    views:
      "main":
        templateUrl: "templates/about.html"
        controller: "aboutCtrl"
  }
