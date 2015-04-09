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
        },

        projectfiles: function () {
            var dotfiles = [
                'editorconfig',
                'jscsrc',
                'projectile',
                {src: 'test-jshintrc', dest: 'test/.jshintrc'},
                {src: 'app-jshintrc', dest: '.jshintrc'},
            ];

            var copyTemplate = _.ary(quickCopyTemplate, 2).bind(null,this);

            _(dotfiles)
                .tap(this.log.bind(this))
                .map(function (file) {
                    if (_(file).isString()) return {src: file, dest: '.' + file};
                    return file;
                })
                .each(copyTemplate)
                .value()
            ;
        }
    },

    install: function () {
        this.installDependencies();
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
