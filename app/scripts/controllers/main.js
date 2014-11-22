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
  	var childRef = rootRef.child('message');

  	childRef.on('value', function(snapshot) {
  		snapshot.forEach(function(item){
  			console.log(item.key() + ' - ' + item.val());
  		});
  		$timeout(function() {
  			console.log(snapshot.val());
  			$scope.message = snapshot.val();
  		});
  	});

  	$scope.$watch('message.text', function(newVal){
  		if(!newVal) {
  			return;
  		}
  		childRef.update({
  			text: newVal
  		});
  	});
  	$scope.setMessage = function()
  	{
  		childRef.set({
  			user: 'Bob',
  			text: 'Hi'
  		});
  	};

  	$scope.updateMessage = function()
  	{
  		childRef.update({
  			text: 'Bye'
  		});
  	};

  	$scope.deleteMessage = function()
  	{
  		childRef.remove();
  	};
  });
