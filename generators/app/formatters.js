'use strict';

const _ = require('underscore.string');

var Formatter = function () {

  var artifactGroup = function(source) {
    return source.toLowerCase();
  };

  var artifactName = function(source) {
    return _words(_.dasherize(source));
  };

  var _words = function(source) {
    return source.replace(/\W/g, '');
  };

  return {
    artifactName: artifactName,
    artifactGroup: artifactGroup
  };

};

module.exports = Formatter();

