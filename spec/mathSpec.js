'use strict';

describe('math service', function() {
  var math;

  //you need to indicate your module in a test
  beforeEach(module('dim-calc'));

  beforeEach(inject(function(_math_) {
    math = _math_;
  }));

  it('should have a working math service', function() {
    expect(math).toBeDefined();
  });

  it('return a list of primes up to n', function() {});

  it('tells if n is a prime', function() {});

  it('decompose a composite number to primes', function() { });

});