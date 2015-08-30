require('../lib/index').expose(global);

var Constant = require('../lib/instances/const');
var Const = Constant.Const;
var getConst = Constant.getConst;
var quickCheckLaws = require('./helper').quickCheckLaws;
var assert = require('assert');
var claire = require('claire');
var _ = claire.data;
var forAll = claire.forAll;

var ConstGen = claire.transform(Const, _.Str);

describe('Const', function() {
  quickCheckLaws({ 'Functor': ConstGen });

  describe('Functor', function() {
    it('ignores map entirely', function() {
      function ignored(x) { return x + 'this will not happen'; }
      assert.deepEqual(map(ignored, Const('hi')), Const('hi'));
    });
  });

  describe('Applicative', function() {
    it('concats values if value is a monoid', function() {
      assert.deepEqual(Const('1').ap(Const('2')), Const('12'));
    });
  });
});
