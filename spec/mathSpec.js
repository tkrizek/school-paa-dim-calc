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

  it('decompose a composite number to primes', function() {
    expect(math.decompose(84)).toEqual({2: 2, 3: 1, 7: 1});
    expect(math.decompose(18576)).toEqual({2: 4, 3: 3, 43: 1});
    expect(math.decompose(1549)).toEqual({1549: 1});
  });

  it('calculates greatest common divisor for a list of numbers', function () {
    expect(math.nsd([65])).toBe(65);
    expect(math.nsd([123, 123])).toBe(123);
    expect(math.nsd([144, 540])).toBe(36);
    expect(math.nsd([10200, 15300, 66300, 20400])).toBe(5100);
    expect(math.nsd([122, 544, 321, 98])).toBe(1);
  })

  it('calculates least common multiple for a list of numbers', function() {
    expect(math.nsn([65])).toBe(65);
    expect(math.nsn([123, 123])).toBe(123);
    expect(math.nsn([144, 540])).toBe(2160);
    expect(math.nsn([10200, 15300, 66300, 20400])).toBe(795600);
    expect(math.nsn([122, 221, 107])).toBe(2884934);
  })
});