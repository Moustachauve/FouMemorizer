angular
    .module('FouMemorizer')
    .controller('AuthController', ['$scope', '$rootScope', AuthController]);

function AuthController($scope, $rootScope) {

    $scope.registerError = "";

    $scope.register = function (registerForm) {

        $(".has-error").removeClass("has-error");
        $rootScope.startLoading();

        if (registerForm == null) {
            data = {
                Email: "",
                Password: "",
                ConfirmPassword: ""
            }
        }
        else {
            data = {
                Email: registerForm.Email,
                Password: registerForm.Password,
                ConfirmPassword: registerForm.ConfirmPassword
            }
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
            $rootScope.navigate("Index");

        }).fail(function (data) {
            $scope.serverError = true;
            $rootScope.stopLoading();
            $scope.registerError = data.error_description;
            $scope.showError(data.responseJSON.ModelState, "registerForm");
            $scope.$apply();
        });

        //$scope.registerError = "Allo";
    }

    $scope.login = function (user) {

        $(".has-error").removeClass("has-error");

        var data = {
            grant_type: "password",
            username: user.Email,
            password: user.Password
        }

        $.ajax({
            method: "POST",
            url: "http://localhost:3791/Token",
            data: data
        })
        .done(function (data) {
            $rootScope.stopLoading();
            console.log(data);

            localStorage.setItem("sToken", data.access_token);
            localStorage.setItem("sEmail", data.userName);
            $scope.$apply();
            $rootScope.refreshMemo();
            $rootScope.navigate("Index");

        }).fail(function (data) {
            $scope.serverError = true;
            $rootScope.stopLoading();
            $scope.loginError = data.error_description;
            $scope.showError(data.responseJSON.ModelState, user);
            $scope.$apply();
        });

    }

    $scope.showError = function (modelState, formName) {
        $.each(modelState, function (key, value) {
            key = key.replace("model", formName);
            var inputParent = $(":input[ng-model='" + key + "']").parent();
            inputParent.addClass("has-error");
            inputParent.find(".help-block").text(value[0]);
        });
    }

    $rootScope.logout = function () {
        $rootScope.startLoading();
        $.ajax({
            beforeSend: function (xhr) { xhr.setRequestHeader("Authorization", "Bearer " + $rootScope.isLoggedIn()) },
            method: "POST",
            url: "http://localhost:3791/api/Account/Logout",
        })
        .done(function () {
            $rootScope.stopLoading();
            localStorage.removeItem("sToken");
            $rootScope.navigate("Index");
            $scope.$apply();
        });
    }

}
