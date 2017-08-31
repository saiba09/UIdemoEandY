EYApp.controller('chatbotCtrl', ['$scope', '$state', '$timeout', '$http', 'chatService', function($scope, $state, $timeout, $http, chatService){
	var chatData;
	var	sessionId = generateSessionId();
	$scope.chatArray = [];	
	
	$scope.keyPressed = function(event)
	{
		var keyCode = event.which || event.keyCode;
		if (keyCode === 13) 
		{	
			var msg = $scope.message;
			chatData={
					"message" : msg,
					"btn" : []
				};
			$scope.chatArray.push(chatData);
			$scope.message="";
			
			$scope.callPostService(msg);
		}		
	}
	
	$scope.optionSelected = function(option)
	{
		chatData={
				"message" : option,
				"btn" : []
			};
		$scope.chatArray.push(chatData);
		$scope.callPostService(option);
	}

	$scope.callPostService =  function(msg)
	{
		var p = chatService.postChat(sessionId, msg);	
			p.then(function(response)
			{
				$scope.chatArray.push(parseResponse(response.data.displayText));
			},
			function(error){
			   console.log(errorMsg+' '+error);
			});
	}
	
	function parseResponse(response)
	{
		var btns = [];
		var data = response;
		
		var btnData = data.split(":ob");
		data = btnData[0].replace(/\\n/g, '<br />');
		data = data.replace(/\n/g, '<br />');
		
		for(var i=1;i<btnData.length;i++)
		{
			btnData[i] = btnData[i].replace(":cb","");
			btns.push(btnData[i]);
		}

		chatData={
					"message" : data,
					"btn" : btns
				};
		return chatData;
	}
	
	
	function generateSessionId() 
	{
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	  for (var i = 0; i < 6; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
		
		return text;
	}
	
}]);