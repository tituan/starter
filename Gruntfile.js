const webpackConfig = require('./webpack.config.js');
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    autoprefixer: {
      build: {
        files: [{
          expand: true,
          cwd: 'public/dist/css',
          src: ['*.css'],
          dest: 'public/dist/css/',
          ext: '.css'
        }]
      }
    },

    cacheKiller: {
      style: {
        files: {
          'public/dist/css/home[mask].css': 'templates/dist/styles.html.twig'
        }
      },
      script: {
        files: {
          'public/dist/script/home[mask].js': 'templates/dist/scripts.html.twig'
        }
      }
    },

    clean: {
      build: {
        src: ['public/dist', 'templates/dist', 'var/cache']
      }
    },

    copy: {
      fonts: {
        expand: true,
        cwd: 'assets/fonts',
        src: '**/*.{svg,eot,woff,ttf}',
        dest: 'public/dist/fonts'
      },
      templates: {
        expand: true,
        cwd: 'templates/assets_templates',
        src: '**/*.{html,php,twig}',
        dest: 'templates/dist'
      },
      img: {
        expand: true,
        cwd: 'assets/img/',
        src: '**/*.{png,jpg,gif,svg}',
        dest: 'public/dist/img/'
      }
    },

    'dart-sass': {
      prod: {
        options: {
          outputStyle: 'compressed',
          sourceMap: false
        },
        files: [{
          expand: true,
          cwd: 'assets/scss',
          src: ['*.scss'],
          dest: 'public/dist/css/',
          ext: '.css'
        }]
      },
      dev: {
        options: {
          outputStyle: 'expanded',
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: 'assets/scss',
          src: ['*.scss'],
          dest: 'public/dist/css/',
          ext: '.css'
        }]
      },
    },

    webpack: {
      prod: Object.assign({
        mode: 'production'
      }, webpackConfig),
      dev: Object.assign({
        mode: 'development'
      }, webpackConfig)
    },

    watch: {
      css: {
        files: 'assets/scss/**/*.scss',
        tasks: 'dart-sass:dev',
        options: {
          spawn: false
        }
      },
      fonts: {
        files: 'assets/fonts/**/*.{svg,eot,woff,ttf}',
        tasks: 'copy:fonts',
        options: {
          spawn: false
        }
      },
      img: {
        files: 'assets/img/**/*.{png,jpg,gif,svg}',
        tasks: 'copy:img',
        options: {
          spawn: false
        }
      },
      scripts: {
        files: 'assets/script/**/*.js',
        tasks: 'webpack:dev',
        options: {
          spawn: false
        }
      },
      views: {
        files: 'templates/assets_templates/*.{html,php,twig}',
        tasks: 'copy:templates',
        options: {
          spawn: false
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-cache-killer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-dart-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['clean', 'webpack:prod', 'dart-sass:prod', 'autoprefixer', 'copy', 'cacheKiller']);
  grunt.registerTask('dev', ['clean', 'webpack:dev', 'dart-sass:dev', 'copy', 'watch']);

};
