'use strict';

angular.module('dim-calc.controllers', [])

.controller('PrimeCtrl', ['$scope', 'math',
  function($scope, math) {
    $scope.isPrime = function(number) {
      return math.isPrime(number);
    }

    $scope.decompose = function(number) {
      var number = math.number(number);
      $scope.number = "";
      if (number === null) {
        return;
      }
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
      $scope.number = "";
      number = math.number(number);
      if (number === null) return;
      if (number < 0) number *= -1;
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
      if (!a || !b || isNaN(a) || isNaN(b)) return;

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
      if (isNaN(newValue)) return;
      $scope.values.step = Number(newValue);

      if ($scope.values.step < 0) {
        $scope.values.step = 0;
      }
      else if ($scope.values.step > $scope.values.maxStep) {
        $scope.values.step = $scope.values.maxStep;
      }

      $scope.values.P = fractions[$scope.values.step].P;
      $scope.values.Q = fractions[$scope.values.step].Q;
      $scope.values.q = fractions[$scope.values.step].q;
    };

    $scope.calculate = function() {
      if (isNaN($scope.values.numerator)) return;
      if (!$scope.values.divisor || isNaN($scope.values.divisor)) return;

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
