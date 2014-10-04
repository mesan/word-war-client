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
          'public/app/**/*.js',
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
