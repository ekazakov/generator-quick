'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the first-rate ' + chalk.red('Quick') + ' generator!'
        ));

        var prompts = [{
            type: 'confirm',
            name: 'someOption',
            message: 'Would you like to enable this option?',
            default: true
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            quickCopyTemplate(this, '_package.json', 'package.json');
            quickCopyTemplate(this, 'gulp.js', 'gulp.js');
        },

        projectfiles: function () {
            quickCopyTemplate(this, 'editorconfig', '.editorconfig');
            quickCopyTemplate(this, 'jscsrc', '.jscsrc');
            quickCopyTemplate(this, 'projectile', '.projectile');
            quickCopyTemplate(this, 'test-jshintrc', 'test/.jshintrc');
            quickCopyTemplate(this, 'app-jshintrc', '.jshintrc');
        },

        karma: function () {
            quickCopyTemplate(this, 'karma.conf.js', 'test/karma.conf.js');
        }
    },

    install: function () {
        var dependencies = [
            'lodash',
        ];

        var devDependencies = [
            'gulp',
            'gulp-util',

            'browserify',
            'split',
            'vinyl-transform',
            'watchify',

            'mocha',
            'chai',
            'sinon',
            'sinon-chai',
            'karma',
            'karma-chai',
            'karma-chai-sinon',
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-notify-reporter',
            'karma-sinon'
        ];

        this.npmInstall(dependencies, {'save': true});
        this.npmInstall(devDependencies, {'saveDev': true});
    },

});

function quickCopyTemplate (ctx, template, dest) {
    if (arguments.length === 2) {
        dest = template.dest;
        template = template.src;
    }

    ctx.log('tmpl:', template, 'dest:', dest);
    ctx.fs.copy(
        ctx.templatePath(template),
        ctx.destinationPath(dest)
    );
}

// var copyTemplate = _.ary(quickCopyTemplate, 2).bind(null,this);

//             _(dotfiles)
//                 .map(createFileObj)
//                 .each(copyTemplate)
//                 .value()
//             ;

//             function createFileObj (file) {
//                 if (_(file).isString()) return {src: file, dest: '.' + file};
//                 return file;
//             }
