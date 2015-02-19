var NW_VERSION = "0.8.6";

var os = require("os");

var PLATFORM = os.platform();
if( PLATFORM === "linux" || PLATFORM=="osx" ) {
  PLATFORM = PLATFORM + os.arch().replace("x", "");
}

module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    path: {
      dev: "build/dev",
      prod: "build/prod"
    },

    clean: {
      dev: {
        src: [ "build/dev" ]
      },
      prod: {
        src: [ "build/prod" ]
      },
      dist: {
        src: [ "dist" ]
      }
    },

    coffee: {
      dev: {
        cwd: 'coffee',
        sourceMap: true,
        expand: true,
        src: ['**/*.coffee'],
        dest: 'build/dev/js/',
        ext: '.js'
      },
      prod: {
        cwd: 'coffee',
        sourceMap: true,
        expand: true,
        src: ['**/*.coffee'],
        dest: 'build/prod/js/',
        ext: '.js'
      }
    },

    preprocess: {
      dev: {
        src: [ 'build/dev/**/*.html' ],
        options: {
          inline: true,
          context: {
            NODE_ENV: "dev"
          }
        }
      },
      prod: {
        src: [ 'build/prod/**/*.html' ],
        options: {
          inline: true,
          context: {
            NODE_ENV: "prod"
          }
        }
      }

    },

    copy: {
      dev: {
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
        dest: 'build/dev/',
        exand: true
      },
      prod: {
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
        dest: 'build/prod/',
        exand: true
      }
    },

    run: {
      app_dev: {
        options: {
          cwd: ".",
          wait: true,
          quiet: false
        },
        cmd: "nw_bin/nodewebkit/nw",
        args: [
          "build/dev",
        ]
      },
      app_prod: {
        options: {
          cwd: ".",
          wait: true,
          quiet: false
        },
        cmd: "nw_bin/nodewebkit/nw",
        args: [
          "build/prod",
        ]
      }
    },

    nodewebkit: {
      dev: {
        options: {
          platforms: ['win', 'osx', 'linux'],
          buildDir: './dist/dev'
        },
        src: ['./build/dev/**/*']
      },
      prod: {
        options: {
          platforms: ['win', 'osx', 'linux'],
          buildDir: './dist/prod'
        },
        src: ['./build/prod/**/*']
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
    grunt.task.run('clean:'+env);
    grunt.task.run('coffee:'+env);
    grunt.task.run('copy:'+env);
    grunt.task.run('preprocess:'+env);
  });

  grunt.registerTask('app', function(env){
    if(env!='dev' && env!='prod') {
      env = 'dev';
    }
    grunt.task.run('run:app_'+env);
  });

  grunt.task.registerTask('dist', function(env){
    if(env!='dev' && env!='prod') {
      env = 'dev';
    }
    grunt.task.run('build:'+env);
    grunt.task.run('nodewebkit:'+env);
  });

};
