var util = require('../util');
var makeType = util.makeType;
var subClass = util.subClass;
var map = require('../index').map;

var MaybeType = makeType();
var Just = subClass(MaybeType);
var Nothing = subClass(MaybeType);

var notThere = function(value) {
  return (value === undefined || value === null);
};

var Maybe = function(x) {
  return notThere(x) ? Nothing() : Just(x);
};

Maybe.Just = Just;
Maybe.Nothing = Nothing;

Nothing.prototype.concat = function(b) {
  return b;
};
Just.prototype.concat = function(b) {
  if(notThere(b.value)) return this;
  return Maybe(this.value.concat(b.value));
};

MaybeType.prototype.empty = function() { return Nothing(); };

Nothing.prototype.map = function(f) {
  return Nothing();
};
Just.prototype.map = function(f) {
  return Just(f(this.value));
};

Maybe.of = Maybe;
Nothing.prototype.of = function(x) { return Nothing(x); };
Just.prototype.of = function(x) { return Just(x); };

Nothing.prototype.ap = function(m) {
  return Nothing();
};
Just.prototype.ap = function(m) {
  return map(this.value, m);
};

Nothing.prototype.chain = function(f) {
  return this;
};
Just.prototype.chain = function(f) {
  return f(this.value);
};

Nothing.prototype.traverse = function(f, point) {
  return point(Nothing());
};
Just.prototype.traverse = function(f, point) {
  return f(this.value).map(Just);
};

Nothing.prototype.reduce = function(f) {
  return f(null);
};
Just.prototype.reduce = function(f, acc) {
  return f(acc, this.value);
};

module.exports = Maybe;
