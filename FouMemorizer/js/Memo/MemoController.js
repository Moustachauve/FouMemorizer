angular
    .module('FouMemorizer')
    .controller('MemoController', ['$scope', '$rootScope', MemoController]);

function MemoController($scope,  $rootScope) {

    $scope.serverError = false;
    $scope.memos = [];

    $scope.getMemos = function () {
        $rootScope.startLoading();
        $.ajax({
            method: "GET",
            url: "http://localhost:3791/api/Memos",
        })
        .done(function (data) {
            $rootScope.stopLoading();
            $scope.memos = data;
            $scope.$apply();
        }).fail(function () {
            $scope.serverError = true;
            $rootScope.stopLoading();
            $scope.$apply();
        });
    }

    $scope.addMemo = function (memo) {
        $rootScope.startLoading();
        $.ajax({
            method: "POST",
            url: "http://localhost:3791/api/Memos",
            data: memo
        })
        .done(function (data) {
            $rootScope.stopLoading();
            $scope.memos.unshift(data);
            $('#modalAddMemo').modal('hide')
            $("#memoTitle").val("");
            $("#memoContent").val("");
            $scope.$apply();
        }).fail(function () {
            $scope.serverError = true;
            $rootScope.stopLoading();
            $scope.$apply();
        });
    }

    $scope.deleteMemo = function (memo) {
        $rootScope.startLoading();
        $.ajax({
            method: "DELETE",
            url: "http://localhost:3791/api/Memos/" + memo.MemoID,
        })
        .done(function (data) {
            var index = $scope.memos.indexOf(memo);
            $scope.memos.splice(index, 1);
            $rootScope.stopLoading();
            $scope.$apply();
        }).fail(function () {
            $scope.serverError = true;
            $rootScope.stopLoading();
            $scope.$apply();
        });
    }


    $scope.getMemos();
}