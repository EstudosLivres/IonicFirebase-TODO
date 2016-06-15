// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module("starter", ["ionic", "firebase"])

// To save data & sync data with firebase, we'll create an Items factory that uses $firebaseArray
.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://todo-32c55.firebaseio.com/items");
  return $firebaseArray(itemsRef);
})

// Auth factory
.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https//todo-32c55.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})

// List Controller definition (on params we have injected the Items & Auth factory, which are reusables)
.controller("ListCtrl", function($scope, Items, Auth) {
  $scope.items = Items;
  $scope.addItem = function() {
    // Prompt to type the item
    var name = prompt("What do you need to buy?");
    if (name) {
      // append it typed item to the firebase
      $scope.items.$add({
        "name": name
      });
    }
  };

  // Facebook firebase auth method
  $scope.login = function() {
    // considering only device: Auth.$authWithOAuthRedirect("facebook");

    // Workaround to run it code on emulate & from device
    Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
      // User successfully logged in
    }).catch(function(error) {
      if (error.code === "TRANSPORT_UNAVAILABLE") {
        Auth.$authWithOAuthPopup("facebook").then(function(authData) {
          // User successfully logged in. We can log to the console
          // since we’re using a popup here
          console.log(authData);
        });
      } else {
        // Another error occurred
        console.log(error);
      }
    });
  };

  // Listener which listen the Auth state change
  Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log("Not logged in yet");
    } else {
      console.log("Logged in as", authData.uid);
    }

    $scope.authData = authData; // This will display the user's name in our view
  });
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
