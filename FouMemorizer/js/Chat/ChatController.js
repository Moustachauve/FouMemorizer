angular
    .module('FouMemorizer')
    .controller('ChatController', ['$scope', '$rootScope', ChatController]);

function ChatController($scope, $rootScope) {

    $scope.socket = new WebSocket('ws://localhost:8181');
    $scope.chatMessages = [];

    $scope.socket.onmessage = function (mess) {
        $scope.chatMessages.push(JSON.parse(mess.data));
        $scope.$apply();
    };
    $scope.sendMessage = function (message) {
        
        var message = {
            content: message
        }

        if ($rootScope.isLoggedIn()) {
            message.username = $rootScope.getEmail();
        }
        else {
            message.username = "4chan";
        }

        $scope.socket.send(JSON.stringify(message));
        $scope.message = "";
    }

    $scope.socket.onopen = function () {
        $scope.sendMessage("s'est connecté");
    }
}