require('../lib/index').expose(global);

var assert = require('assert');
var quickCheckLaws = require('./helper').quickCheckLaws;
var claire = require('claire');
var _ = claire.data;
var Identity = require('../lib/instances/identity').Identity;

var IdentityGen = claire.transform(Identity, _.Str);

describe('Identity', function() {
  quickCheckLaws({
    'Semigroup':   IdentityGen,
    'Monoid':      IdentityGen,
    'Functor':     IdentityGen,
    'Applicative': IdentityGen,
    'Monad':       IdentityGen });
});
