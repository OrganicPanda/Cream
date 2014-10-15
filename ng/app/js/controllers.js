angular.module('myApp.controllers', ['firebase.utils', 'simpleLogin'])

  .controller('HomeCtrl', function($scope, user) {
    $scope.user = user;
  })

  .controller('ChatCtrl', function($scope, $firebase, query) {
    var transactions = $firebase(query('transactions').limit(10));

    $scope.transactions = transactions.$asArray();
    $scope.newTransaction = {};

    $scope.addTransaction = function() {
      if ($scope.newTransaction) {
        $scope.transactions.$add($scope.newTransaction);
      }

      $scope.newTransaction = {};
    };
  })

  .controller('LoginCtrl', function($scope, simpleLogin, $location) {
    $scope.twitter = function() {
      $scope.err = null;
      return simpleLogin.twitter()
        .then(function(/* user */) {
          $location.path('/account');
        }, function(err) {
          $scope.err = errMessage(err);
        });
    };

    function errMessage(err) {
      return angular.isObject(err) && err.code? err.code : err + '';
    }
  })

  .controller('AccountCtrl', function($scope, simpleLogin, $firebase, query, user, $location) {
    var profile = $firebase(query('users').child(user.uid)).$asObject();

    // create a 3-way binding with the user profile object in Firebase
    profile.$bindTo($scope, 'profile');

    // expose logout function to scope
    $scope.logout = function() {
      profile.$destroy();
      simpleLogin.logout();
      $location.path('/login');
    };
  });