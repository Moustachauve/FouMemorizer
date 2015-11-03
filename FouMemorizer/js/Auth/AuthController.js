angular
    .module('FouMemorizer')
    .controller('AuthController', ['$scope', '$rootScope', AuthController]);

function AuthController($scope, $rootScope) {

    $scope.registerError = "";

    $scope.register = function (registerForm) {
        $rootScope.startLoading();

        if (registerForm == null) {

        }

        data = {
            Email: registerForm.Email,
            Password: registerForm.Password,
            ConfirmPassword: registerForm.ConfirmPassword
        }

        $.ajax({
            method: "POST",
            url: "http://localhost:3791/api/Account/Register",
            data: data
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

        $scope.registerError = "Allo";
    }

}