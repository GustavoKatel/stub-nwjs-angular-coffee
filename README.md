# stub-nwjs-angular-coffee

[![Dependency Status](https://gemnasium.com/GustavoKatel/stub-nwjs-angular-coffee.svg)](https://gemnasium.com/GustavoKatel/stub-nwjs-angular-coffee)

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

1. Install dependencies: `bower install` and `npm install`
2. Build `grunt build[:env]`.
3. Create dist packages `grunt dist[:env]`.
4. Run `grunt app[:env]`.

Possible values to `env` are *dev* and *prod*

## License
GPL v3. See LICENSE file
