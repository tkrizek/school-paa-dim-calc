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
  });

  it('calculates least common multiple for a list of numbers', function() {
    expect(math.nsn([65])).toBe(65);
    expect(math.nsn([123, 123])).toBe(123);
    expect(math.nsn([144, 540])).toBe(2160);
    expect(math.nsn([10200, 15300, 66300, 20400])).toBe(795600);
    expect(math.nsn([122, 221, 107])).toBe(2884934);
  });

  it('calculates variables of Euklid alg. for a/b', function() {
    expect(math.euklid(30, 17)).toEqual([
      {a: 30, b: 17, q: 1, r: 13},
      {a: 17, b: 13, q: 1, r: 4},
      {a: 13, b: 4, q: 3, r: 1},
      {a: 4, b: 1, q: 4, r: 0}]);

    expect(math.euklid(12084, 8604)).toEqual([
      {a: 12084, b: 8604, q: 1, r: 3480},
      {a: 8604, b: 3480, q: 2, r: 1644},
      {a: 3480, b: 1644, q: 2, r: 192},
      {a: 1644, b: 192, q: 8, r: 108},
      {a: 192, b: 108, q: 1, r: 84},
      {a: 108, b: 84, q: 1, r: 24},
      {a: 84, b: 24, q: 3, r: 12},
      {a: 24, b: 12, q: 2, r: 0}]);
  });

  it('calculates approximate fractions for a/b', function() {
    expect(math.approximateFractions(216, 82)).toEqual([
      {P: 1, Q: 0, q: null},
      {P: 2, Q: 1, q: 2},
      {P: 3, Q: 1, q: 1},
      {P: 5, Q: 2, q: 1},
      {P: 8, Q: 3, q: 1},
      {P: 21, Q: 8, q: 2},
      {P: 29, Q: 11, q: 1},
      {P: 108, Q: 41, q: 3}]);
  });

  it('calculate congruency ax ≅ b (mod m) where gcd(a, m) = 1', function() {
    expect(math.congruency(285, 313, 169)).toBe(77);
  });

  it('converts string/number to integer', function() {
    expect(math.number('00003')).toBe(3);
    expect(math.number('z3')).toBe(null);
    expect(math.number('')).toBe(null);
    expect(math.number('0')).toBe(0);
    expect(math.number(0)).toBe(0);
    expect(math.number('-14')).toBe(-14);
    expect(math.number(-3)).toBe(-3);
    expect(math.number('3.14')).toBe(3);
    expect(math.number(3.54)).toBe(4);
    expect(math.number('3q')).toBe(null);
  });
});