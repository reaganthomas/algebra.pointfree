function _fmap(f) {
  var xs = this;
  return xs.map(function(x) { return f(x); }); // to avoid indexes
}

Object.defineProperty(Array.prototype, 'fmap', {
  value: _fmap,
  writable: true,
  configurable: true,
  enumerable: false
});

function _empty() { return []; }

Object.defineProperty(Array.prototype, 'empty', {
  value: _empty,
  writable: true,
  configurable: true,
  enumerable: false
});

function _flatten(xs) { return xs.reduce(function(a, b) { return a.concat(b); }, []); }
function _chain(f) { return _flatten(this.fmap(f)); }

Object.defineProperty(Array.prototype, 'chain', {
  value: _chain,
  writable: true,
  configurable: true,
  enumerable: false
});

function _of(x) { return [x]; }

Object.defineProperty(Array.prototype, 'of', {
  value: _of,
  writable: true,
  configurable: true,
  enumerable: false
});

function _ap(a2) {
  var a1 = this;

  return _flatten(a1.map(function(f) {
    return a2.map(function(a) { return f(a); });
  }));
}

Object.defineProperty(Array.prototype, 'ap', {
  value: _ap,
  writable: true,
  configurable: true,
  enumerable: false
});

function _traverse(f, point) {
  function cons_f(ys, x) { return f(x).map(function(x) { return function(y) { return y.concat(x); }; }).ap(ys); }

  return this.reduce(cons_f, point([]));
}

Object.defineProperty(Array.prototype, 'traverse', {
  value: _traverse,
  writable: true,
  configurable: true,
  enumerable: false
});
