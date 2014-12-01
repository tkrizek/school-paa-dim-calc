describe('math service', function() {
  var $scope = null;
  var math = null;

  //you need to indicate your module in a test
  beforeEach(module('dim-calc'));

  beforeEach(inject(function($rootScope, math) {
    $scope = $rootScope.$new();
    this.math = math;
  }));

  it('should have a working math service', function() {
    expect(math).toBeDefined();
  });

  it('return a list of primes up to n', function() {});

  it('tells if n is a prime', function() {});

  it('decompose a composite number to primes', function() { });

});