'use strict';

const _ = require('underscore.string');

var Formatter = function () {
  var words = function (source) {
    return source.replace(/\W/g, '');
  };

  var artifactGroup = function (source) {
    return source.toLowerCase();
  };

  var artifactName = function (source) {
    return words(_.dasherize(source));
  };

  return {
    artifactName: artifactName,
    artifactGroup: artifactGroup
  };
};

module.exports = new Formatter();

