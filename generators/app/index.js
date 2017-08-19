'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the laudable ' + chalk.red('generator-angular-npm-module-seed') + ' generator!'
    ));

    const prompts = [
      {
        name: 'projectName',
        message: 'What\'s the name of your component?',
        validate: function (str) {
          return str.length > 0;
        }
      },
      {
        name: 'componentPrefix',
        message: 'What\'s the name of your component prefix?',
        validate: function (str) {
          return str.length > 0;
        }
      }];

    return this.prompt(prompts).then(props => {this.props = props;});

  }

  writing() {
    this.props.projectNameCamelCase = _.chain(this.props.projectName).camelCase().upperFirst();
    this.fs.copyTpl(
      this.templatePath('_.angular-cli.json'),
      this.destinationPath('.angular-cli.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_package-dist.json'),
      this.destinationPath('package-dist.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_rollup.config.js'),
      this.destinationPath('rollup.config.js'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('src/_index.ts'),
      this.destinationPath('src/index.ts'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('src/app/_app.module.ts'),
      this.destinationPath('src/app/' + this.props.projectName + '.module.ts'),
      this.props
    );
    this.fs.copy(
      this.templatePath('i18n/_en.json'),
      this.destinationPath('src/i18n/en.json')
    );
    this.fs.copy(
      this.templatePath('i18n/_ar.json'),
      this.destinationPath('src/i18n/ar.json')
    );
  }

  install() {
    this.installDependencies();
  }
};
