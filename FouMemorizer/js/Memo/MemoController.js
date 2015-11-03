angular
    .module('FouMemorizer')
    .controller('MemoController', ['$scope', '$rootScope', MemoController]);

function MemoController($scope,  $rootScope) {

    $scope.memos = [];

    $scope.getMemos = function () {
        $.ajax({
            method: "GET",
            url: "http://localhost:3791/api/Memos",
        })
        .done(function (data) {
            $scope.memos = data;
            $scope.$apply();
        });
    }

    $scope.addMemo = function (memo) {
        $.ajax({
            method: "POST",
            url: "http://localhost:3791/api/Memos",
            data: memo
        })
        .done(function (data) {
            $scope.memos.unshift(data);
            $('#modalAddMemo').modal('hide')
            $("#memoTitle").val("");
            $("#memoContent").val("");
            $scope.$apply();
        });
    }

    $scope.deleteMemo = function (memo) {
        $.ajax({
            method: "DELETE",
            url: "http://localhost:3791/api/Memos/" + memo.MemoID,
        })
        .done(function (data) {
            var index = $scope.memos.indexOf(memo);
            $scope.memos.splice(index, 1);
            $scope.$apply();
        });
    }


    $scope.getMemos();
}