(function() {
  'use strict';

  var curry = require('lodash.curry');

  require('./instances/array');
  require('./instances/function');
  require('./instances/string');

  function id(x) { return x; }
  function K(x) { return function() { return x; }; }

  var _compose = curry(function(f, g, x) { return f(g(x)); });

  var _groupsOf = curry(function(n, xs) {
    if(!xs.length) return [];
    return [ xs.slice(0, n) ].concat(_groupsOf(n, xs.slice(n, xs.length)));
  });

  var toAssociativeCommaInfix = function(fn) {
    return function() {
      var functions = [].slice.call(arguments);

      return function() {
        return _groupsOf(2, functions).reverse().map(function(g) {
          return (g.length > 1) ? fn.apply(this, g) : g[0];
        }).reduce(function(x, f) {
          return [f.apply(f, x)];
        }, arguments)[0];
      };
    };
  };

  /**
    compose

    Right-to-left function composition.

    `f`: function
    `g`: function
    `x`: value passed in to first function
  **/
  var compose = toAssociativeCommaInfix(_compose);

  /**
    map

    maps a function, `f`, over a structure `u`.
    Uses fmap function of `u` if available.

    `f`: function
    `u`: structure that implements `fmap` or `map`
  **/
  var map = curry(function(f, u) {
    return u.fmap ? u.fmap(f) : u.map(f);
  });

  /**
    ap

    Applies the function in applicative `a1` to the value in the applicative `a2`.

    `a1`: applicative containing a function
    `a2`: applicative containing any value
  **/
  var ap = curry(function(a1, a2) {
    return a1.ap(a2);
  });

  /**
    liftA2

    TODO: need docs
  **/
  var liftA2 = curry(function(f, x, y) {
    return map(f, x).ap(y);
  });

  /**
    liftA3

    TODO: need docs
  **/
  var liftA3 = curry(function(f, x, y, z) {
    return map(f, x).ap(y).ap(z);
  });

  /**
    chain

    Applies the function `f` to the chainable structure `mv`.

    `f`:  function that returns a structure of the same type as `mv`
    `mv`: chainable structure of any value
  **/
  var chain = curry(function(f, mv) {
    return mv.chain(f);
  });

  /**
    mjoin

    Flattens an algebraic structure.

    `mmv`: structure to flatten, ex `Functor(Functor(String))`
  **/
  var mjoin = function(mmv) {
    return chain(id, mmv);
  };

  /**
    concat

    Concatenates contents of structure `y` to structure `x`.

    `x`: structure implementing concat
    `y`: structure containing value
  **/
  var concat = curry(function(x, y) {
    return x.concat(y);
  });

  /**
    mconcat

    Monoidal reduction.
  **/
  var mconcat = function(xs, empty) {
    return xs.length ? xs.reduce(concat) : empty();
  };

  /**
    sequenceA

    TODO: need docs
  **/
  var sequenceA = curry(function(point, fctr) {
    return fctr.traverse(id, point);
  });

  /**
    of

    TODO: need docs
  **/
  var of = function(x) {
    return x.of;
  };

  /**
    traverse

    TODO: need docs
  **/
  var traverse = curry(function(f, point, fctr) {
    return compose(sequenceA(point), map(f))(fctr);
  });

  /**
    foldMap

    TODO: need docs
  **/
  var foldMap = curry(function(f, fldable) {
    return fldable.reduce(function(acc, x) {
      var r = f(x);
      acc = acc || r.empty();
      return acc.concat(r);
    }, null);
  });

  /**
    fold

    TODO: need docs
  **/
  var fold = foldMap(id);

  /**
    toList

    TODO: need docs
  **/
  var toList = function(x) {
    return x.reduce(function(acc, y) {
      return [y].concat(acc);
    }, []);
  };

  /**
    expose

    Adds methods of api to passed in `env`.
  **/
  var expose = function(env) {
    for(var f in api) {
      if(f !== 'expose' && api.hasOwnProperty(f)) {
        env[f] = api[f];
      }
    }
  };

  var api = {
    I: id,
    K: K,
    compose: compose,
    curry: curry,
    map: map,
    ap: ap,
    liftA2: liftA2,
    liftA3: liftA3,
    chain: chain,
    mjoin: mjoin,
    concat: concat,
    mappend: concat,
    mconcat: mconcat,
    sequenceA: sequenceA,
    traverse: traverse,
    foldMap: foldMap,
    fold: fold,
    toList: toList,
    expose: expose
  };

  module.exports = api;
})();
