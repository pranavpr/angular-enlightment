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
  .controller('MainCtrl', function ($scope) {
  	var rootRef = new Firebase('https://popping-fire-8603.firebaseio.com/');
  	var childRef = rootRef.child('message');

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
