'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const Helper = require('yo-java-helper');
const formatters = require('./formatters.js');

const questions = [
  'name',
  'organization',
  'version',
  'scala',
  'sbt'
];

module.exports = yeoman.Base.extend({

  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.helper = new Helper(this, require('../../package.json'));
  },

  initializing: function () {
    this.helper.initConfig(questions);
  },

  prompting: {
    greeting: function () {

    },

    name: function () {
      if (this.context.updateMode) {
        // update must be started from project folder - no need to ask for name
        return;
      }

      this.log(`Accept default library name ${chalk.red(this.appname)} to generate in current folder, otherwise new folder will be created`);

      var prompts = [{
        name: 'name',
        message: 'Project name',
        default: this.name || this.appname,
        filter: this.helper.folderName
      }];

      this.helper.prompt(prompts, ['name'], props => this.appname = formatters.artifactName(props.name));
    },

    artifact: function () {
      var prompts = [
        {
          type: 'input',
          name: 'organization',
          message: 'Organization',
          default: 'org.example'
        },
        {
          type: 'input',
          name: 'version',
          message: 'Version',
          default: '0.1.0-SNAPSHOT'
        }
      ];

      this.helper.prompt(prompts, questions, props => this.organization = formatters.artifactGroup(props.organization));
    },

    scala: function () {
      var prompts = [
        {
          type: 'list',
          name: 'scala',
          message: 'Scala version',
          default: '2.11.7',
          choices: [
            {name: '2.11.7', value: '2.11.7'}
          ]
        },
        {
          type: 'list',
          name: 'sbt',
          message: 'sbt version',
          default: '0.13.9',
          choices: [
            {name: '0.13.9', value: '0.13.9'}
          ]
        }
      ];

      this.helper.prompt(prompts, questions);
    }
  },

  writing: {
    base: function () {
      const rootFiles = [
        'build.sbt'
      ];

      const projectFiles = [
        'build.properties',
        'plugins.sbt'
      ];

      this.helper.copyTpl('sbt-base/project', {targetFolder: 'project', writeOnceFiles: projectFiles});
      this.helper.copyTpl('sbt-base', {writeOnceFiles: rootFiles});
    }
  }
});
