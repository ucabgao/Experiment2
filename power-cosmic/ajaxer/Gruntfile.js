module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> as of <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= pkg.main %>',
        dest: '<%= pkg.directories["build"] + "/" + pkg.name %>.min.js'
      }
    },


    jshint: {
      src: ['<%= pkg.main %>']
    },


    coveralls: {
      ajaxer_coverage: {
        src: 'coverage/lcov.info'
      }
    },

    env: {
      coverage: {
        APP_DIR_FOR_CODE_COVERAGE: '../tests/coverage/instrument/lib/'
      }
    },
    instrument: {
      files: 'lib/*.js',
      options: {
        lazy: true,
        basePath: 'tests/coverage/instrument/'
      }
    },
    storeCoverage: {
      options: {
        dir: 'tests/coverage/reports'
      }
    },
    makeReport: {
      src: 'tests/coverage/reports/**/*.json',
      options: {
        type: 'lcov',
        dir: 'tests/coverage/reports',
        print: 'detail'
      }
    },

    jscs: {
      src: "./lib/*.js",
      options: {
        config: ".jscsrc",
        esnext: true,
        verbose: true,
        requireCurlyBraces: ["if"]
      }
    },

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['tests/*.js']
    }
  });

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['jscs', 'uglify']);

  grunt.registerTask('coverage', ['jshint', 'env:coverage',
    'instrument', 'mochaTest', 'storeCoverage', 'makeReport'
  ]);
};
