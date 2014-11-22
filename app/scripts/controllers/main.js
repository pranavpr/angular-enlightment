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
  .controller('MainCtrl', function ($scope, $timeout) {
  	var rootRef = new Firebase('https://popping-fire-8603.firebaseio.com/');
  	var messagesRef = rootRef.child('messages');

  	$scope.currentUser = null;
  	$scope.currentText = null;

  	messagesRef.on('value', function(snapshot) {
  		$timeout(function() {
  			var snapshotVal = snapshot.val();
  			$scope.messages = snapshotVal;
  		});
  	});

  	$scope.sendMessage = function() {
  		var newMessage = {
  			user: $scope.currentUser,
  			text: $scope.currentText
  		};
  		messagesRef.push(newMessage);
  	};

  });
