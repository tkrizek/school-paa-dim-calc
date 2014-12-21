'use strict';

angular.module('dim-calc.controllers', [])

.controller('PrimeCtrl', ['$scope', 'math',
  function($scope, math) {
    $scope.isPrime = function(number) {
      return math.isPrime(number);
    }

    $scope.decompose = function(number) {
      $scope.number = "";  // clear input

      // convert to integer and validate
      var number = math.number(number);
      if (number === null) {
        return;
      }

      // set values for view
      var primes = math.decompose(number);
      $scope.primes = Object.keys(primes);
      $scope.multiples = primes;
      $scope.calculated = number;
    }
  }])

.controller('NsdNsnController', ['$scope', 'math',
  function($scope, math) {
    $scope.numbers = [];

    var calculate = function calculate() {
      $scope.nsd = math.nsd($scope.numbers);
      $scope.nsn = math.nsn($scope.numbers);
    };

    $scope.add = function(number) {
      $scope.number = "";  // clear input
      number = math.number(number);
      if (number === null) return;
      if (number < 0) number *= -1;  // treat negative integers as positive
      
      // add number to array if not present
      if ($scope.numbers.indexOf(number) == -1) {
        $scope.numbers.push(number);
      }

      calculate();
    };

    $scope.remove = function(number) {
      var index = $scope.numbers.indexOf(number);
      if (index > -1) {
        $scope.numbers.splice(index, 1);
        calculate();
      }
    };

    $scope.removeAll = function() {
      $scope.numbers = [];
    };
  }])

.controller('EuklidController', ['$scope', 'math',
  function($scope, math) {
    $scope.calculate = function(a, b) {
      a = math.number(a);
      b = math.number(b);

      // validate numbers
      if (a === null || a < 0) {
        $scope.a = "";  // clear input
        return;
      }
      if (b === null || b <= 0) {
        $scope.b = "";  // clear input
        return;
      }

      $scope.euklid = math.euklid(a, b);
    };
  }])

.controller('ApproximateFractionsController', ['$scope', 'math',
  function($scope, math) {
    $scope.values = {
      step: null,
      maxStep: null,
      P: null,
      Q: null,
      q: null
    };

    var fractions = [];

    $scope.changeStep = function(newValue) {
      // convert number
      newValue = math.number(newValue);
      if (newValue === null) return;
      $scope.values.step = newValue;

      // validate range
      if ($scope.values.step < 0) {
        $scope.values.step = 0;
      }
      else if ($scope.values.step > $scope.values.maxStep) {
        $scope.values.step = $scope.values.maxStep;
      }

      // set corresponding values
      $scope.values.P = fractions[$scope.values.step].P;
      $scope.values.Q = fractions[$scope.values.step].Q;
      $scope.values.q = fractions[$scope.values.step].q;
    };

    $scope.calculate = function() {
      // convert to numbers
      $scope.values.numerator = math.number($scope.values.numerator);
      $scope.values.divisor = math.number($scope.values.divisor);

      // validate numbers
      if ($scope.values.numerator === null || $scope.values.numerator < 0) {
        $scope.values.numerator = "";
        return;
      }
      if ($scope.values.divisor === null || $scope.values.divisor <= 0) {
        $scope.values.divisor = "";
        return;
      };

      // proceed with calculation
      fractions = math.approximateFractions($scope.values.numerator, $scope.values.divisor);
      $scope.values.maxStep = fractions.length - 1;
      $scope.changeStep($scope.values.step || $scope.values.maxStep);
    };
  }])

.controller('CongruencyController', ['$scope', 'math',
  function($scope, math) {
    $scope.calculate = function() {

    };
  }]);
