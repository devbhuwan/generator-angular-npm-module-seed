'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

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
      this.destinationPath('.angular-cli.json')
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json')
    );
    this.fs.copyTpl(
      this.templatePath('_package-dist.json'),
      this.destinationPath('package-dist.json')
    );
    this.fs.copyTpl(
      this.templatePath('_rollup.config.js'),
      this.destinationPath('rollup.config.js')
    );
    this.fs.copyTpl(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copyTpl(
      this.templatePath('src/_index.ts'),
      this.destinationPath('src/index.ts')
    );
    this.fs.copyTpl(
      this.templatePath('src/_app.module.ts'),
      this.destinationPath('src/app.module.ts')
    );
  }

  install() {
    this.installDependencies();
  }
};
