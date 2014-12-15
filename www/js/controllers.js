'use strict';

angular.module('dim-calc.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

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
  }]
)

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
  }]);
