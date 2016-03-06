module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //,
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // }
    jshint: {
      all: ['Gruntfile.js', 'src/js/*.js']
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'src/sass',
          cssDir: 'src/css',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: 'src/sass',
          cssDir: 'src/css'
        }
      }
    },

    booty: {
      dev: {
        options: {
          componentPath: 'components/',
          dest: 'src/css'
        }
      }
    }

  });

  // // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  // // Default task(s).
  // grunt.registerTask('default', ['uglify']);

  grunt.loadNpmTasks('grunt-booty');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.registerTask('default', ['jshint', 'compass']);

};