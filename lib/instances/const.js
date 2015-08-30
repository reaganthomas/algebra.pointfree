var ConstType = function(value) {
  this.value = value;
};

var getConst = function(c) { return c.value; };

var Const = function(value) {
  return new ConstType(value);
};

ConstType.prototype.map = function(f) {
  return Const(this.value);
};

// Const is applicative if x is monoid
ConstType.prototype.of = function(x) {
  return Const(x.empty());
};

ConstType.prototype.ap = function(c2) {
  return Const(this.value.concat(c2.value));
};

// const is no monad

module.exports = {
  Const: Const,
  getConst: getConst
};
