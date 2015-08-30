require('../lib/index').expose(global);

var assert = require('assert');
var quickCheckLaws = require('./helper').quickCheckLaws;
var claire = require('claire');
var _ = claire.data;
var forAll = claire.forAll;
var asGenerator = claire.asGenerator;

function stubFn() { return function() { return _.Str.next().value; }; }
var FunGen = asGenerator(stubFn);

describe('Function', function() {
  function f(x) { return x + 'hello'; }
  function g(x) { return x + 'world'; }

  describe('Monoid', function() {
    it('runs the functions then concats the values together', function() {
      assert.equal(mappend(f, g)(' bla '), ' bla hello bla world');
      assert.equal(mconcat([f, g])(' bla '), ' bla hello bla world');
    });
  });

  describe('Functor', function() {
    it('composes the functions', function() {
      assert.equal(map(g, f)(' bla '), ' bla helloworld');
    });
  });

  describe('Applicative', function() {
    it('runs each function with the arg then passes the results on', function() {
      var h = curry(function(x, y) { return x.toUpperCase() + y.toLowerCase(); });
      assert.equal(liftA2(h, f, g)(' bla '), ' BLA HELLO bla world');
    });

    it('runs each function with the arg then passes the results on (with 3)', function() {
      var h = curry(function(x, y, z) { return x.toUpperCase() + y.toLowerCase() + z; });
      function i(z) { return z + 'last'; }
      assert.equal(liftA3(h, f, g, i)(' bla '), ' BLA HELLO bla world bla last');
    });
  });
});
