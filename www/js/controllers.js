'use strict';

angular.module('dim-calc.controllers', [])

.controller('PrimeCtrl', ['$scope', '$stateParams', 'math',
  function($scope, $stateParams, math) {
    $scope.number = $stateParams.number || null;

    $scope.isPrime = function(number) {
      return math.isPrime(number);
    }

    $scope.decompose = function(number) {
      $scope.number = "";
      if (!number || isNaN(number)) {
        $scope.decomposed = false;
        return;
      }
      var primes = math.decompose(number);
      $scope.primes = Object.keys(primes);
      $scope.multiples = primes;
      $scope.decomposed = true;
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
      if (!number || isNaN(number)) return;
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
    $scope.calculate = function(numerator, divisor) {

    };
  }]);
