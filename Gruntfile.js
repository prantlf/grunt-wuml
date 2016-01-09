'use strict';

module.exports = function (grunt) {

  var coverage = process.env.GRUNT_WUML_COVERAGE;

  require('time-grunt')(grunt);

  grunt.initConfig({

    jshint: {
      all:     [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
    },

    wuml: {
      'class': {
        src: ['test/vaadin.yuml'],
        dest: 'test/vaadin.png'
      },
      'sequence': {
        files: {
          'test/toolkit.svg': ['test/toolkit.yuml']
        },
        options: {
          type: 'sequence',
          format: 'svg'
        }
      }
    },

    nodeunit: {
      tests:   ['test/*_test.js'],
      options: {
        reporter: coverage ? 'lcov' : 'verbose',
        reporterOutput: coverage ? 'coverage/tests.lcov' : undefined
      }
    },

    clean: {
      tests:    ['test/vaadin.png', 'test/toolkit.svg'],
      coverage: ['coverage']
    },

    jscoverage: {
      tasks: {
        expand: true,
        cwd:    'tasks/',
        src:    '*.js',
        dest:   'coverage/tasks/'
      }
    },

    coveralls: {
      tests: {
        src: 'coverage/tests.lcov'
      }
    }

  });

  grunt.loadTasks(coverage ? 'coverage/tasks' : 'tasks');

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', ['jshint', 'clean:tests', 'wuml', 'nodeunit']);
  grunt.registerTask('instrument', ['jshint', 'clean', 'jscoverage']);
  grunt.registerTask('post_coverage', ['test', 'coveralls']);
  grunt.registerTask('default', ['test']);

};
