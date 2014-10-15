angular.module('firebase.utils', ['firebase', 'myApp.config'])

  .factory('query', function($window, FBURL) {
    return function(path) {
      return new $window.Firebase(path ? FBURL + path: FBURL);
    }
  });