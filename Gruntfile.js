var NW_VERSION = "0.8.6";

var os = require("os");

var PLATFORM = os.platform();
if( PLATFORM === "linux" || PLATFORM=="osx" ) {
  PLATFORM = PLATFORM + os.arch().replace("x", "");
}

module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({

    config: {

      platform: PLATFORM,

      env: "dev",

      pkg: grunt.file.readJSON('package.json'),

      path: {
        build: "build",
        dist: "dist",
        cache: "cache"
      },

      nwjs: {
        version: "0.12.0-alpha3"
      }

    },

    clean: {
      build: {
        src: [ "<%= config.path.build %>/<%= config.env %>" ]
      },
      dist: {
        src: [ "<%= config.path.dist %>" ]
      }
    },

    coffee: {
      build: {
        cwd: 'coffee',
        sourceMap: true,
        expand: true,
        src: ['**/*.coffee'],
        dest: '<%= config.path.build %>/<%= config.env %>/js/',
        ext: '.js'
      }
    },

    preprocess: {
      build: {
        src: [ '<%= config.path.build %>/<%= config.env %>/**/*.html' ],
        options: {
          inline: true,
          context: {
            NODE_ENV: "<%= config.env %>"
          }
        }
      }
    },

    copy: {
      build: {
        src: [
          'package.json',
          '*.html',
          'css/**/*',
          'native/build/Release/*',
          'templates/**/*',
          'images/**/*',
          'fonts/**/*',
          'bower_components/**/*'
        ],
        dest: '<%= config.path.build %>/<%= config.env %>/',
        exand: true
      }
    },

    run: {
      build: {
        options: {
          cwd: ".",
          wait: true,
          quiet: false
        },
        cmd: "<%= config.path.cache %>/<%= config.nwjs.version %>/<%= config.platform %>/nw",
        args: [
          "<%= config.path.build %>/<%= config.env %>",
        ]
      }
    },

    nodewebkit: {
      build: {
        options: {
          platforms: ['win', 'osx', 'linux'],
          buildDir: './<%= config.path.dist %>/<%= config.env %>',
          version: '<%= config.nwjs.version %>'
        },
        src: ['./<%= config.path.build %>/<%= config.env %>/**/*']
      }
    }

  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  // define the tasks

  grunt.registerTask('build', function(env) {
    if(env!='dev' && env!='prod') {
      env = 'dev';
    }
    grunt.config.set("config.env", env);
    grunt.task.run('clean:build');
    grunt.task.run('coffee:build');
    grunt.task.run('copy:build');
    grunt.task.run('preprocess:build');
  });

  grunt.registerTask('app', function(env){
    if(env!='dev' && env!='prod') {
      env = 'dev';
    }
    grunt.config.set("config.env", env);
    grunt.task.run('run:build');
  });

  grunt.task.registerTask('dist', function(env){
    if(env!='dev' && env!='prod') {
      env = 'dev';
    }
    grunt.config.set("config.env", env);
    grunt.task.run('build:'+env);
    grunt.task.run('nodewebkit:build');
  });

};
