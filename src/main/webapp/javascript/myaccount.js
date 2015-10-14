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
    //$http.get(app + '/transaction/user/' + wechatId).success(function (data) {
    //    $scope.tradeStatList = data;
    //})

    var today = new Date();
    $scope.dateList = [];

    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    for (var i = 0; i < 6; i++) {
        if (month > 0) {
        } else {
            year -= 1;
            month = 12;
        }
        $scope.dateList.push({name: year + '年' + month + '月', value: year + '#' + month})
        month -= 1;
    }
    $scope.selectedDate = $scope.dateList[0];

    $scope.getTradeStat = function () {
        console.log($scope.selectedDate);
        $http.get(app + '/transaction/user/' + wechatId + '/' + $scope.selectedDate.value.split('#')[0] + '/' + $scope.selectedDate.value.split('#')[1]).success(function (data) {
            $scope.tradeStatList = data;
        })
    }

    $scope.getTradeStat();


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