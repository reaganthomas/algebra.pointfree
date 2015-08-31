require('../lib/index').expose(global);

var assert = require('assert');
var quickCheckLaws = require('./helper').quickCheckLaws;
var Sum = require('algebra.structures.sum');
var claire = require('claire');
var Maybe = require('../lib/instances/maybe');
var _ = claire.data;
var forAll = claire.forAll;

describe('Array', function() {
  quickCheckLaws({
    'Semigroup': _.Array(_.Int),
    'Monoid': _.Array(_.Int),
    'Functor': _.Array(_.Int),
    'Applicative': _.Array(_.Int),
    'Monad': _.Array(_.Int)
  });

  it('is traversable', function() {
    function f(x) { return Maybe(x); }
    var xs = [1, 2];
    assert.deepEqual(traverse(f, Maybe.of, xs), Maybe([1,2]));
  });

  it('is foldable', function() {
    assert.deepEqual(foldMap(Sum, [1,2,3]), Sum(6));
  });
});
