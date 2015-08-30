(function() {
  'use strict';

  var Constructor = function(f) {
    var X = function() {
      if(!(this instanceof X)) {
        var inst = new X();
        f.apply(inst, arguments);
        return inst;
      }
      f.apply(this, arguments);
    };

    return X;
  };

  var makeType = function(f) {
    f = f || function(v) { this.value = v; };
    return Constructor(f);
  };

  var subClass = function(Superclass, constructr) {
    var x = makeType();
    x.prototype = new Superclass();
    x.prototype.constructor = constructr;
    return x;
  };

  var K = function(x) { return function() { return x; }; };
  var I = function(x) { return x; };

  module.exports = {
    Constructor: Constructor,
    makeType:    makeType,
    subClass:    subClass,
    K:           K,
    I:           I
  };
})();
