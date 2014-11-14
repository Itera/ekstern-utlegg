/* global module */

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        eslint: {
            target: [
                "Gruntfile.js",
                "public/js/*.js",
                "test/**/*Spec.js"
            ]
        },
        "bower-install-simple": {
            app: {
                options: {
                    color: true,
                    production: false,
                    cwd: "public",
                    directory: "lib"
                }
            }
        },
        karma: {
            app: {
                configFile: "test/config/karma.conf.js"
            },
            "app-fast": {
                browsers: ["PhantomJS"],
                singleRun: true,
                configFile: "test/config/karma.conf.js"
            }
        }
    });

    // Package management
    grunt.loadNpmTasks("grunt-npm-install");
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-karma");

    grunt.registerTask("install", ["bower-install-simple:app", "npm-install"]);
    grunt.registerTask("default", ["eslint"]);
};
