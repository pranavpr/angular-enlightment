'use strict';
/* global Firebase */
/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function($scope, $timeout) {
    var rootRef = new Firebase('https://popping-fire-8603.firebaseio.com/');
    var messagesRef = rootRef.child('messages');
    var titleRef = rootRef.child('title');

    $scope.currentUser = null;
    $scope.currentText = null;
    $scope.messages = [];
    $scope.title = null;

    titleRef.once('value', function(snapshot) {
      $scope.title = snapshot.val();
    });

    messagesRef.on('child_added', function(snapshot) {
      $timeout(function() {
        var snapshotVal = snapshot.val();
        console.log(snapshotVal);
        $scope.messages.push({
          text: snapshotVal.text,
          user: snapshotVal.user,
          key: snapshot.key()
        });
      });
    });

    messagesRef.on('child_changed', function(snapshot) {
      $timeout(function() {
        var snapshotVal = snapshot.val();
        console.log(snapshotVal);
        var message = findMessageByKey(snapshot.key());
        message.text = snapshotVal.text;
      });
    });

    messagesRef.on('child_removed', function(snapshot) {
      $timeout(function() {
        var snapshotVal = snapshot.val();
        console.log(snapshotVal);
        deleteMessageByKey(snapshot.key());
      });
    });

    function deleteMessageByKey (key) {
      for (var i = 0; i < $scope.messages.length; i++) {
        var currentMessage = $scope.messages[i];
        if (currentMessage.key === key) {
          $scope.messages.splice(i, 1);
          break;
        }
      }
    }

    function findMessageByKey (key) {
      var messageFound = null;
      for (var i = 0; i < $scope.messages.length; i++) {
        var currentMessage = $scope.messages[i];
        if (currentMessage.key === key) {
          messageFound = currentMessage;
          break;
        }
      }
      return messageFound;
    }

    $scope.sendMessage = function() {
      var newMessage = {
        user: $scope.currentUser,
        text: $scope.currentText
      };
      messagesRef.push(newMessage);
      $scope.currentUser = null;
      $scope.currentText = null;
    };

    $scope.turnFeedOff = function() {
      messagesRef.off();
    };

  });