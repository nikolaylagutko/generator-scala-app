'use strict';

const jsc = require('jsverify');
const formatters = require('../generators/app/formatters.js');
const R = require('ramda');
const _ = require('underscore.string');

describe('formatters', function () {
  it('leaves only good character in artifact name', function () {
    var property = jsc.forall(jsc.asciistring, function (input) {
      var result = formatters.artifactName(input);

      return R.all(isArtifactName)(_.chars(result));
    });

    jsc.assert(property);
  });

  it('lowercases everything for artifact group', function () {
    var property = jsc.forall(jsc.asciistring, function (input) {
      var result = formatters.artifactGroup(input);

      return R.all(isLowercased)(_.chars(result));
    });

    jsc.assert(property);
  });

  function isArtifactName(char) {
    return isLetter(char) || isNumber(char) || isLowercased(char);
  }

  function isLowercased(char) {
    return char === char.toLowerCase();
  }

  function isNumber(char) {
    return char.match(/[0-9]/);
  }

  function isLetter(char) {
    return char.match(/[a-z]/i);
  }
});
