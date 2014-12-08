'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('dim-calc', ['ionic', 'dim-calc.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.decomposition', {
      url: "/decomposition",
      views: {
        'menuContent' :{
          templateUrl: "templates/decomposition.html",
          controller: 'PrimeCtrl'
        }
      }
    })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/decomposition');
})

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
})

.factory('math', function() {

  var math = (function(my) {

    var primes = [2];

    // generate primes so target is equal or less than last prime
    my.generatePrimes = function(target) {
      var n = primes[primes.length - 1]
      while (true) {
        // test if the new number is prime
        var isPrime = true;
        for (var i = 0; i < primes.length; i++) {
          if (n % primes[i] == 0) {
            isPrime = false;
            break;
          }
        }
        if (isPrime) {
          primes.push(n);
          if (n >= target) break;
        }
        n++;
      };

      return primes;
    };

    my.isPrime = function(number) {
      if (number > primes[primes.length - 1]) {
        this.generatePrimes(number);
      }
      for (var i = 0; i < primes.length; i++) {
        if (primes[i] == number) {
          return true;
        } else if (primes[i] > number) {
          return false;
        }
      }
      return false;
    };

    my.decompose = function(number) {
      var decomposition = {};
      var sqrt = Math.sqrt(number);
      if (sqrt > primes[primes.length - 1]) {
        this.generatePrimes(sqrt);
      }

      for (var i = 0; primes[i] <= sqrt && i < primes.length; i++) {
        while (number % primes[i] == 0) {
          number /= primes[i];
          if (decomposition[primes[i]] == undefined) {
            decomposition[primes[i]] = 1;
          } else {
            decomposition[primes[i]] += 1;
          }
        }
      }

      if (number != 1) {  // is prime
        decomposition[number] = 1;
      }

      return decomposition;
    }

    my.nsd = function(numbers) {

    }

    return my;
  }(math || {}));

  return math;

});

