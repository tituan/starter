module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: {
        src: ['dist']
      },
    },

    concat: {
      build: {
        src: [
          'src/script/**/*.js',
        ],
        dest: 'dist/script/main.min.js',
      },
    },

    copy: {
      build: {
        expand: true,
        cwd: 'src/media',
        src: '**',
        dest: 'dist/media',
      },
    },

    imagemin: {
      build: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/img/',
        },],
      },
    },

    sass: {
      prod: {
        options: {
          style: 'compressed',
        },
        files: {
          'dist/css/main.min.css': 'src/scss/main.scss',
        },
      },
      dev: {
        options: {
          style: 'expanded',
        },
        files: {
          'dist/css/main.min.css': 'src/scss/main.scss',
        },
      },
    },

    uglify: {
      build: {
        src: 'dist/script/main.min.js',
        dest: 'dist/script/main.min.js',
      },
    },

    watch: {
      scripts: {
        files: ['src/script/**/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass:dev'],
        options: {
          spawn: false,
        },
      },
      img: {
        files: ['src/img/**/*.{png,jpg,gif,svg}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        },
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'copy', 'concat', 'uglify', 'imagemin', 'sass:prod']);
  grunt.registerTask('dev', ['clean', 'copy', 'concat','imagemin', 'sass:dev', 'watch']);

};
