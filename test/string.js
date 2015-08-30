require('../lib/index').expose(global);

var assert = require('assert');
var quickCheckLaws = require('./helper').quickCheckLaws;
var claire = require('claire');
var _ = claire.data;

describe('String', function() {
  quickCheckLaws({
    'Semigroup': _.Str,
    'Monoid':    _.Str
  });
});
