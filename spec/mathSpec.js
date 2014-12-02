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

  it('return a list of primes up to nearest greatest prime than n', function() {
    expect(math.generatePrimes(23)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23]);
    expect(math.generatePrimes(24)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  });

  it('tells if n is a prime', function() {
    expect(math.isPrime(1)).toBe(false);
    expect(math.isPrime(2)).toBe(true);
    expect(math.isPrime(25)).toBe(false);
    expect(math.isPrime(29)).toBe(true);
    expect(math.isPrime(1549)).toBe(true);
  });

  it('decompose a composite number to primes', function() { });

});