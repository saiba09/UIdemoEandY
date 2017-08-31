EYApp.service('chatService', ['$http','Constants', '$q', function ($http,Constants, $q) {
    return {
        
        postChat: function(sessionId, message){
            var req = {
                url:  '/ai?sessionId=' + sessionId + '&message=' + message,
                method: 'POST'
            };
            return $http(req);
        }
    }
}]);

EYApp.service('topicService', ['$http','Constants', '$q', function ($http,Constants, $q) {
    var constants = Constants.getConstants();
    var topicUrl = constants.avapiUrl;
    return {
        
        createTopic: function(topicData){
            var req = {
                url: '/addTopic',
                method: 'POST',
				data : topicData
            };
            return $http(req);
        }
    }
}]);