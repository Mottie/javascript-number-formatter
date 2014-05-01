/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    clean: {
      build: [ 'lib' ]
    },

    concat: {
      options: {
        banner: '/**\n' +
                ' * <%= pkg.name %>\n' +
                ' * <%= pkg.description %>\n' +
                ' *\n' +
                ' * @preserve IntegraXor Web SCADA - JavaScript Number Formatter (http://www.integraxor.com/)\n' +
                ' * @author <%= pkg.author.name %>\n' +
                ' * @maintainer <%= pkg.maintainers[0].name %>\n' +
                ' * @copyright <%= grunt.template.today("yyyy") %> ecava\n' +
                ' * @license <%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>>\n' +
                ' * @link <%= pkg.homepage %>\n' +
                ' * @version <%= pkg.version %>\n' +
                ' */\n'
      },
      dist: {
        src: [
          'src/format.js'
        ],
        dest : 'lib/format.js'
      }
    },
    jshint: {
      files: {
        src: [
          'Gruntfile.js',
          'src/**/*.js',
          'test/*.js'
        ]
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> * IntegraXor Web SCADA - http://www.integraxor.com/ */\n',
        report: 'gzip'
      },
      dist: {
        files: {
          'lib/format.min.js': ['<banner>','lib/format.js']
        }
      }
    },
    qunit: {
      files: ['test/index.html']
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean' );
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('build', ['clean:build', 'concat', 'uglify']);
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['test', 'build']);

};