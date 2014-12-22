'use strict';

angular.module('dim-calc.controllers', [])

.controller('PrimeCtrl', ['$scope', 'math',
  function($scope, math) {

    $scope.decompose = function() {
      var number = math.number($scope.values.number);
      $scope.values.number = "";  // clear input

      // validate
      if (number === null || number === 1) {
        return;
      }

      // set values for view
      var primes = math.decompose(number);
      $scope.values.primes = Object.keys(primes);
      $scope.values.multiples = primes;
      $scope.values.calculated = number;
    }
  }])

.controller('NsdNsnController', ['$scope', 'math',
  function($scope, math) {

    $scope.values = {
      numbers: []
    };

    var calculate = function calculate() {
      $scope.values.nsd = math.nsd($scope.values.numbers);
      $scope.values.nsn = math.nsn($scope.values.numbers);
    };

    $scope.add = function() {
      var number = math.number($scope.values.number);
      $scope.values.number = "";  // clear input

      if (number === null || number === 0) return;
      if (number < 0) number *= -1;  // treat negative integers as positive
      
      // add number to array if not present
      if ($scope.values.numbers.indexOf(number) == -1) {
        $scope.values.numbers.push(number);
      }

      calculate();
    };

    $scope.remove = function(number) {
      var index = $scope.values.numbers.indexOf(number);
      if (index > -1) {
        $scope.values.numbers.splice(index, 1);
        calculate();
      }
    };

    $scope.removeAll = function() {
      $scope.values.numbers = [];
    };
  }])

.controller('EuklidController', ['$scope', 'math',
  function($scope, math) {

    $scope.values = {};

    $scope.calculate = function() {
      convertNumbers();
      if (!validateNumbers()) return;

      $scope.values.euklid = math.euklid($scope.values.a, $scope.values.b);
    };

    var convertNumbers = function() {
      $scope.values.a = math.number($scope.values.a);
      $scope.values.b = math.number($scope.values.b);
    };

    var validateNumbers = function() {
      var isValid = true;

      if ($scope.values.a === null || $scope.values.a < 0) {
        $scope.values.a = "";  // clear input
        isValid = false;
      }
      if ($scope.values.b === null || $scope.values.b <= 0) {
        $scope.values.b = "";  // clear input
        isValid = false;
      }

      return isValid;
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
      convertNumbers();
      if (!validateNumbers()) return;

      // proceed with calculation
      fractions = math.approximateFractions($scope.values.numerator,
        $scope.values.divisor);
      $scope.values.maxStep = fractions.length - 1;
      $scope.changeStep($scope.values.step || $scope.values.maxStep);
    };

    var convertNumbers = function() {
      $scope.values.numerator = math.number($scope.values.numerator);
      $scope.values.divisor = math.number($scope.values.divisor);
    };

    var validateNumbers = function() {
      var isValid = true;

      if ($scope.values.numerator === null || $scope.values.numerator < 0) {
        $scope.values.numerator = "";
        isValid = false;
      }
      if ($scope.values.divisor === null || $scope.values.divisor <= 0) {
        $scope.values.divisor = "";
        isValid = false;
      }

      return isValid;
    };
  }])

.controller('CongruencyController', ['$scope', 'math',
  function($scope, math) {

    $scope.calculated = {};

    $scope.calculate = function() {
      convertNumbers();
      if (!validateNumbers()) return;

      // set view variables
      $scope.calculated.a = $scope.values.a;
      $scope.calculated.b = $scope.values.b;
      $scope.calculated.m = $scope.values.m;

      // calculate solution
      $scope.calculated.solution = math.congruency($scope.values.a,
        $scope.values.b, $scope.values.m);
    };

    $scope.clear = function() {
      $scope.values = {};
      $scope.calculated = {};
    };

    var convertNumbers = function() {
      $scope.values.a = math.number($scope.values.a);
      $scope.values.b = math.number($scope.values.b);
      $scope.values.m = math.number($scope.values.m);
    };

    var validateNumbers = function() {
      var isValid = true;

      if ($scope.values.a === null || $scope.values.a <= 0) {
        $scope.values.a = "";
        isValid = false;
      }
      if ($scope.values.b === null || $scope.values.b < 0) {
        $scope.values.b = "";
        isValid = false;
      }
      if ($scope.values.m === null || $scope.values.m <= 0) {
        $scope.values.m = "";
        isValid = false;
      }

      return isValid;
    };
  }]);
