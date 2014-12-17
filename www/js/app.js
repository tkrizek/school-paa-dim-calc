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
      templateUrl: "templates/menu.html"
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

    .state('app.nsd_nsn', {
      url: "/nsd_nsn",
      views: {
        'menuContent' :{
          templateUrl: "templates/nsd_nsn.html",
          controller: 'NsdNsnController'
        }
      }
    })

    .state('app.euklid', {
      url: "/euklid",
      views: {
        'menuContent' :{
          templateUrl: "templates/euklid.html",
          controller: 'EuklidController'
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
      var n = primes[primes.length - 1];
      
      // test if n is prime by looking for a prime divisor
      while (++n) {
        var sqrt = Math.sqrt(n);
        var isPrime = true;
        for (var i = 0; i < primes.length && primes[i] <= sqrt; i++) {
          if (n % primes[i] == 0) {
            isPrime = false;
            break;
          }
        }
        if (isPrime) {
          primes.push(n);
          if (n >= target) break;
        }
      }

      return primes;
    };

    my.isPrime = function(number) {
      // generate more primes if the last cached prime is not higher than current number
      if (number > primes[primes.length - 1]) {
        this.generatePrimes(number);
      }

      // look for the number in the list of primes
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

      // test if number is divisible by primes up to square root of the number
      for (var i = 0; primes[i] <= sqrt && i < primes.length; i++) {
        while (number % primes[i] == 0) {
          number /= primes[i];
          decomposition[primes[i]] = (decomposition[primes[i]] || 0) + 1;
        }
      }

      // if the number wasn't divided all the way to 1, it has to be prime
      if (number != 1) {
        decomposition[number] = 1;
      }

      return decomposition;
    }

    my.nsd = function(numbers) {
      var decomposed_numbers = [];
      var primes = {};  // primes that appear in all numbers
      var nsd = 1;

      // decompose all numbers to primes
      for (var i = 0; i < numbers.length; i++) {
        decomposed_numbers[i] = this.decompose(numbers[i]);

        // add primes of this number to a list of all primes
        Object.keys(decomposed_numbers[i]).forEach(function (prime) {
          prime = Number(prime);
          primes[prime] = prime;  // use key to prevent duplication
        });
      }

      // get maximum exponent for each prime
      Object.keys(primes).forEach(function(prime) {
        var count_total = Number.MAX_VALUE;
        for (var j = 0; j < decomposed_numbers.length; j++) {
          var count = decomposed_numbers[j][prime] || 0;
          if (count_total > count) count_total = count;
          if (count == 0) break;
        }
        nsd *= Math.pow(prime, count_total);
      });

      return nsd;
    }

    my.nsn = function(numbers) {
      var primes = {};  // all primes of the numbers (in highest multiple)
      var decomposed;
      var nsn = 1;

      for (var i = 0; i < numbers.length; i++) {
        decomposed = this.decompose(numbers[i]);

        // set highest multiple of prime number
        Object.keys(decomposed).forEach(function(prime) {
          if (primes[prime] < decomposed[prime] || primes[prime] == undefined) {
            primes[prime] = decomposed[prime];
          }
        });
      }

      // multiply all the prime compositors to get lcm (nsn)
      Object.keys(primes).forEach(function(prime) {
        nsn *= Math.pow(prime, primes[prime]);
      });

      return nsn;
    }

    my.euklid = function(a, b) {
      var params = [];
      var step = {};

      step.a = a;
      step.b = b;

      do {
        step.q = Math.floor(step.a / step.b);
        step.r = step.a % step.b;

        // deep copy of step object
        params.push(JSON.parse(JSON.stringify(step)));

        step.a = step.b;
        step.b = step.r;
      } while(step.r != 0);

      return params;
    }

    return my;
  }(math || {}));

  return math;

});

