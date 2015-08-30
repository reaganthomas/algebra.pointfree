require('../lib/index').expose(global);

var assert = require('assert');
var quickCheckLaws = require('./helper').quickCheckLaws;
var claire = require('claire');
var _ = claire.data;
var asGenerator = claire.asGenerator;
var monoids = require('../lib/instances/monoids');

var _stubFn = function() { return function() { return _.Str.next().value; }; };
var FunGen = asGenerator(_stubFn);

describe('Monoids', function() {
  it('gets the max', function() {
    assert.equal(monoids.getResult(mappend(monoids.Max(12), monoids.Max(20))), 20);
  });

  it('gets the min', function() {
    assert.equal(monoids.getResult(mappend(monoids.Min(12), monoids.Min(20))), 12);
  });

  it('gets the sum', function() {
    assert.equal(monoids.getResult(mappend(monoids.Sum(12), monoids.Sum(20))), 32);
  });

  it('gets the product', function() {
    assert.equal(monoids.getResult(mappend(monoids.Product(2), monoids.Product(20))), 40);
  });

  it('gets the disjunction', function() {
    assert.equal(monoids.getResult(mappend(monoids.Any(true), monoids.Any(false))), true);
    assert.equal(monoids.getResult(mappend(monoids.Any(false), monoids.Any(false))), false);
  });

  it('gets the conjunction', function() {
    assert.equal(monoids.getResult(mconcat([monoids.All(true), monoids.All(false)])), false);
    assert.equal(monoids.getResult(mappend(monoids.All(true), monoids.All(true))), true);
  });

  it('runs the functions then gets the conjunction', function() {
    var f = function(x) { return monoids.Any(x > 1); };
    var g = function(x) { return monoids.Any(x > 2); };

    assert.deepEqual(mconcat([f, g])(4, 6), monoids.Any(true));
    assert.deepEqual(mconcat([f, g])(0, 0), monoids.Any(false));
  });
});
