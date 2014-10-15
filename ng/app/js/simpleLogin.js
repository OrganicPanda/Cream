angular.module('simpleLogin', ['firebase', 'firebase.utils'])

  // a simple wrapper on simpleLogin.getUser() that rejects the promise
  // if the user does not exists (i.e. makes user required)
  .factory('requireUser', function(simpleLogin, $q) {
    return function() {
      return simpleLogin.getUser().then(function (user) {
        return user ? user : $q.reject({ authRequired: true });
      });
    }
  })

  .factory('simpleLogin', function($firebaseSimpleLogin, query, $q, $rootScope) {
    var auth = $firebaseSimpleLogin(query());
    var listeners = [];

    function statusChange() {
      fns.getUser().then(function(user) {
        fns.user = user || null;
        angular.forEach(listeners, function(fn) {
          fn(user||null);
        });
      });
    }

    var fns = {
      user: null,

      getUser: function() {
        return auth.$getCurrentUser();
      },

      twitter: function() {
        return auth.$login('twitter');
      },

      logout: function() {
        auth.$logout();
      },

      watch: function(cb, $scope) {
        fns.getUser().then(function(user) {
          cb(user);
        });
        listeners.push(cb);
        var unbind = function() {
          var i = listeners.indexOf(cb);
          if( i > -1 ) { listeners.splice(i, 1); }
        };
        if( $scope ) {
          $scope.$on('$destroy', unbind);
        }
        return unbind;
      }
    };

    $rootScope.$on('$firebaseSimpleLogin:login', statusChange);
    $rootScope.$on('$firebaseSimpleLogin:logout', statusChange);
    $rootScope.$on('$firebaseSimpleLogin:error', statusChange);
    statusChange();

    return fns;
  });
