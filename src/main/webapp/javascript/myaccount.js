/**
 * Created by darlingtld on 2015/7/4 0004.
 */
var accountModule = angular.module('AccountModule', ['ngRoute']);
var app = '/createsh';
var user;
var wechatId;

accountModule.config(function () {

});

accountModule.controller('accountController', function ($http, $scope) {
    var url = app + '/user/wechatId/';
    if (user == undefined || user == null) {
        var code = getURLParameter('code');
        $http.get(app + "/user/code/" + code).success(function (data, status, headers, config) {
            user = data;
            wechatId = user.openid;
            $('img.user-icon').attr('src', user.headimgurl);
            setLocalStorage('wechatId', wechatId);
            $http.get(url + wechatId).success(function (data, status, headers, config) {
                $scope.user = data;
            });
        });
    }
    if (wechatId == undefined) {
        wechatId = getLocalStorage('wechatId');
    }
    if ($scope.user == undefined) {
        $http.get(url + wechatId).success(function (data, status, headers, config) {
            $scope.user = data;
        });
    }
    $http.get(app + '/transaction/user/' + wechatId).success(function (data) {
        $scope.tradeStatList = data;
    })
});

accountModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/account/detail', {
            controller: 'accountController',
            templateUrl: 'accountDetails.html'
        })
        .otherwise({
            redirectTo: '/account/detail'
        });
}]);

accountModule.filter('part', function () {
    return function (input, which) {
        if (!angular.isString(input)) {
            return input;
        }
        return input.split(' ')[which];
    };
});

accountModule.filter('toChinese', function () {
    return function (input, which) {
        if (!angular.isString(input)) {
            return input;
        }
        if (input.toUpperCase() == 'DEPOSIT') {
            return '充值';
        } else if (input.toUpperCase() == 'EXPENSE') {
            return '消费';
        }
    };
});