angular
    .module('FouMemorizer')
    .controller('NavigationController', ['$scope', '$rootScope', NavigationController]);

function NavigationController($scope, $rootScope) {

    $scope.showLoading = false;
    $scope.currentTemplate = "/js/Memo/MemoList.html";

    $rootScope.startLoading = function () {
        $scope.showLoading = true;
    }

    $rootScope.stopLoading = function () {
        $scope.showLoading = false;
    }
}