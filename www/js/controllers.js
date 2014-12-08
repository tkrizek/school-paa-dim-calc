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

.controller('PrimeCtrl', ['$scope', '$stateParams', '$state', 'math',
  function($scope, $stateParams, $state, math) {
    $scope.number = $stateParams.number || null;
    
    $scope.compute = function () {
      var n = $scope.number;
      if (math.isPrime(n)) {
        // TODO
        $scope.result = n + ' je prvočíslo';
      }
    }

    $scope.isPrime = function(number) {
      return math.isPrime(number);
    }

    $scope.decompose = function(number) {
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
);
