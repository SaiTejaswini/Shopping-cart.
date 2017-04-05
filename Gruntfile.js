module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        jitGrunt: true
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-wiredep');

    var sourceWildcards = [
      "**/*.js",
      "**/*.html",
      "**/*.css"
    ]

    function sourceWildcardsIn(prefix) {
        return sourceWildcards.map(function(wildcard) {
            return (prefix + wildcard);
        });

    }
    grunt.initConfig({
        clean: {
            build: ["build"]
        },
        copy: {
            src: {
                files: [
                  {
                    expand: true,
                    cwd: "src/",
                    src: sourceWildcards,
                    dest: "build/"
                  }
                 ]
               },
             resources: ({
              files: [
                {
                  expand: true,
                  src: "bower_components/**",
                  dest: "build/"
                }
              ]
             })
           },
       wiredep: {
        target: {
          src: 'build/index.html' // point to your HTML file.
        }
      }
    });
    grunt.registerTask("default",["copy","wiredep"]);
}
