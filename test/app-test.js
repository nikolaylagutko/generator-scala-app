'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-scala-app:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({someOption: true})
      .withPrompts({
        sbt: '0.13.8',
        name: 'My Example Project',
        organization: 'Org.Example',
        version: "0.2.0-Beta",
        scala: '2.11.6'
      })
      .on('end', done);
  });

  it('creates basic file structure', function () {
    assert.file([
      'build.sbt',
      'project/build.properties',
      'project/plugins.sbt'
    ]);
  });

  it('should contain default plugin.sbt content', function() {
    assert.fileContent('project/plugins.sbt', 'logLevel := Level.Warn');
  });

  it('should contain configured sbt version in build.properties', function() {
    assert.fileContent('project/build.properties', 'sbt.version=0.13.8')
  });

  it('should contain formatted name from prompt in build.sbt', function() {
    assert.fileContent('build.sbt', 'name := "myexampleproject"');
  });

  it('should contain organization in lowercase in build.sbt', function() {
    assert.fileContent('build.sbt', 'organization := "org.example"');
  });

  it('should contain configured version in build.sbt', function() {
    assert.fileContent('build.sbt', 'version := "0.2.0-Beta"');
  })

  it('should contain configured scala version in build.sbt', function() {
    assert.fileContent('build.sbt', 'scalaVersion := "2.11.6"');
  });
});
