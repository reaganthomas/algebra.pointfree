var Constructor = require('../util').Constructor;

function inspect(x) {
  if(x === null || x === undefined) return 'null';
  return x.inspect ? x.inspect() : x;
}

function getResult(x) { return x.value; }

var Max = Constructor(function(value) {
  this.value = value;
});

Max.prototype.empty = function() { return Max(Number.MIN_VALUE); };
Max.prototype.concat = function(s2) { return Max(this.value > s2.value ? this.value : s2.value); };
Max.prototype.inspect = function(f) { return 'Max(' + inspect(this.value) + ')'; };

var Min = Constructor(function(value) {
  this.value = value;
});

Min.prototype.empty = function() { return Min(Number.MAX_VALUE); };
Min.prototype.concat = function(s2) { return Min(this.value < s2.value ? this.value : s2.value); };
Min.prototype.inspect = function(f) { return 'Min(' + inspect(this.value) + ')'; };

var Sum = Constructor(function(value) {
  this.value = value;
});

Sum.prototype.empty = function() { return Sum(0); };
Sum.prototype.concat = function(s2) { return Sum(this.value + s2.value); };
Sum.prototype.inspect = function(f) { return 'Sum(' + inspect(this.value) + ')'; };

var Product = Constructor(function(value) {
  this.value = value;
});

Product.prototype.empty = function() { return Product(1); };
Product.prototype.concat = function(s2) { return Product(this.value * s2.value); };
Product.prototype.inspect = function(f) { return 'Product(' + inspect(this.value) + ')'; };

var Any = Constructor(function(value) {
  this.value = value;
});

Any.prototype.empty = function() { return Any(false); };
Any.prototype.concat = function(s2) { return Any(this.value || s2.value); };
Any.prototype.inspect = function(f) { return 'Any(' + inspect(this.value) + ')'; };

var All = Constructor(function(value) {
  this.value = value;
});

All.prototype.empty = function() { return All(true); };
All.prototype.concat = function(s2) { return All(this.value && s2.value); };
All.prototype.inspect = function(f) { return 'All(' + inspect(this.value) + ')'; };

module.exports = {
  Max:       Max,
  Min:       Min,
  Sum:       Sum,
  Product:   Product,
  Any:       Any,
  All:       All,
  getResult: getResult
};
