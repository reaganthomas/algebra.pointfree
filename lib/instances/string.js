function _empty() { return ''; }

Object.defineProperty(String.prototype, 'empty', {
  value: _empty,
  writable: true,
  configurable: true,
  enumerable: false
});
