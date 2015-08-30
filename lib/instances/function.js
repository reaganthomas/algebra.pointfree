function _K(x) { return function(y) { return x; }; }

function _map(g) {
  var f = this;
  return function(x) { return g(f(x)); };
}

Object.defineProperty(Function.prototype, 'map', {
  value: _map,
  writable: true,
  configurable: true,
  enumerable: false
});

function _concat(g) {
  var f = this;
  return function() { return f.apply(this, arguments).concat(g.apply(this, arguments)); };
}

Object.defineProperty(Function.prototype, 'concat', {
  value: _concat,
  writable: true,
  configurable: true,
  enumerable: false
});

function _empty() { return _K({ concat: function(g) { return g.empty().concat(g); } }); }

Object.defineProperty(Function.prototype, 'empty', {
  value: _empty,
  writable: true,
  configurable: true,
  enumerable: false
});

function _chain(g) {
  var f = this;
  return function(x) { return g(f(x), x); };
}

Object.defineProperty(Function.prototype, 'chain', {
  value: _chain,
  writable: true,
  configurable: true,
  enumerable: false
});

var _of = _K;

Object.defineProperty(Function.prototype, 'of', {
  value: _of,
  writable: true,
  configurable: true,
  enumerable: false
});

function _ap(g) {
  var f = this;
  return function(x) { return f(x)(g(x)); };
}

Object.defineProperty(Function.prototype, 'ap', {
  value: _ap,
  writable: true,
  configurable: true,
  enumerable: false
});
