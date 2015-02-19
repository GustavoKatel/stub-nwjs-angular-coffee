# stub-nwjs-angular-coffee

Package "ready-to-go" to develop applications in [NW.js](http://nwjs.io/), [Angular.JS](http://angularjs.org/) and [CoffeeScript](http://coffeescript.org/).

## Features
* Auto download NW.js builds using [grunt-node-webkit-builder](https://github.com/mllrsohn/grunt-node-webkit-builder)
* Create distribution packages
* *Development* and *Production* environments
* Dependencies management with [bower](http://bower.io/)
* Compile with [grunt](http://gruntjs.com/)
* AngularJS
* CoffeeScript
* NW.JS

## How to

* Install dependencies: `bower install` and `npm install`
* Build `grunt build[:env]`.
* Run `grunt app[:env]`.
* Create dist packages `grunt dist[:env]`

Possible values to `env` are *dev* and *prod*

## License
GPL v3. See LICENSE file
