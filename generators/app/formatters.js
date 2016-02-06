'use strict';

const _ = require('underscore.string');

module.exports = {

  artifactName: artifactName,
  artifactGroup: artifactGroup

};

function artifactGroup(source) {
  return source.toLowerCase();
}

function artifactName(source) {
  return words(_.dasherize(source));
}

function words(source) {
  return source.replace(/\W/g, '');
}
