/*global module:false*/
module.exports = function (grunt) {

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['public/app/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },

    jasmine: {
      test: {
        src: [
          'public/vendor/socket.io-client/socket.io.js',
          'public/vendor/jquery/dist/jquery.js',
          'public/vendor/handlebars/handlebars.min.js',
          'public/app/word-war.js',
          'public/app/common/socket-connector.js',
          'public/app/common/input-manager.js',
          'public/app/common/layout-manager.js',
          'public/app/common/socket-url-resolver.js',
          'public/app/login/login.js',
          'public/app/console/console.js',
          'public/app/highscore/highscore.js',
          'public/app/letter-grid/letter-grid.js',
          'public/app/remaining-time/remaining-time.js'
        ],
        options: {
          specs: 'test/*.spec.js'
        }
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'test']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'test']
      }
    },

    express: {
      options: {
        port: 3000,
        hostname: '*'
      },
      dev: {
        options: {
          bases: ['./public']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('default', ['jshint', 'test']);

  grunt.registerTask('test', ['jasmine']);

  grunt.registerTask('server', ['default', 'express', 'watch']);

};
