angular.module("baseApp.services")

.factory "mainServ", [ "$window", ($window) ->
  new class mainServ
    constructor: ->
      $window.customVar = "arroz"
      console.log "services ok!"

    init: ->
      console.log "mainServ init!"

]
